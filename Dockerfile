FROM node:10-alpine as base
LABEL Description="Web Frontend of the Social Network Human-Connection.org" Vendor="Human-Connection gGmbH" Version="0.0.1" Maintainer="Human-Connection gGmbH (developer@human-connection.org)"

# Expose the app port
ARG BUILD_COMMIT
ENV BUILD_COMMIT=$BUILD_COMMIT
ARG WORKDIR=/nitro-web
RUN mkdir -p $WORKDIR
WORKDIR $WORKDIR
COPY package.json .
COPY yarn.lock .

# See: https://github.com/nodejs/docker-node/pull/367#issuecomment-430807898
RUN apk --no-cache add git

FROM base as build-and-test
COPY . .
RUN yarn install --production=false --frozen-lockfile --non-interactive
RUN cd styleguide && yarn install --production=false --frozen-lockfile --non-interactive \
    && cd .. \
    && yarn run styleguide:build
COPY . .
RUN yarn run build

FROM base as production
ENV NODE_ENV=production
COPY --from=build-and-test ./nitro-web/server ./server
COPY --from=build-and-test ./nitro-web/plugins ./plugins
COPY --from=build-and-test ./nitro-web/.nuxt ./.nuxt
COPY --from=build-and-test ./nitro-web/locales ./locales
COPY --from=build-and-test ./nitro-web/static ./static
COPY --from=build-and-test ./nitro-web/styleguide/dist ./styleguide/dist
RUN yarn install --production=true --frozen-lockfile --non-interactive

EXPOSE 3000
CMD ["yarn", "run", "start"]
