import { storiesOf } from '@storybook/vue'
import { withKnobs, number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import Chance from 'chance'
import times from 'lodash/times'
import DealCardGrid from './DealCardGrid.vue'
import { DEALS } from '../../.storybook/categories.js'

const chance = new Chance()
const dealsForPagination = times(16, (id) => {
  return {
    id: 1,
    name: chance.name(),
    customer: { first_name: chance.name(), last_name: chance.name(), id: '123' },
    manager: { first_name: chance.name(), last_name: chance.name(), id: '1234' },
    salesrep: { first_name: chance.name(), last_name: chance.name(), id: '12345' },
    created_at: '45 Days',
    source: chance.domain(),
    type_id: 1,
    type: { id: 1, name: 'Mobile' },
    estimate: chance.dollar(),
    status_id: 1,
    status: { id: 1, name: 'Active' }
  }
})

storiesOf(`${DEALS}|DealCardGrid`, module)
  .addDecorator(withKnobs)
  .add('DealCardGrid', () => {
    return {
      components: { DealCardGrid },
      data () {
        return {
          page: 1,
          deals: dealsForPagination.slice(0, 8),
          loading: false,
          rowsPerPage: number('Rows Per Page', 8),
          totalItems: 16,
          rowsPerPageItems: [8, 16, 24, 40, 80]
        }
      },
      methods: {
        view (deal) {
          action('manage-view')(deal)
        },
        onPaginate (value) {
          action('Paginate')(value)
          this.loading = true
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              this.loading = false
              const offset = (value.page * value.rowsPerPage)
              this.deals = dealsForPagination.slice(offset - value.rowsPerPage, offset)
              resolve({
                deals: this.deals,
                totalItems: 16
              })
            }, 3000)
          })
        }
      },
      template: `
          <v-container>
            <deal-card-grid
              :deals="deals"
              :rowsPerPage="rowsPerPage"
              :rowsPerPageItems="rowsPerPageItems"
              :totalPages="totalItems"
              :isLoading="loading"
              @paginate="onPaginate"
              @manage-view="view"
            />
          </v-container>
      `
    }
  })
