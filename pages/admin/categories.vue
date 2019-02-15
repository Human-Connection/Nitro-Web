<template>
  <ds-card :header="$t('admin.categories.name')">
    <ds-table
      :data="Category"
      :fields="fields"
      condensed
    >
      <!-- eslint-disable vue/no-unused-vars -->
      <template
        slot="icon"
        slot-scope="{ row }"
      >
        <ds-icon :name="row.icon" /> {{ row.icon }}
      </template>
      <!-- eslint-enable vue/no-unused-vars -->
    </ds-table>
  </ds-card>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data() {
    return {
      Category: []
    }
  },
  computed: {
    fields() {
      return {
        icon: ' ',
        name: this.$t('admin.categories.categoryName'),
        postCount: {
          label: this.$t('admin.categories.postCount'),
          align: 'right'
        }
      }
    }
  },
  apollo: {
    Category: {
      query: gql(`
        query {
          Category(orderBy: postCount_desc) {
            id
            name
            slug
            icon
            postCount
          }
        }
      `)
    }
  }
}
</script>
