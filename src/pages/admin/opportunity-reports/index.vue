<template>
  <v-container
    grid-list-md
    fluid
  >
    <v-container
      grid-list-md
      px-0
      fluid
    >
      <v-layout
        row
        wrap
      >
        <v-flex xs4>
          <h2 class="f-page__title f-page__title--admin white--text">
            {{ pageTitle }}
          </h2>
        </v-flex>

        <v-flex xs8>
          <v-btn-toggle>
            <v-btn
              color="primary"
              dark
              class="v-btn--active"
              round
            >
              Create Reports
            </v-btn>
            <v-btn
              id="saved-reports-link"
              :to="{ path: '/admin/opportunity-reports/saved' }"
              type="default"
              round
            >
              Saved Reports
            </v-btn>
          </v-btn-toggle>
        </v-flex>
      </v-layout>
    </v-container>

    <v-card>
      <v-card-title>
        <v-flex
          px-2
        >
          Use the general parameters below to generate your report.
        </v-flex>
      </v-card-title>
      <v-card-text>
        <report-filter
          :filters="filters"
          :statuses="dealStatuses"
          :types="dealTypes"
          :leads="deals"
        />
      </v-card-text>
    </v-card>

    <v-flex my-4>
      <v-dialog
        v-model="dialog"
        scrollable
        max-width="436"
      >
        <v-btn
          slot="activator"
          color="primary"
          dark
        >
          Data Visibility
        </v-btn>
        <f-data-visibility
          :visible-parameters="currentUser.fresh_deals_visibility || visibleParameters"
          :parameters="parameters"
          @close="closeDialog"
          @save="saveParameters"
        />
      </v-dialog>
      <v-dialog
        v-model="saveDialog"
        max-width="400px"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            color="primary"
            btn-color="secondary"
            v-on="on"
          >
            Save Report
          </v-btn>
        </template>
        <v-toolbar>
          <v-toolbar-title>Save Report</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn
              icon
              @click="saveDialog = false"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <save-report
          :items-one="dealModifiers"
          :items-two="dealModifiers"
          hide-save-feature
          @save="saveReport"
          @close="closeReport"
        />
      </v-dialog>
      <v-dialog
        v-model="confirmDialog"
        max-width="500"
      >
        <success-modal
          v-model="confirmDialog"
          path="/admin/opportunity-reports/saved"
          @change="change"
        />
      </v-dialog>
    </v-flex>

    <v-flex my-4>
      <v-card height="100%">
        <v-card-title class="px-0 justify-center">
          <slot name="title">
            <div class="title font-weight-bold">
              Overview
            </div>
          </slot>
        </v-card-title>
      </v-card>
    </v-flex>

    <v-divider />

    <v-card>
      <DealList
        :is-selectable="false"
        :deals="deals"
        :statuses="dealStatuses"
        :rows-per-page="pagination.rowsPerPage"
        :page="pagination.page"
        :total-items="pagination.totalItems"
        :sort-by="sorting.sortBy"
        :descending="sorting.descending"
        :is-loading="loading"
        :item-actions="itemActions"
        :headers="selectedHeaders()"
        @paginate="onPaginate"
        @manage-view="onManageView"
      />
    </v-card>
  </v-container>
</template>

<script>
import FDataVisibility from '@freshinup/core-ui/src/components/FDataVisibility.vue'
import SaveReport from '@freshinup/report-ui/src/components/SaveReport'
import SuccessModal from '@freshinup/report-ui/src/components/SuccessModal'
import ReportFilter from '../../../components/ReportFilter.vue'
import { mapActions, mapGetters } from 'vuex'
import DealList from '../../../components/DealList.vue'

const include = [
  'manager',
  'customer',
  'salesrep'
]

