<template>
  <v-container grid-list-md>
    <v-layout
      row
      justify-start
    >
      <v-flex
        shrink
      >
        <f-user-avatar
          :user="item"
          color="secondary"
        />
      </v-flex>
      <v-flex pl-4>
        <h4
          class="title font-weight-bold secondary--text break-word"
        >
          {{ item.first_name }} {{ item.last_name }}
        </h4>
        <v-chip
          label
          color="info"
          class="break-word ml-0"
          text-color="info-text"
        >
          ID#: {{ item.id }}
        </v-chip>
      </v-flex>
    </v-layout>

    <template
      v-for="row in rows"
    >
      <v-layout
        :key="row.key"
        row
        wrap
      >
        <v-flex
          md6
          class="font-weight-bold text-uppercase caption"
        >
          {{ row.text }}
        </v-flex>
        <template v-if="row.key === 'company'">
          <v-flex
            md6
            text-xs-right
            :class="row.valueClass + ' break-word'"
          >
            {{ companyName }}
          </v-flex>
        </template>
        <template v-else>
          <v-flex
            md6
            text-xs-right
            :class="row.valueClass + ' break-word'"
          >
            {{ item[row.key] }}
          </v-flex>
        </template>
      </v-layout>
      <v-divider
        :key="row.key + 'divider'"
        class="my-1"
      />
    </template>
  </v-container>
</template>

<script>
import get from 'lodash/get'
import isObject from 'lodash/isObject'
import isString from 'lodash/isString'
import FUserAvatar from '@freshinup/core-ui/src/components/FUserAvatar'

const ROWS_DEFAULT = [
  { text: 'Email', key: 'email', valueClass: 'grey--text' },
  { text: 'Phone', key: 'phone', valueClass: 'grey--text' },
  { text: 'Can be texted?', key: 'text_enabled', valueClass: 'grey--text' },
  { text: 'Associated Deals', key: 'customer_deals', valueClass: 'grey--text' },
  { text: 'Company', key: 'company', valueClass: 'grey--text' },
  { text: 'Title', key: 'title', valueClass: 'grey--text' }
]

export default {
  components: {
    FUserAvatar
  },
  props: {
    customer: {
      type: Object,
      default: () => ({})
    },
    rows: {
      type: Array,
      default: () => {
        return ROWS_DEFAULT
      }
    }
  },
  computed: {
    item () {
      return isObject(this.customer) ? this.customer : {}
    },
    companyName () {
      const company = get(this, 'item.company', '')
      if (isString(company)) {
        return company
      }
      return get(company, 'name', '')
    }
  }
}
</script>

<style scoped>
.break-word {
  word-break: break-word;
}
</style>
