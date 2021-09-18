import { storiesOf } from '@storybook/vue'
import { DEALS } from '../../.storybook/categories.js'
// Components
import InternetSalesFunnel from './InternetSalesFunnel.vue'

const internetSales = [
  { label: 'CREATING', value: 10 },
  { label: 'ASSIGNMENT', value: 20 },
  { label: 'INITIAL CONTACT', value: 30 },
  { label: 'QUOTING ESTIMATION', value: 90 },
  { label: 'PENDING', value: 120 },
  { label: 'NEEDS ASSESSMENT', value: 40 },
  { label: 'VALUE BUILDING', value: 60 },
  { label: 'CLOSED - WON', value: 40 },
  { label: 'CLOSED - LOST', value: 60 },
  { label: 'CLOSED - SUSPENDED', value: 60 }
]

storiesOf(`${DEALS}|charts/InternetSalesFunnel`, module)
  .addParameters({
    backgrounds: [
      { name: 'default', value: '#f1f3f6', default: true }
    ]
  })
  .add('default', () => {
    return {
      components: { InternetSalesFunnel },
      data () {
        return {
          chartData: {
            data: internetSales
          }
        }
      },
      template: `
          <v-container>
          <v-layout row>
            <v-flex sm12>
              <v-card class="px-3 py-3">
                <internet-sales-funnel
                  :chart-data="chartData"
                />
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      `
    }
  })
  .add('with currency format added', () => {
    return {
      components: { InternetSalesFunnel },
      data () {
        return {
          chartData: {
            data: internetSales
          }
        }
      },
      template: `
          <v-container>
          <v-layout row>
            <v-flex sm12>
              <v-card class="px-3 py-3">
                <internet-sales-funnel
                  :chart-data="chartData"
                  number-format="'$'#,##a"
                />
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      `
    }
  })
