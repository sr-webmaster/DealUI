import { storiesOf } from '@storybook/vue'
import CustomerMessage from './CustomerMessage.vue'
import { DEALS } from '../../.storybook/categories.js'

storiesOf(`${DEALS}|Customer Message`, module)
  .add('default', () => ({
    components: { CustomerMessage },
    data () {
      return {
        dialog: false,
        email: {
          subject: 'Discuss new arrivals / SUV options',
          message: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>',
          deal: {
            id: 1,
            name: 'Trade in: 2016 Prius owner looking for SUV options'
          },
          user: {
            id: 999,
            name: 'User',
            email: 'info@mail.com',
            phone: '766-888-9999'
          }
        }
      }
    },
    methods: {
      closeDialog () {
        this.dialog = false
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
              View Message
            </v-btn>
        <customer-message
            :email="email"
            @close="closeDialog"
         />
         </v-dialog>
      </v-container>
    `
  }))
