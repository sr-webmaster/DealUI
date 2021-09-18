<template>
  <f-filter-sorter
    ref="searchFilter"
    without-filter-label
    without-sort-by
    :autocomplete_url="autocompleteUrl"
    :filters="filters"
    v-bind="$attrs"
    placeholder="Search by customer name, phone, email address, customer #"
    v-on="$listeners"
    @run="run"
    @clear="clearFilters"
  >
    <template
      v-slot:expanded="slotProps"
    >
      <v-container
        pr-0
        pt-1
        pb-0
      >
        <v-layout
          row
          justify-space-between
        >
          <v-flex>
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

          <v-flex ml-2>
            <v-layout
              row
              justify-space-between
              mb-2
            >
              <filter-label
                color="black"
              >
                Opportunity Type
              </filter-label>
              <f-clear-button
                v-if="filters.type_id"
                color="black"
                @clear="filters.type_id = null"
              />
            </v-layout>

            <v-select
              v-model="filters.type_id"
              :items="opptypes"
              item-value="id"
              item-text="name"
              placeholder="All"
              solo
              hide-details
              @change="slotProps.run"
            />
          </v-flex>

          <v-flex ml-2>
            <v-layout
              row
              justify-space-between
              mb-2
            >
              <filter-label
                color="black"
              >
                Statuses & Activities
              </filter-label>
              <f-clear-button
                v-if="filters.status_id"
                color="black"
                @clear="filters.status_id = null"
              />
            </v-layout>

            <v-select
              v-model="filters.status_id"
              :items="statuses"
              placeholder="All"
              item-value="id"
              item-text="name"
              solo
              hide-details
              @change="slotProps.run"
            />
          </v-flex>

          <v-flex ml-2>
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
                v-if="filters.salesrep_uuid"
                @clear="filters.salesrep_uuid = null; $refs.salesRep.resetTerm()"
              />
            </v-layout>
            <multi-simple
              ref="salesRep"
              v-model="filters.salesrep_uuid"
              url="users?filter[type]=1"
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

          <v-flex ml-2>
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
              url="users?filter[type]=2"
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
            ml-2
            mt-4
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
      </v-container>
    </template>
  </f-filter-sorter>
</template>

<script>
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import FFilterSorter from '@freshinup/core-ui/src/components/FFilterSorter'
import FClearButton from '@freshinup/core-ui/src/components/FClearButton'
import MultiSimple from '@freshinup/core-ui/src/components/FMultiSimple'
import FilterLabel from './FilterLabel.vue'

export default {
  components: {
    FClearButton,
    FilterLabel,
    FFilterSorter,
    VueCtkDateTimePicker,
    MultiSimple
  },
  props: {
    filters: {
      type: Object,
      default: () => ({})
    },
    autocompleteUrl: {
      type: String,
      default: '/api/v1/deals'
    },
    opptypes: {
      type: Array,
      default: () => []
    },
    statuses: {
      type: Array,
      default: () => []
    },
    sortables: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      range: {
        start: this.filters.date_after,
        end: this.filters.date_before
      },
      status_id: null,
      type_id: null,
      rangeDate: null,
      term: this.filters.term
    }
  },

  methods: {
    getRunParams () {
      return {
        status_id: this.status_id,
        type_id: this.type_id,
        rangeDate: this.rangeDate,
        term: this.term
      }
    },
    changeDate () {
      this.filters.date_after = this.range ? this.range.start : null
      this.filters.date_before = this.range ? this.range.end : null
    },
    generate () {
      this.$refs.searchFilter.run()
    },
    clearFilters (params) {
      this.filters.status_id = null
      this.filters.type_id = null
      this.range = null
      this.filters.term = null
      this.salesrep_uuid = null
      this.customer_uuid = null
      this.run(params)
    },
    run (params) {
      this.filters.term = params.term
      let paramsObject = {
        ...this.filters,
        sort: params.orderBy,
        'filter[query]': params.term,
        'filter[status_id]': this.filters.status_id,
        'filter[type_id]': this.filters.type_id
      }
      this.$emit('runFilter', paramsObject)
    }
  }
}
</script>

<style lang="styl" scoped>
  .paddr {
    padding: 8px;
  }
</style>