export default {
  layout: 'admin-list',
  components: {
    FDataVisibility,
    ReportFilter,
    DealList,
    SaveReport,
    SuccessModal
  },
  data () {
    return {
      pageTitle: 'Opp. Reporting',
      dialog: false,
      loading: false,
      visibleParameters: [
        'status',
        'name',
        'customer',
        'age',
        'source',
        'sales_manager',
        'salesrep'
      ],
      parameters: [
        { name: 'status', label: 'Status' },
        { name: 'name', label: 'Opportunity title' },
        { name: 'customer', label: 'Customer name / contact' },
        { name: 'age', label: 'Age' },
        { name: 'source', label: 'Lead source' },
        { name: 'sales_manager', label: 'Sales manager' },
        { name: 'salesrep', label: 'Sales Rep' },
        { name: 'type', label: 'Opportunity type' },
        { name: 'import_date_time', label: 'Import date and time' },
        { name: 'internet_coordinator', label: 'Internet coordinator' },
        { name: 'fi_manager', label: 'F&I manager' },
        { name: 'estimated_budget', label: 'Estimated budget' },
        { name: 'deal_number', label: 'Deal # (when applicable)' }
      ],
      filters: {
        status: null,
        type: null,
        lead: null,
        sales_rep_uuid: null,
        customer_uuid: null,
        date_after: null,
        date_before: null
      },
      itemActions: [
        { action: 'view', text: 'View' }
      ],
      confirmDialog: false,
      saveDialog: false
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    ...mapGetters('deals', {
      deals: 'items',
      pagination: 'pagination',
      sorting: 'sorting',
      sortBy: 'sortBy'
    }),
    ...mapGetters('dealTypes', {
      dealTypes: 'items'
    }),
    ...mapGetters('dealStatuses', {
      dealStatuses: 'items'
    }),
    ...mapGetters('dealModifiers', {
      dealModifiers: 'items'
    })
  },
  methods: {
    ...mapActions('page', {
      setPageLoading: 'setLoading'
    }),
    saveParameters (parameters) {
      let data = {
        fresh_deals_visibility: parameters
      }
      this.$store.dispatch('users/updateItem', { data, params: { id: this.currentUser.id } }).then(() => {
        this.dialog = false
        this.currentUser.fresh_deals_visibility = [...parameters]
        this.$store.dispatch('generalMessage/setMessage', 'Saved')
      })
    },
    onPaginate (value) {
      this.$store.dispatch('deals/setPagination', value)
      Promise.all([
        this.$store.dispatch('deals/getItems', { params: { include: include } })
      ]).then(() => {
        this.$store.dispatch('page/setLoading', false)
      })
    },
    onRun (params) {
      this.lastFilterParams = params
      this.$store.dispatch('deals/setFilters', {
        ...this.lastFilterParams
      })
      this.$store.dispatch('deals/getItems', {
        params: { include: include }
      })
    },
    sortRun (params) {
      this.$store.dispatch('deals/setSort', params.sort)
      this.$store.dispatch('deals/setFilters', {
        ...this.lastFilterParams
      })
      this.$store.dispatch('deals/getItems', {
        params: { include: include }
      })
    },
    selectedHeaders () {
      let headers = []
      let defaultHeaders = DealList.props.headers.default()
      let visibleParameters = this.currentUser.fresh_deals_visibility || this.visibleParameters

      defaultHeaders.forEach(header => {
        if (header.value === 'manage' || visibleParameters.includes(header.value)) {
          headers.push(header)
        }
      })

      return headers
    },
    closeDialog () {
      this.dialog = false
    },
    saveReport (saveReport) {
      const data = {
        ...saveReport,
        filters: JSON.stringify(this.filters)
      }
      return Promise.all([
        this.$store.dispatch('savedReports/createItem', { data })
      ])
        .then(() => {
          this.saveDialog = false
          this.confirmDialog = true
        })
    },
    closeReport () {
      this.saveDialog = false
    },
    change (params) {
      this.confirmDialog = params
    },
    onManageView (deal) {
      const route = this.$router.resolve({ path: `/admin/sales-opportunities/${deal.uuid}` })
      window.open(route.href, '_blank')
    }
  },
  beforeRouteEnterOrUpdate (vm, to, from, next) {
    vm.$store.dispatch('page/setLoading', true)
    Promise.all([
      vm.$store.dispatch('dealTypes/getItems'),
      vm.$store.dispatch('dealStatuses/getItems'),
      vm.$store.dispatch('dealModifiers/getItems'),
      vm.$store.dispatch('deals/getItems', { params: { include: include } })
    ]).then(() => {
      vm.$store.dispatch('page/setLoading', false)
      if (next) {
        next()
      }
    })
  }
}
</script>

<style lang="scss" scoped>

  .v-btn-toggle {
    border-radius: 28px;

    .v-btn {
      &:first-child {
        border-radius: 28px 0 0 28px;
      }

      &:last-child {
        border-radius: 0 28px 28px 0;
      }
    }
  }
</style>
