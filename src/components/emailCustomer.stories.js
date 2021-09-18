import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import CustomerEmail from './EmailCustomer.vue'
import { DEALS } from '../../.storybook/categories.js'

storiesOf(`${DEALS}|Customer Email`, module)
  .add('default', () => {
    return ({
      components: { CustomerEmail },
      data () {
        return {
          dialog: false,
          user: {
            id: 999,
            name: 'User',
            email: 'info@mail.com',
            phone: '766-888-9999'
          },
          templates: [
            'Template One',
            'Template Two'
          ],
          deal: {
            id: 1,
            name: 'Your Best Chance'
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
                  Email Customer
                </v-btn>
            <customer-email
                :user="user"
                :templates="templates"
                :deal="deal"
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
          action('email')(parameters)
        }
      }
    })
  })
