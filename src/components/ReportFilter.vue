<template>
  <v-layout
    row
    align-end
  >
    <v-flex
      sm2
      :class="{'px-2': $vuetify.breakpoint.smAndUp, 'mt-3': $vuetify.breakpoint.xs}"
    >
      <v-layout
        row
        justify-space-between
        mb-2
      >
        <filter-label
          color="black"
        >
          Filter by date
        </filter-label>
        <f-clear-button
          v-if="filters.date_after || filters.date_before"
          @clear="filters.date_after = filters.date_before = range = null"
        />
      </v-layout>
      <vue-ctk-date-time-picker
        v-model="range"
        class="data-time-picker no-border"
        only-date
        range
        no-clear-button
        format="YYYY-MM-DD"
        formatted="MM-DD-YYYY"
        input-size="lg"
        label="Select date"
        :color="$vuetify.theme.primary"
        :button-color="$vuetify.theme.primary"
        @input="changeDate"
      />
    </v-flex>
    <v-flex
      sm2
      :class="{'px-2': $vuetify.breakpoint.smAndUp, 'mt-3': $vuetify.breakpoint.xs}"
    >
      <v-layout
        row
        justify-space-between
        mb-2
      >
        <filter-label
          color="black"
        >
          Statuses & Appts
        </filter-label>
        <f-clear-button
          v-if="filters.status"
          @clear="filters.status = null;"
        />
      </v-layout>
      <multi-select
        v-model="filters.status"
        :items="statuses"
        item-value="id"
        item-text="name"
        placeholder="All Statuses"
        select-all-name="All Statuses"
        solo
        hide-details
      />
    </v-flex>
    <v-flex
      sm2
      :class="{'px-2': $vuetify.breakpoint.smAndUp, 'mt-3': $vuetify.breakpoint.xs}"
    >
      <v-layout
        row
        justify-space-between
        mb-2
      >
        <filter-label
          color="black"
        >
          Opportunity types
        </filter-label>
        <f-clear-button
          v-if="filters.type"
          @clear="filters.type = null;"
        />
      </v-layout>
      <multi-select
        v-model="filters.type"
        :items="types"
        item-value="id"
        item-text="name"
        placeholder="All Types"
        select-all-name="All Types"
        solo
        hide-details
      />
    </v-flex>
    <v-flex
      sm2
      :class="{'px-2': $vuetify.breakpoint.smAndUp, 'mt-3': $vuetify.breakpoint.xs}"
    >
      <v-layout
        row
        justify-space-between
        mb-2
      >
        <filter-label
          color="black"
        >
          Lead Sources
        </filter-label>
        <f-clear-button
          v-if="filters.leads"
          @clear="filters.leads = null;"
        />
      </v-layout>
      <multi-select
        v-model="filters.leads"
        :items="leads"
        item-value="id"
        item-text="name"
        placeholder="All Leads"
        select-all-name="All Leads"
        solo
        hide-details
      />
    </v-flex>
    <v-flex
      sm2
      :class="{'px-2': $vuetify.breakpoint.smAndUp, 'mt-3': $vuetify.breakpoint.xs}"
    >
      <v-layout
        row
        justify-space-between
        mb-2
      >
        <filter-label
          color="black"
        >
          Sales Reps
        </filter-label>
        <f-clear-button
          v-if="filters.sales_rep_uuid"
          @clear="filters.sales_rep_uuid = null; $refs.salesRep.resetTerm()"
        />
      </v-layout>
      <multi-simple
        ref="salesRep"
        v-model="filters.sales_rep_uuid"
        url="/users?filter[type]=1"
        term-param="term"
        results-id-key="uuid"
        placeholder="Search"
        background-color="white"
        class="mt-0 pt-0"
        height="48"
        not-clearable
        solo
      />
    </v-flex>
    <v-flex
      sm2
      :class="{'px-2': $vuetify.breakpoint.smAndUp, 'mt-3': $vuetify.breakpoint.xs}"
    >
      <v-layout
        row
        justify-space-between
        mb-2
      >
        <filter-label
          color="black"
        >
          Customer Name / ID
        </filter-label>
        <f-clear-button
          v-if="filters.customer_uuid"
          @clear="filters.customer_uuid = null; $refs.customer.resetTerm()"
        />
      </v-layout>
      <multi-simple
        ref="customer"
        v-model="filters.customer_uuid"
        url="/users?filter[type]=2"
        term-param="term"
        results-id-key="uuid"
        placeholder="Search"
        background-color="white"
        class="mt-0 pt-0"
        height="48"
        not-clearable
        solo
      />
    </v-flex>
    <v-flex
      sm2
      :class="{'px-2': $vuetify.breakpoint.smAndUp, 'mt-3': $vuetify.breakpoint.xs}"
      fill-height
      justify-end
    >
      <v-btn
        large
        round
        class="primary"
        :class="{'mx-0': $vuetify.breakpoint.xsOnly}"
        @click="generate"
      >
        Generate
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import FClearButton from '@freshinup/core-ui/src/components/FClearButton.vue'
import FilterLabel from './FilterLabel.vue'
import MultiSimple from '@freshinup/core-ui/src/components/FMultiSimple'
import MultiSelect from '@freshinup/core-ui/src/components/FMultiSelect'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'

export default {
  components: {
    FClearButton,
    FilterLabel,
    MultiSimple,
    MultiSelect,
    VueCtkDateTimePicker
  },
  props: {
    filters: {
      type: Object,
      default: () => ({})
    },
    statuses: {
      type: Array,
      default: () => []
    },
    types: {
      type: Array,
      default: () => []
    },
    leads: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      range: {
        start: this.filters.date_after,
        end: this.filters.date_before
      }
    }
  },
  methods: {
    changeDate () {
      this.filters.date_after = this.range ? this.range.start : null
      this.filters.date_before = this.range ? this.range.end : null
    },
    generate () {
      this.$emit('generate', this.filters)
    }
  }
}
</script>
<style lang="styl" scoped>
    .data-time-picker.no-border input.field-input{
        border: none !important;
        box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2),
        0px 2px 2px 0px rgba(0,0,0,0.14),
        0px 1px 5px 0px rgba(0,0,0,0.12);
    }
</style>
