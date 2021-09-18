import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import CustomerText from './TextCustomer.vue'
import { DEALS } from '../../.storybook/categories.js'

storiesOf(`${DEALS}|Customer Text`, module)
  .add('default', () => {
    return ({
      components: { CustomerText },
      data () {
        return {
          dialog: false,
          deal: {
            id: 1,
            name: 'Trade in: 2016 Prius owner looking for SUV options'
          },
          customer: {
            pbs_id: 999,
            name: 'User',
            email: 'info@mail.com',
            mobile_phone: '766-888-9999'
          }
        }
      },
      template: `
          <v-container>
              <v-dialog
                      v-model="dialog"
                      scrollable
                      max-width="650"
              >
                  <v-btn
                          slot="activator"
                          color="primary"
                          dark
                  >
                      Text Customer
                  </v-btn>
                  <customer-text
                          :deal="deal"
                          :customer="customer"
                          @save="onSave"
                          @close="closeDialog"
                  />
              </v-dialog>
          </v-container>
      `,
      methods: {
        closeDialog () {
          this.dialog = false
        },
        onSave (parameters) {
          this.dialog = false
          action('Send Text')(parameters)
        }
      }
    })
  })
