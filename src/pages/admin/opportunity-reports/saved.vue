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
            Saved Opp. Reports
          </h2>
        </v-flex>

        <v-flex xs8>
          <v-btn-toggle>
            <v-btn
              type="default"
              :to="{ path: '/admin/opportunity-reports' }"
            >
              Create Reports
            </v-btn>
            <v-btn
              color="primary"
              dark
              class="v-btn--active"
            >
              Saved Reports
            </v-btn>
          </v-btn-toggle>
        </v-flex>
      </v-layout>
    </v-container>

    <v-divider />

    <v-card>
      <reportable-filter
        @runFilter="filterReportables"
      />
      <f-saved-search-list
        v-if="!isLoading"
        :selectables="selectables"
        :items="reportables"
        :is-loading="isLoading || isLoadingList"
        :rows-per-page="pagination.rowsPerPage"
        :page="pagination.page"
        :total-items="pagination.totalItems"
        :sort-by="sorting.sortBy"
        :descending="sorting.descending"
        base-url="/admin/opportunity-reports/saved"
        must-sort
        @paginate="onPaginate"
        @delete="deleteReport"
        @deleteMultiple="deleteMultipleReports"
      />
    </v-card>

    <v-dialog
      v-model="deleteReportDialog"
      max-width="500"
    >
      <simple-confirm
        :class="{ 'deleting': deletablesProcessing }"
        :title="deleteDialogTitle"
        ok-label="Yes"
        cancel-label="No"
        @ok="deleteReports"
        @cancel="deleteReportDialog = false"
      >
        <div class="py-5 px-2">
          <template v-if="deletablesProcessing">
            <div class="text-xs-center">
              <p class="subheading">
                Processing, please wait...
              </p>
              <v-progress-circular
                :rotate="-90"
                :size="200"
                :width="15"
                :value="deletablesProgress"
                color="primary"
              >
                {{ deletablesStatus }}
              </v-progress-circular>
            </div>
          </template>
          <template v-else>
            <p class="subheading">
              <span v-if="deletables.length < 2">Report</span>
              <span v-else> Reports</span>
              : {{ deleteableNames }}
            </p>
          </template>
        </div>
      </simple-confirm>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FSavedSearchList from '@freshinup/report-ui/src/components/FSavedSearchList'
import SimpleConfirm from '@freshinup/core-ui/src/components/FSimpleConfirm'
import ReportableFilter from '@freshinup/report-ui/src/components/ReportableFilter'
import { deletables } from '../../../mixins/deletables'
import get from 'lodash/get'

export default {
  layout: 'admin-list',
  components: {
    FSavedSearchList,
    ReportableFilter,
    SimpleConfirm
  },
  mixins: [deletables],
  data () {
    return {
      deleteReportDialog: false,
      lastFilterParams: {}
    }
  },
  computed: {
    isLoadingList () {
      return get(this.$store, 'state.savedReports.pending.items', true)
    },
    ...mapGetters('savedReports', {
      reportables: 'items',
      pagination: 'pagination',
      sorting: 'sorting',
      sortBy: 'sortBy'
    }),
    ...mapGetters('page', { isLoading: 'isLoading' }),
    ...mapGetters('dealTypes', {
      dealTypes: 'items'
    }),
    ...mapGetters('dealStatuses', {
      dealStatuses: 'items'
    }),
    deleteDialogTitle () {
      return this.deletables.length < 2
        ? 'Are you sure you want to delete this report?'
        : 'Are you sure you want to delete the following reports?'
    },
    deleteableNames () {
      return this.deletables.map((report) => {
        return report.name
      }).join(', ')
    },
    selectables () {
      return {
        'deal-types': this.dealTypes,
        'deal-statuses': this.dealStatuses
      }
    }
  },
  methods: {
    ...mapActions('page', {
      setPageLoading: 'setLoading'
    }),
    deleteDialogUp (reports) {
      if (!Array.isArray(reports)) {
        reports = [reports]
      }
      this.deleteReportDialog = true
      this.deletables = reports
    },
    deleteReport (report) {
      this.deleteDialogUp(report)
    },
    async deleteReports () {
      this.deletablesProcessing = true
      this.deletablesProgress = 0
      this.deletablesStatus = ''
      let dispatcheables = []

      this.deletables.forEach((report) => {
        dispatcheables.push(
          this.$store.dispatch('savedReports/deleteItem', { getItems: false, params: { id: report.id } }))
      })

      let chunks = this.chunk(dispatcheables, this.deletablesParallelRequests)
      let doneCount = 0

      for (let i in chunks) {
        await Promise.all(chunks[i])
        doneCount += chunks[i].length
        this.deletablesStatus = doneCount + ' / ' + this.deletables.length + ' Done'
        this.deletablesProgress = doneCount / this.deletables.length * 100
        await this.sleep(this.deletablesSleepTime)
      }

      await this.filterReportables(this.lastFilterParams)
      this.deleteReportDialog = false
      this.deletablesProgress = 0
      this.deletablesStatus = ''
    },
    filterReportables (params) {
      this.lastFilterParams = params
      this.$store.dispatch('savedReports/setFilters', {
        ...this.lastFilterParams
      })
      return this.$store.dispatch('savedReports/getItems')
    },
    onPaginate (value) {
      this.$store.dispatch('savedReports/setPagination', value)
      this.$store.dispatch('savedReports/getItems')
    },
    deleteMultipleReports (reports) {
      this.deleteDialogUp(reports)
    }
  },
  beforeRouteEnterOrUpdate (vm, to, from, next) {
    vm.$store.dispatch('page/setLoading', true)
    Promise.all([
      vm.$store.dispatch('savedReports/getItems'),
      vm.$store.dispatch('dealTypes/getItems'),
      vm.$store.dispatch('dealStatuses/getItems')
    ]).then(() => {
      vm.$store.dispatch('page/setLoading', false)
      if (next) next()
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
