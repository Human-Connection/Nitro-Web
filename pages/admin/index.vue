<template>
  <div>
    <ds-heading tag="h1">
      {{ $t('admin.name') }}
    </ds-heading>
    <ds-flex gutter="small">
      <ds-flex-item :width="{ base: '200px' }">
        <ds-menu :routes="routes">
          <ds-menu-item
            slot="Navigation"
            slot-scope="item"
            :route="item.route"
            :parents="item.parents">
            {{ $t(item.route.name) }}
          </ds-menu-item>
        </ds-menu>
      </ds-flex-item>
      <ds-flex-item>
        <transition
          name="slide-up"
          appear>
          <nuxt-child />
        </transition>
      </ds-flex-item>
    </ds-flex>
  </div>
</template>

<script>
export default {
  nuxtI18n: {
    paths: {
      en: '/admin',
      de: '/systemverwaltung'
    }
  },
  computed: {
    routes() {
      return [
        {
          name: 'admin.dashboard.name',
          path: this.localePath({
            name: 'admin-slug'
          })
        },
        {
          name: 'admin.users.name',
          path: this.localePath({
            name: 'admin-slug',
            params: { slug: 'users' }
          })
        },
        {
          name: 'admin.organizations.name',
          path: this.localePath({
            name: 'admin-slug',
            params: { slug: 'organizations' }
          })
        },
        {
          name: 'admin.pages.name',
          path: this.localePath({
            name: 'admin-slug',
            params: { slug: 'pages' }
          })
        },
        {
          name: 'admin.notifications.name',
          path: this.localePath({
            name: 'admin-slug',
            params: { slug: 'notifications' }
          })
        },
        {
          name: 'admin.categories.name',
          path: this.localePath({
            name: 'admin-slug',
            params: { slug: 'categories' }
          })
        },
        {
          name: 'admin.settings.name',
          path: this.localePath({
            name: 'admin-slug',
            params: { slug: 'settings' }
          })
        }
      ]
    }
  }
}
</script>
