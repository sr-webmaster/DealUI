<template>
  <v-card
    height="100%"
    @click="clickDeal"
  >
    <v-card-title class="pa-0 ma-0">
      <v-toolbar
        :color="titleColor"
        dark
      >
        <v-toolbar-title>{{ deal.status.name }}</v-toolbar-title>
      </v-toolbar>
    </v-card-title>
    <v-card-text class="pt-0">
      <h2 class="my-3 font-weight-bold primary--text">
        {{ deal.name }}
      </h2>

      <v-divider />

      <v-layout row>
        <v-flex
          xs5
          class="font-weight-bold text-uppercase caption pa-1"
        >
          Customer
        </v-flex>
        <v-flex
          xs7
          text-xs-right
          class="font-weight-bold f-dealCard__highlight pa-1"
        >
          {{ get(deal, 'customer.first_name', '') }}
          {{ get(deal, 'customer.last_name', '') }}
          <br>
          #{{ get(deal, 'customer.id', '') }}
        </v-flex>
      </v-layout>

      <v-divider />

      <v-layout row>
        <v-flex
          xs5
          class="font-weight-bold text-uppercase caption pa-1"
        >
          Estimate
        </v-flex>
        <v-flex
          xs7
          text-xs-right
          class="font-weight-bold f-dealCard__highlight pa-1"
        >
          {{ deal.estimate }}
        </v-flex>
      </v-layout>

      <v-divider />

      <v-layout row>
        <v-flex
          xs5
          class="font-weight-bold text-uppercase caption pa-1"
        >
          Age
        </v-flex>
        <v-flex
          xs7
          text-xs-right
          class="pa-1"
        >
          {{ timeago(deal.created_at, "YYYY-MM-DD h:m:s") }}
        </v-flex>
      </v-layout>

      <v-divider />

      <v-layout row>
        <v-flex
          xs5
          class="font-weight-bold text-uppercase caption pa-1"
        >
          Sales Rep
        </v-flex>
        <v-flex
          xs7
          text-xs-right
          class="pa-1"
        >
          {{ get(deal, 'salesrep.first_name', '') }}
          {{ get(deal, 'salesrep.last_name', '') }}
        </v-flex>
      </v-layout>

      <v-divider />

      <v-layout row>
        <v-flex
          xs5
          class="font-weight-bold text-uppercase caption pa-1"
        >
          Source
        </v-flex>
        <v-flex
          xs7
          text-xs-right
          class="pa-1"
        >
          {{ deal.source }}
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import timeago from '../mixins/timeago'
import get from 'lodash/get'

export default {
  mixins: [
    timeago
  ],
  props: {
    deal: {
      type: Object,
      required: true
    }
  },
  computed: {
    titleColor () {
      const statusId = get(this, 'deal.status.id', 1)
      switch (statusId) {
        case 1:
          return '#5a51c2'
        case 2:
          return '#9e84b4'
        default:
          return '#e01a00'
      }
    }
  },
  methods: {
    get,
    clickDeal () {
      this.$emit('clickDeal', this.deal)
    }
  }
}
</script>

<style scoped>
.f-dealCard__highlight {
  background: #F1F2F5;
}
</style>
