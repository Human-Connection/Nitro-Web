<template>
  <ds-card space="small">
    <ds-heading tag="h3">
      Themen / Kategorien
    </ds-heading>
    <ds-table
      :data="Category"
      :fields="['icon', 'name', 'postCount']"
      condensed
    >
      <!-- eslint-disable vue/no-unused-vars -->
      <template
        slot="icon"
        slot-scope="scope"
      >
        slot-scope="{ row }">
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
