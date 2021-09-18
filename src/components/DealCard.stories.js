import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import Chance from 'chance'
import { DEALS } from '../../.storybook/categories.js'

// Components
import DealCard from './DealCard.vue'

const chance = new Chance()

storiesOf(`${DEALS}|DealCard`, module)
  .addDecorator(withKnobs)
  .add('DealCard', () => {
    return {
      components: { DealCard },
      data () {
        return {
          deal: {
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
        }
      },
      methods: {
        clickDeal (deal) {
          action('clickDeal')(deal)
        }
      },
      template: `
        <v-container>
          <v-flex
            pa-2
            xs12
          >
            <deal-card
              :deal="deal"
              @clickDeal="clickDeal"
            />
          </v-flex>
        </v-container>
      `
    }
  })
