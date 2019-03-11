<template>
  <ds-card :header="$t('settings.social-media.name')">
    <div>
      <ds-input
        v-model="value"
        placeholder="Add social media url"
        name="social-media"
      />
    </div>
    <div>
      <ds-button
        @click="handleAddSocialMediaAccount"
      >
        Add Account
      </ds-button>
    </div>
  </ds-card>
</template>
<script>
import gql from 'graphql-tag'

export default {
  data() {
    return {
      value: ''
    }
  },
  methods: {
    handleAddSocialMediaAccount() {
      this.$apollo.mutate({
        mutation: gql`
          mutation($url: String!) {
            addSocialMediaAccount(url: $url) {
              id
            }
          }
        `,
        variables: {
          url: this.value
        }
      })
    }
  }
}
</script>
