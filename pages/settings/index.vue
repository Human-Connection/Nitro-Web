<template>
  <div>
    <ds-heading tag="h1">{{ $t('settings.name') }}</ds-heading>
    <ds-flex gutter="small">
      <ds-flex-item :width="{ base: '200px' }">
        <ds-menu :routes="routes">
          <ds-menu-item
            slot="Navigation"
            slot-scope="item"
            :route="item.route"
            :parents="item.parents"
          >{{ $t(item.route.name) }}</ds-menu-item>
        </ds-menu>
      </ds-flex-item>
      <ds-flex-item>
        <transition
          name="slide-up"
          appear>
          <nuxt-child/>
        </transition>
      </ds-flex-item>
    </ds-flex>
  </div>
</template>

<script>
export default {
  data() {
    // console.log(app.$t('settings.data.name'))
    return {
      routes: [
        {
          name: 'settings.data.name',
          path: this.localePath({ name: 'settings-slug' })
        },
        {
          name: 'settings.security.name',
          path: this.localePath({
            name: 'settings-slug-security',
            params: { slug: 'security' }
          })
        },
        {
          name: 'settings.invites.name',
          path: this.localePath({
            name: 'settings-slug-invites',
            params: { slug: 'invites' }
          })
        },
        {
          name: 'settings.download.name',
          path: this.localePath({
            name: 'settings-slug-data-download',
            params: { slug: 'data-download' }
          })
        },
        {
          name: 'settings.delete.name',
          path: this.localePath({
            name: 'settings-slug-delete-account',
            params: { slug: 'delete-account' }
          })
        },
        {
          name: 'settings.organizations.name',
          path: this.localePath({
            name: 'settings-slug-my-organizations',
            params: { slug: 'my-organizations' }
          })
        },
        {
          name: 'settings.languages.name',
          path: this.localePath({
            name: 'settings-slug-settings',
            params: { slug: 'settings' }
          })
        }
      ]
    }
  }
}
</script>
