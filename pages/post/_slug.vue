<template>
  <div>
    <ds-flex gutter="small">
      <ds-flex-item>
        <transition
          name="slide-up"
          appear>
          <nuxt-child/>
        </transition>
      </ds-flex-item>
      <ds-flex-item :width="{ base: '200px' }">
        <ds-menu :routes="routes"/>
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
          name: 'Post',
          path: this.localePath({
            name: 'post-slug',
            params: { slug: this.$route.params.slug }
          }),
          children: [
            {
              name: 'Kommentare',
              path: `/post/${this.$route.params.slug}#comments`
            },
            {
              name: 'Miteinander reden',
              path: `/post/${this.$route.params.slug}#lets-talk`
            },
            {
              name: 'Versus',
              path: `/post/${this.$route.params.slug}#versus`
            }
          ]
        },
        {
          name: 'Mehr Info',
          path: this.localePath({
            name: 'post-slug-more-info',
            params: { slug: this.$route.params.slug }
          })
        },
        {
          name: 'Aktiv werden',
          path: this.localePath({
            name: 'post-slug-take-action',
            params: { slug: this.$route.params.slug }
          })
        }
      ]
    }
  }
}
</script>
