import { withKnobs } from '@storybook/addon-knobs'
import Chance from 'chance'
import sample from 'lodash/sample'
import { MAIN } from '../../../.storybook/categories.js'

// Components
import CustomerDetails from './CustomerDetails.vue'

const chance = new Chance()

export default {
  title: `${MAIN}|CustomerDetails`,
  id: 'CustomerDetails',
  decorators: [
    withKnobs,
    () => `
      <v-container>
       <v-flex>
          <story />
        </v-flex>
      </v-container>
    `
  ]
}

/**
 * https://storybook.js.org/docs/guides/guide-vue/#step-4-write-your-stories
 */
export const NoPropertiesSet = () => ({
  components: { CustomerDetails },
  template: `
      <v-card><CustomerDetails /></v-card>
    `
})

export const CustomerSet = () => ({
  components: { CustomerDetails },
  data () {
    return {
      customer: {
        id: 1,
        first_name: chance.first(),
        last_name: chance.last(),
        email: chance.email(),
        phone: chance.phone(),
        title: chance.word(),
        company: chance.company(),
        text_enabled: sample(['Yes', 'No']),
        customer_deals: chance.integer({ min: 0, max: 20 })
      }
    }
  },
  methods: {
  },
  template: `
      <v-card>
        <CustomerDetails              
          :customer="customer" 
        />
      </v-card>
  `
})

export const CustomerWithoutCard = () => ({
  components: { CustomerDetails },
  data () {
    return {
      customer: {
        id: 1,
        first_name: chance.first(),
        last_name: chance.last(),
        email: chance.email(),
        phone: chance.phone(),
        title: chance.word(),
        company: chance.company(),
        text_enabled: sample(['Yes', 'No']),
        customer_deals: chance.integer({ min: 0, max: 20 })
      }
    }
  },
  methods: {
  },
  template: `
      <CustomerDetails              
        :customer="customer" 
      />
  `
})

export const WithAvatarAndBigEmail = () => ({
  components: { CustomerDetails },
  data () {
    return {
      customer: {
        avatar: 'https://placeimg.com/100/100/people',
        id: 1,
        first_name: chance.first(),
        last_name: chance.last(),
        email: 'thisisareallybigemailtoshowinsuchasmallplace@email.com',
        phone: chance.phone(),
        title: chance.word(),
        company: chance.company(),
        text_enabled: sample(['Yes', 'No']),
        customer_deals: chance.integer({ min: 0, max: 20 })
      }
    }
  },
  template: `
        <v-card>
          <CustomerDetails              
            :customer="customer" 
          />
        </v-card>
      `
})

export const WithCompanyAsObject = () => ({
  components: { CustomerDetails },
  data () {
    return {
      customer: {
        id: 1,
        first_name: 'First',
        last_name: 'Last',
        email: 'example@email.com',
        phone: '123456789',
        title: 'Sir',
        company: {
          id: 22,
          uuid: 'c67d7e83-02ee-4c2a-975e-61567c1f4c0a',
          created_at: '2020-04-03 07:19:32',
          status: 1,
          name: 'FreshinUp',
          address: '2266 Test Ave',
          address2: 'unit 5',
          city: 'Madison',
          state: 'WI',
          zip: '53558',
          country: 'US',
          website: null,
          notes: null,
          members_count: null,
          teams_count: null,
          tags: [],
          logo: 'https://via.placeholder.com/800x600.png',
          company_types: []
        },
        text_enabled: 'Yes',
        customer_deals: 3
      }
    }
  },
  template: `
        <v-card>
          <CustomerDetails              
            :customer="customer" 
          />
        </v-card>
      `
})

export const RowsConfigured = () => ({
  components: { CustomerDetails },
  data () {
    return {
      customer: {
        id: 1,
        first_name: 'First',
        last_name: 'Last',
        email: 'example@email.com',
        phone: '123456789',
        title: 'Sir',
        company: {
          id: 22,
          uuid: 'c67d7e83-02ee-4c2a-975e-61567c1f4c0a',
          created_at: '2020-04-03 07:19:32',
          status: 1,
          name: 'FreshinUp',
          address: '2266 Test Ave',
          address2: 'unit 5',
          city: 'Madison',
          state: 'WI',
          zip: '53558',
          country: 'US',
          website: null,
          notes: null,
          members_count: null,
          teams_count: null,
          tags: [],
          logo: 'https://via.placeholder.com/800x600.png',
          company_types: []
        },
        text_enabled: 'Yes',
        customer_deals: 3
      },
      rows: [
        { text: 'Email', key: 'email' },
        { text: 'Phone', key: 'phone' },
        { text: 'Last Name', key: 'last_name' }
      ]
    }
  },
  template: `
        <v-card>
          <CustomerDetails              
            :customer="customer"
            :rows="rows" 
          />
        </v-card>
      `
})
