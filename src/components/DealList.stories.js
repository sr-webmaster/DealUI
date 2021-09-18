import { storiesOf } from '@storybook/vue'
import { withKnobs, number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import Chance from 'chance'
import times from 'lodash/times'
import sample from 'lodash/sample'
import { DEALS } from '../../.storybook/categories.js'

// Components
import DealList from './DealList.vue'

const chance = new Chance()

const dealsForPagination = times(16, (id) => {
  return {
    id,
    name: chance.name(),
    customer: { first_name: chance.first(), last_name: chance.last(), id: '1', email: chance.email() },
    manager: { first_name: chance.first(), last_name: chance.last(), id: '2' },
    salesrep: { first_name: chance.first(), last_name: chance.last(), id: '3' },
    created_at: '2018-01-22 19:22:11',
    source: chance.name(),
    appointments: sample([true, false]),
    status: sample(['Active', 'Pending'])

  }
})

storiesOf(`${DEALS}|DealList`, module)
  .addDecorator(withKnobs)
  .addParameters({
    backgrounds: [
      { name: 'Center', value: '#c5dbe3' },
      { name: 'Industry News', value: '#205a80' }
    ]
  })
  .add('defaults', () => {
    return {
      components: { DealList },
      template: `
          <v-container>
            <DealList/>
          </v-container>
      `
    }
  })
  .add('pagination', () => {
    return {
      components: { DealList },
      data () {
        return {
          deals: dealsForPagination.slice(0, 9),
          loading: false,
          statusList: [
            { name: 'Active', value: 'Active' },
            { name: 'Disabled', value: 'Disabled' },
            { name: 'Pending', value: 'Pending' }
          ],
          levelList: [
            { name: 'Level1', value: 'Level1' },
            { name: 'Level2', value: 'Level2' },
            { name: 'Level3', value: 'Level3' }
          ],
          rowsPerPage: number('Rows Per Page', 5)
        }
      },
      methods: {
        onPaginate (value) {
          action('Paginate')(value)
          this.loading = true
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              this.loading = false
              const offset = (value.page * value.rowsPerPage)
              this.deals = dealsForPagination.slice(offset - value.rowsPerPage, offset)
              resolve({
                items: this.deals,
                total: dealsForPagination.length
              })
            }, 3000)
          })
        },
        onMultidelete (value) {
          action('Multidelete')(value)
        },
        onDelete (value) {
          action('onDelete')(value)
        },
        onEdit (value) {
          action('onEdit')(value)
        },
        onView (value) {
          action('onView')(value)
        }
      },
      template: `
          <v-container>
            <DealList              
              :deals="deals"
              :levels="levelList"
              :statuses="statusList"
              :rowsPerPage="rowsPerPage"
              :totalItems="16"
              :isLoading="loading"
              @paginate="onPaginate"
              @multipledelete="onMultidelete"
              @manage-delete="onDelete"
              @manage-edit="onEdit"
              @manage-view="onView"/>
          </v-container>
      `
    }
  })
  .add('with specific columns and actions', () => {
    return {
      components: { DealList },
      props: {
        isSelectable: {
          type: Boolean,
          default: () => true
        }
      },
      data () {
        return {
          deals: dealsForPagination.slice(0, 9),
          loading: false,
          statusList: [
            { name: 'Active', value: 'Active' },
            { name: 'Disabled', value: 'Disabled' },
            { name: 'Pending', value: 'Pending' }
          ],
          levelList: [
            { name: 'Level1', value: 'Level1' },
            { name: 'Level2', value: 'Level2' },
            { name: 'Level3', value: 'Level3' }
          ],
          rowsPerPage: number('Rows Per Page', 5),
          visibleParameters: [
            'name',
            'customer',
            'salesrep'
          ],
          itemActions: [
            { action: 'view', text: 'View' }
          ]
        }
      },
      methods: {
        onPaginate (value) {
          action('Paginate')(value)
          this.loading = true
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              this.loading = false
              const offset = (value.page * value.rowsPerPage)
              this.deals = dealsForPagination.slice(offset - value.rowsPerPage, offset)
              resolve({
                items: this.deals,
                total: dealsForPagination.length
              })
            }, 3000)
          })
        },
        onMultidelete (value) {
          action('Multidelete')(value)
        },
        onDelete (value) {
          action('onDelete')(value)
        },
        onEdit (value) {
          action('onEdit')(value)
        },
        onView (value) {
          action('onView')(value)
        },
        selectedHeaders () {
          let headers = []
          let defaultHeaders = DealList.props.headers.default()

          defaultHeaders.forEach(header => {
            if (header.value === 'manage' || this.visibleParameters.includes(header.value)) {
              headers.push(header)
            }
          })

          return headers
        }
      },
      template: `
          <v-container>
            <DealList         
              :is-selectable="false"     
              :deals="deals"
              :levels="levelList"
              :statuses="statusList"
              :rowsPerPage="rowsPerPage"
              :totalItems="16"
              :isLoading="loading"
              :headers="selectedHeaders()"
              :item-actions="itemActions"
              @paginate="onPaginate"
              @multipledelete="onMultidelete"
              @manage-delete="onDelete"
              @manage-edit="onEdit"
              @manage-view="onView"/>
          </v-container>
      `
    }
  })
