<template>
  <ds-card space="small">
    <ds-heading tag="h3">
      {{ $t('moderation.reports.name') }}
    </ds-heading>
    <ds-table
      v-if="Report && Report.length"
      :data="Report"
      :fields="fields"
      condensed
    >
      <template
        slot="name"
        slot-scope="{ row }"
      >
        <div v-if="row.type === 'contribution'">
          <nuxt-link :to="{ name: 'post-slug', params: { slug: row.contribution.slug } }">
            <b>{{ row.contribution.title | truncate(50) }}</b>
          </nuxt-link><br>
          <ds-text
            size="small"
            color="soft"
            style="display: inline"
          >
            {{ row.contribution.author.name || 'Anonymus' | truncate(26) }}
          </ds-text>
          <ds-text
            size="small"
            color="softer"
            style="display: inline"
          >
            @{{ row.contribution.author.slug | truncate(26) }}
          </ds-text>
        </div>
        <div v-else-if="row.type === 'comment'">
          <nuxt-link :to="{ name: 'post-slug', params: { slug: row.comment.post.slug } }">
            <b>{{ row.comment.contentExcerpt | plainText | truncate(50) }}</b>
          </nuxt-link><br>
          <ds-text
            size="small"
            color="soft"
            style="display: inline"
          >
            {{ row.comment.author.name || 'Anonymus' | truncate(26) }}
          </ds-text>
          <ds-text
            size="small"
            color="softer"
            style="display: inline"
          >
            @{{ row.comment.author.slug | truncate(26) }}
          </ds-text>
        </div>
        <div v-else>
          <nuxt-link :to="{ name: 'profile-slug', params: { slug: row.user.slug } }">
            <b>{{ row.user.name || 'Anonymus' | truncate(26) }}</b>
          </nuxt-link>
          <ds-text
            size="small"
            color="softer"
          >
            @{{ row.user.slug | truncate(26) }}
          </ds-text>
        </div>
      </template>
      <template
        slot="type"
        slot-scope="{ row }"
      >
        <ds-text
          color="soft"
        >
          <ds-icon
            v-if="row.type === 'contribution'"
            v-tooltip="{ content: $t(`report.${row.type}.type`), placement: 'right' }"
            name="bookmark"
          />
          <ds-icon
            v-else-if="row.type === 'comment'"
            v-tooltip="{ content: $t(`report.${row.type}.type`), placement: 'right' }"
            name="comments"
          />
          <ds-icon
            v-else
            v-tooltip="{ content: $t(`report.${row.type}.type`), placement: 'right' }"
            name="user"
          />
        </ds-text>
      </template>
      <template
        slot="reporter"
        slot-scope="{ row }"
      >
        <nuxt-link :to="{ name: 'profile-slug', params: { slug: row.reporter.slug } }">
          {{ row.reporter.name || 'Anonymus' | truncate(26) }}
        </nuxt-link>
        <ds-text
          size="small"
          color="softer"
        >
          @{{ row.reporter.slug | truncate(26) }}
        </ds-text>
      </template>
    </ds-table>
    <hc-empty
      v-else
      icon="alert"
      :message="$t('moderation.reports.empty')"
    />
  </ds-card>
</template>

<script>
import gql from 'graphql-tag'
import HcEmpty from '~/components/Empty.vue'
import query from '~/graphql/ModerationListQuery.js'

export default {
  components: {
    HcEmpty
  },
  data() {
    return {
      Report: []
    }
  },
  computed: {
    fields() {
      return {
        type: ' ',
        name: ' ',
        reporter: this.$t('moderation.reports.reporter')
        // actions: ' '
      }
    }
  },
  apollo: {
    Report: {
      query,
      fetchPolicy: 'cache-and-network'
    }
  }
}
</script>
