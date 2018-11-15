<template>
  <ds-card>
    <ds-space margin="small">
      <ds-table
        v-if="blacklisted"
        :fields="['name', 'actions']"
        :data="blacklisted">
        <template
          slot="name"
          slot-scope="{row, index, col}">
          <hc-user
            :trunc="35"
            :show-author-popover="false"
            :post="{}"
            :user="row" />
        </template>
        <template
          slot="actions"
          slot-scope="{row, index, col}">
          <ds-button size="small">Entblockieren</ds-button>
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
  computed: {
    blacklisted() {
      return this.User ? this.User[0].blacklisted : []
    }
  },
  apollo: {
    User: {
      query: gql(`
        query User($myId: ID!) {
          User(id: $myId) {
            blacklisted {
              id
              avatar
              slug
              name
              contributionsCount
              shoutedCount
              commentsCount
              followedByCount
              badges {
                id
                key
                icon
              }
            }
          }
        }
      `),
      variables() {
        return {
          myId: this.$store.getters['auth/user'].id
        }
      },
      fetchPolicy: 'cache-and-network'
    }
  }
}
</script>
