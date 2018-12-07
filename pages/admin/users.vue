<template>
  <!-- eslint-disable vue/no-unused-vars -->
  <ds-card>
    <ds-space margin="small">
      <ds-table
        :fields="['name', 'actions']"
        :data="User"
      >
        <template
          slot="name"
          slot-scope="{row, index, col}"
        >
          <hc-user
            :trunc="35"
            :post="{}"
            :user="row"
          />
        </template>
        <template
          slot="actions"
          slot-scope="{row, index, col}"
        >
          <ds-button size="small">
            Rechte
          </ds-button>
          <ds-button size="small">
            Blockieren
          </ds-button>
          <ds-button
            size="small"
            danger
          >
            Löschen
          </ds-button>
        </template>
      </ds-table>
    </ds-space>
  </ds-card>
</template>

<script>
import gql from 'graphql-tag'
import HcUser from '~/components/User.vue'

export default {
  components: {
    HcUser
  },
  data() {
    return {
      User: []
    }
  },
  apollo: {
    User: {
      query: gql(`
        query {
          User(first: 10, offset: 0, orderBy: createdAt_asc) {
            id
            avatar
            slug
            name
            contributionsCount
            shoutedCount
            commentsCount
            followedByCount
            createdAt
            badges {
              id
              key
              icon
            }
          }
        }
      `),
      fetchPolicy: 'cache-and-network'
    }
  }
}
</script>
