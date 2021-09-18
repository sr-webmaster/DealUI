import { storiesOf } from '@storybook/vue'
import { DEALS } from '../../.storybook/categories.js'
// Components
import Columns from './StatusPerSource.vue'

const items = [
  { label: 'a', statuses: [{ label: 'red', value: '10' }, { label: 'green', value: '10' }, { label: 'blue', value: '10' }] },
  { label: 'b', statuses: [{ label: 'red', value: '10' }, { label: 'green', value: '15' }, { label: 'blue', value: '10' }] },
  { label: 'c', statuses: [{ label: 'red', value: '10' }, { label: 'green', value: '10' }, { label: 'blue', value: '10' }] },
  { label: 'd', statuses: [{ label: 'red', value: '10' }, { label: 'green', value: '10' }, { label: 'blue', value: '25' }] },
  { label: 'e', statuses: [{ label: 'red', value: '10' }, { label: 'green', value: '15' }, { label: 'blue', value: '30' }] }
]

storiesOf(`${DEALS}|charts/Columns`, module)
  .addParameters({
    backgrounds: [
      { name: 'default', value: '#f1f3f6', default: true }
    ]
  })
  .add('default', () => {
    return {
      components: { Columns },
      data () {
        return {
          items: items
        }
      },
      template: `
          <v-container>
          <v-layout row>
            <v-flex sm6>
              <v-card class="px-3 py-3">
                <columns
                  :items="items"
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
      components: { Columns },
      data () {
        return {
          items: items
        }
      },
      template: `
          <v-container>
          <v-layout row>
            <v-flex sm6>
              <v-card class="px-3 py-3">
                <columns
                  :items="items"
                  number-format="'$'#,##a"
                />
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      `
    }
  })
