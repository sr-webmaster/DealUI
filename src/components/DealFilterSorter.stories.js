import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios/index'
import { DEALS } from '../../.storybook/categories.js'

// Components
import DealFilterSorter from './DealFilterSorter.vue'

const statuses = [
  { id: 1, name: 'Active' },
  { id: 2, name: 'Pending' }
]

const opptypes = [
  { id: 1, name: 'Opportunity Type A' },
  { id: 2, name: 'Opportunity Type B' },
  { id: 3, name: 'Opportunity Type C' },
  { id: 4, name: 'Opportunity Type D' },
  { id: 5, name: 'Opportunity Type E' },
  { id: 6, name: 'Opportunity Type F' }
]

// Mock GET request to /users for colleagues
const mock = new MockAdapter(axios)
mock.onGet('/users?filter[type]=1').reply(200, {
  data: [
    { id: 1, name: 'customer 1' },
    { id: 2, name: 'customer 2' },
    { id: 3, name: 'customer 3' },
    { id: 4, name: 'customer 4' }
  ]
})

storiesOf(`${DEALS}|DealFilterSorter`, module)
  .add('set autocomplete url', () => ({
    components: { DealFilterSorter },
    methods: {
      onRun (params) {
        action('Run')(params)
      }
    },
    data () {
      return {
        statuses: statuses,
        opptypes: opptypes,
        start_at: null,
        end_at: null
      }
    },
    template: `
      <v-container>
        <deal-filter-sorter
          expanded 
          :statuses="statuses"
          :opptypes="opptypes"
          autocomplete-url="/api/v1/deals"
          @runFilter="onRun"
        />
      </v-container>
`
  }))
