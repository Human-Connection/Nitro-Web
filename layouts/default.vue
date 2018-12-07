<template>
  <div class="layout-default">
    <div class="main-navigation">
      <ds-container style="padding: .5rem 3rem .2rem;">
        <a
          v-router-link
          :href="localePath({name: 'index'})">
          <ds-logo />
        </a>
        <!-- <nuxt-link
          v-for="locale in $i18n.locales"
          v-if="locale.code !== $i18n.locale"
          :key="locale.code"
          :to="switchLocalePath(locale.code)">{{ locale.name }}</nuxt-link>
        <nuxt-link
          v-for="locale in $i18n.locales"
          v-if="locale.code !== $i18n.locale"
          :key="`${locale.code}-link`"
          :to="switchLocalePath(locale.code)"
          @click.prevent="switchLocale(locale.code)">{{ locale.name }}</nuxt-link> -->
        <template v-if="isLoggedIn">
          <no-ssr>
            <v-popover
              :open.sync="isPopoverOpen"
              :open-group="Math.random().toString()"
              placement="bottom-end"
              trigger="manual"
              offset="10"
              style="float: right">
              <a
                :href="localePath({name: 'profile-slug', params: {slug: user.slug}})"
                @click.prevent="toggleMenu()">
                <ds-avatar
                  :image="user.avatar"
                  :name="user.name"
                  size="42" />
              </a>
              <div
                slot="popover"
                style="padding-top: .5rem; padding-bottom: .5rem;"
                @mouseover="popoverMouseEnter"
                @mouseleave="popoveMouseLeave">
                Hallo <b>{{ user.name }}</b>
                <ds-menu
                  :routes="routes"
                  :is-exact="isExact"
                  style="margin-left: -15px; margin-right: -15px; padding-top: 1rem; padding-bottom: 1rem;">
                  <ds-menu-item
                    slot="Navigation"
                    slot-scope="item"
                    :route="item.route"
                    :parents="item.parents"
                    @click.native="toggleMenu">
                    <ds-icon :name="item.route.icon" /> {{ $t(item.route.name) }}
                  </ds-menu-item>
                </ds-menu>
                <ds-space margin="xx-small" />
                <nuxt-link :to="{ name: 'logout'}">
                  <ds-icon name="sign-out" /> Logout
                </nuxt-link>
              </div>
            </v-popover>
          </no-ssr>
        </template>
      </ds-container>
    </div>
    <ds-container>
      <div style="padding: 6rem 2rem 5rem;">
        <nuxt/>
      </div>
    </ds-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { setTimeout } from 'timers'
let mouseEnterTimer = null
let mouseLeaveTimer = null

export default {
  data() {
    return {
      isPopoverOpen: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      isLoggedIn: 'auth/isLoggedIn',
      isAdmin: 'auth/isLoggedIn'
    }),
    routes() {
      if (!this.user.slug) {
        return []
      }
      let routes = [
        {
          name: 'Mein Profil',
          path: this.localePath({
            name: 'profile-slug',
            params: { slug: this.user.slug }
          }),
          icon: 'user'
        },
        {
          name: 'settings.name',
          path: this.localePath('settings-slug'),
          icon: 'cogs'
        }
      ]
      if (this.isAdmin) {
        routes.push({
          name: 'admin.name',
          path: this.localePath('admin-slug'),
          icon: 'shield'
        })
      }
      return routes
    }
  },
  beforeDestroy() {
    clearTimeout(mouseEnterTimer)
    clearTimeout(mouseLeaveTimer)
  },
  methods: {
    switchLocale(locale) {
      this.$i18n.locale = locale
      // this.$store.commit('i18n/I18N_SET_LOCALE', locale)
      // this.$route.push(
      //   this.localePath({
      //     name: this.$route.name,
      //     params: this.$route.params
      //   })
      // )
    },
    toggleMenu() {
      this.isPopoverOpen = !this.isPopoverOpen
    },
    isExact(url) {
      return this.$route.path.indexOf(url) === 0
    },
    popoverMouseEnter() {
      clearTimeout(mouseEnterTimer)
      clearTimeout(mouseLeaveTimer)
      if (!this.isPopoverOpen) {
        mouseEnterTimer = setTimeout(() => {
          this.isPopoverOpen = true
        }, 500)
      }
    },
    popoveMouseLeave() {
      clearTimeout(mouseEnterTimer)
      clearTimeout(mouseLeaveTimer)
      if (this.isPopoverOpen) {
        mouseLeaveTimer = setTimeout(() => {
          this.isPopoverOpen = false
        }, 300)
      }
    }
  }
}
</script>
