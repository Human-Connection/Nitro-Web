<template>
  <div>
    <ds-flex gutter="small">
      <ds-flex-item :width="{ base: '100%', sm: 2, md: 2, lg: 1 }">
        <transition
          name="slide-up"
          appear
        >
          <nuxt-child />
        </transition>
      </ds-flex-item>
      <ds-flex-item
        style="position: relative"
        :width="{ base: '100%', sm: '200px' }"
      >
        <ds-menu
          class="post-menu-sticky"
          :routes="routes"
        />
      </ds-flex-item>
    </ds-flex>
  </div>
</template>

<script>
export default {
  computed: {
    routes() {
      return [
        {
          name: '1. ' + this.$t('common.post', null, 1),
          path: `/post/${this.$route.params.slug}`
          // children: [
          //   {
          //     name: this.$t('common.comment', null, 2),
          //     path: `/post/${this.$route.params.slug}#comments`
          //   },
          //   {
          //     name: this.$t('common.letsTalk'),
          //     path: `/post/${this.$route.params.slug}#lets-talk`
          //   },
          //   {
          //     name: this.$t('common.versus'),
          //     path: `/post/${this.$route.params.slug}#versus`
          //   }
          // ]
        },
        {
          name: '2. ' + this.$t('common.moreInfo'),
          path: `/post/${this.$route.params.slug}/more-info`
        },
        {
          name: '3. ' + this.$t('common.takeAction'),
          path: `/post/${this.$route.params.slug}/take-action`
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@media #{$media-query-small} {
  .post-menu-sticky {
    position: fixed;
  }
}
</style>
