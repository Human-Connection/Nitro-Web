<template>
  <ds-card :header="$t('settings.social-media.name')">
    <div>
      <ds-input
        v-model="value"
        placeholder="Add social media url"
        name="social-media"
        :schema="{type: 'url'}"
      />
    </div>
    <ds-space margin-top="base">
      <div>
        <ds-button primary @click="handleAddSocialMedia">{{ $t('settings.social-media.submit') }}</ds-button>
      </div>
    </ds-space>
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
    handleAddSocialMedia() {
      this.$apollo.mutate({
        mutation: gql`
          mutation($url: String!) {
            addSocialMedia(url: $url) {
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
