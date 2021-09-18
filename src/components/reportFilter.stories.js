import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios/index'
import { DEALS } from '../../.storybook/categories.js'

// Components
import ReportFilter from './ReportFilter.vue'
let filters = {
  status: null,
  type: null,
  lead: null,
  sales_rep_uuid: null,
  customer_uuid: null,
  date_after: null,
  date_before: null
}

let filtersDateRange = {
  status: null,
  type: null,
  lot: null,
  sales_rep_uuid: null,
  customer_uuid: null,
  date_after: '2019-01-08',
  date_before: '2019-01-08'
}

let statuses = [
  { id: 1, name: 'status1' },
  { id: 2, name: 'status2' },
  { id: 3, name: 'status3' },
  { id: 4, name: 'status4' }
]

let types = [
  { id: 1, name: 'type1' },
  { id: 2, name: 'type2' },
  { id: 3, name: 'type3' },
  { id: 4, name: 'type4' }
]

let leads = [
  { id: 1, text: 'lot1' },
  { id: 2, text: 'lot2' },
  { id: 3, text: 'lot3' },
  { id: 4, text: 'lot4' }
]

// Mock GET request to /users for colleagues
const mock = new MockAdapter(axios)
mock.onGet('/users?filter[type]=1').reply(200, {
  data: [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
    { id: 4, name: 'User 4' }
  ]
})
mock.onGet('users?filter[type]=2').reply(200, {
  data: [
    { id: 1, name: 'Sale 1' },
    { id: 2, name: 'Sale 2' },
    { id: 3, name: 'Sale 3' },
    { id: 4, name: 'Sale 4' }
  ]
})

storiesOf(`${DEALS}|ReportFilter`, module)
  .addParameters({
    backgrounds: [
      { name: 'default', value: '#f1f3f6', default: true }
    ]
  })
  .add('default', () => ({
    components: { ReportFilter },
    data () {
      return {
        filters: filters
      }
    },
    methods: {
      generate (params) {
        action('generate')(params)
      }
    },
    template: `
      <v-container>
        <report-filter
        :filters="filters"
        @generate="generate"
        />
      </v-container>
    `
  }))
  .add('with select options', () => ({
    components: { ReportFilter },
    data () {
      return {
        filters: filters,
        statuses: statuses,
        types: types,
        leads: leads
      }
    },
    methods: {
      generate (params) {
        action('generate')(params)
      }
    },
    template: `
      <v-container>
        <report-filter
        :filters="filters"
        :statuses="statuses"
        :types="types"
        :leads="leads"
        @generate="generate"
        />
      </v-container>
    `
  }))
  .add('with date range set', () => ({
    components: { ReportFilter },
    data () {
      return {
        filters: filtersDateRange
      }
    },
    methods: {
      generate (params) {
        action('generate')(params)
      }
    },
    template: `
      <v-container>
        <report-filter
        :filters="filters"
        @generate="generate"
        />
      </v-container>
    `
  }))
