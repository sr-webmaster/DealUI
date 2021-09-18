<template>
  <v-container
    grid-list-md
    fluid
  >
    <v-container
      grid-list-md
      px-0
      mb-1
      fluid
    >
      <v-layout
        row
        wrap
        justify-space-between
        align-center
      >
        <v-flex x4>
          <h2 class="f-page__title f-page__title--admin white--text">
            {{ pageTitle }}
          </h2>
        </v-flex>
        <v-flex xs2>
          <v-select
            ref="viewmode"
            v-model="selectedMode"
            :items="viewModes"
            item-value="uuid"
            item-text="name"
            placeholder=""
            solo
            flat
            hide-details
            @change="switchView"
          />
        </v-flex>
      </v-layout>
    </v-container>

    <v-divider />

    <deal-filter-sorter
      expanded
      :statuses="dealStatuses"
      :opptypes="dealTypes"
      :filters="filters"
      autocomplete-url="/api/v1/deals"
      @runFilter="onRun"
    />

    <v-divider />

    <DealCardGrid
      v-if="selectedMode === 1"
      :deals="deals"
      :page="pagination.page"
      :rows-per-page="pagination.rowsPerPage"
      :total-items="pagination.totalItems"
      :rows-per-page-items="[5, 10, 20, 30, 40, 50]"
      :is-loading="loading"
      @onSortRun="sortRun"
      @paginate="onPaginate"
      @manage-view="onManageView"
    />

    <DealList
      v-if="selectedMode === 2"
      :deals="deals"
      :statuses="dealStatuses"
      :rows-per-page="pagination.rowsPerPage"
      :page="pagination.page"
      :total-items="pagination.totalItems"
      :sort-by="sorting.sortBy"
      :descending="sorting.descending"
      :is-loading="loading"
      @paginate="onPaginate"
      @manage-view="onManageView"
    />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import DealList from '../../../components/DealList.vue'
import DealFilterSorter from '../../../components/DealFilterSorter.vue'
import DealCardGrid from '../../../components/DealCardGrid.vue'

const include = [
  'manager',
  'customer',
  'salesrep',
  'status',
  'type'
]

export default {
  layout: 'admin-list',
  components: {
    DealList,
    DealFilterSorter,
    DealCardGrid
  },
  data () {
    return {
      pageTitle: 'Sales Opportunities',
      lastFilterParams: {},
      viewModes: [
        { uuid: 1, name: 'Card' },
        { uuid: 2, name: 'List' }
      ],
      selectedMode: 1,
      loading: false,
      rowsPerPage: 5,
      filters: {
        status_id: null,
        type_id: null,
        salesrep_uuid: null,
        customer_uuid: null
      }
    }
  },
  computed: {
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
    })
  },
  methods: {
    ...mapActions('page', {
      setPageLoading: 'setLoading'
    }),
    switchView (mode) {
      this.selectedMode = mode
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
    onManageView (deal) {
      this.$router.push({ path: '/admin/sales-opportunities/' + deal.uuid })
    }
  },
  beforeRouteEnterOrUpdate (vm, to, from, next) {
    vm.$store.dispatch('page/setLoading', true)
    Promise.all([
      vm.$store.dispatch('dealTypes/getItems'),
      vm.$store.dispatch('dealStatuses/getItems'),
      vm.$store.dispatch('deals/getItems', { params: { include: include } })
    ]).then(() => {
      vm.$store.dispatch('page/setLoading', false)
      if (next) next()
    })
  }
}
</script>
