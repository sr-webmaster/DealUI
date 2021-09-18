<template>
  <v-container
    grid-list-lg
    fluid
  >
    <v-flex xs12>
      <h2 class="f-page__title f-page__title--admin">
        Sales Opportunity Details
      </h2>
    </v-flex>
    <v-container
      grid-list-lg
      fluid
      px-0
      mx-0
    >
      <v-layout
        row
        wrap
        px-0
        mx-0
      >
        <v-flex
          grow
          md9
        >
          <v-layout
            column
          >
            <v-flex>
              <f-expansion-panel
                title="Basic Information"
              >
                <v-card class="pa-4">
                  <deal-information
                    v-model="deal"
                    :types="dealTypes"
                    :statuses="dealStatuses"
                  />
                </v-card>
              </f-expansion-panel>
            </v-flex>
            <v-flex>
              <f-expansion-panel
                title="History"
              >
                <v-card class="pa-4">
                  <deal-history
                    :history="activities"
                    :types="activityTypes"
                    class="pb-2"
                  />
                </v-card>
              </f-expansion-panel>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex
          md3
          lg3
        >
          <v-container
            grid-list-lg
            fluid
            pa-0
            ma-0
          >
            <v-layout
              column
            >
              <v-flex xs12>
                <f-expansion-panel
                  title="Customer Details"
                >
                  <v-card-text>
                    <customer-details :customer="customer" />
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      flat
                      primary
                      @click="viewCustomerDetails"
                    >
                      View customer details
                      <v-icon
                        small
                        right
                      >
                        fa-arrow-right
                      </v-icon>
                    </v-btn>
                  </v-card-actions>
                </f-expansion-panel>
              </v-flex>
              <v-flex xs12>
                <f-expansion-panel
                  title="Scheduled Appointments"
                >
                  <v-card-text>
                    <f-calendar-events-list
                      :events="activitiesOfTypeAppointment"
                      @edit="onActivityEdit"
                      @delete="onActivityDelete"
                    />
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer />
                    <v-btn flat>
                      Add new activity
                      <v-icon
                        small
                        right
                      >
                        fa-arrow-right
                      </v-icon>
                    </v-btn>
                  </v-card-actions>
                </f-expansion-panel>
              </v-flex>
              <v-flex xs12>
                <f-expansion-panel
                  title="Scheduled Activities"
                >
                  <v-card-text>
                    <f-calendar-events-list
                      :events="activitiesOfTypeNotAppointment"
                      @edit="onActivityEdit"
                      @delete="onActivityDelete"
                    />
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer />
                    <v-btn flat>
                      Add new activity
                      <v-icon
                        small
                        right
                      >
                        fa-arrow-right
                      </v-icon>
                    </v-btn>
                  </v-card-actions>
                </f-expansion-panel>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import map from 'lodash/map'
import get from 'lodash/get'
import DealHistory from '../../../../components/DealHistory'
import DealInformation from '../../../../components/DealInformation'
import CustomerDetails from '../../../../components/CustomerDetails'
import FExpansionPanel from '@freshinup/core-ui/src/components/FExpansionPanel'
import FCalendarEventsList from '@freshinup/core-ui/src/components/FCalendarEventsList'

export default {
  layout: 'admin-edit',
  components: {
    CustomerDetails,
    DealHistory,
    DealInformation,
    FExpansionPanel,
    FCalendarEventsList
  },
  computed: {
    ...mapGetters('page', ['isLoading']),
    ...mapGetters('deals', { deal: 'item' }),
    ...mapGetters('dealTypes', {
      dealTypes: 'items'
    }),
    ...mapGetters('dealStatuses', {
      dealStatuses: 'items'
    }),
    ...mapGetters('activities', {
      activities: 'items'
    }),
    ...mapGetters('types', {
      activityTypes: 'items'
    }),
    ...mapGetters('activities', [
      'itemsOfTypeNotAppointment',
      'itemsOfTypeAppointment'
    ]),
    activitiesOfTypeNotAppointment () {
      return map(this.itemsOfTypeNotAppointment, (item) => ({
        name: item.title,
        date_time: item.scheduled_at,
        type: {
          ...item.type
        }
      }))
    },
    activitiesOfTypeAppointment () {
      return map(this.itemsOfTypeAppointment, (item) => ({
        name: item.title,
        date_time: item.scheduled_at,
        type: {
          ...item.type
        }
      }))
    },
    customer () {
      return get(this, 'deal.customer', {})
    }
  },
  methods: {
    viewCustomerDetails () {
      this.$router.push({ path: `/admin/users/${this.customer.id}/edit` })
    },
    onActivityEdit (item) {

    },
    onActivityDelete (item) {

    }
  },
  beforeRouteEnterOrUpdate (vm, to, from, next) {
    vm.$store.dispatch('page/setLoading', true)
    Promise.all([
      vm.$store.dispatch('dealStatuses/getItems'),
      vm.$store.dispatch('dealTypes/getItems'),
      vm.$store.dispatch('types/getItems'), // Should be activityTypes
      vm.$store.dispatch('deals/getItem', { params: { id: to.params.id } })
    ]).then(() => {
      vm.$store.dispatch('activities/setFilters', {
        deal_uuid: vm.$store.getters['deals/item'].uuid
      })
      vm.$store.dispatch('activities/getItems').then(() => {
        vm.$store.dispatch('page/setLoading', false)
        next && next()
      })
    })
  }
}
</script>

<style scoped>
  @import "~@mdi/font/css/materialdesignicons.min.css";
</style>
