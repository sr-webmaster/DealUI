<template>
  <v-layout
    column
  >
    <v-layout
      row
      wrap
      pt-3
    >
      <v-flex
        shrink
        px-2
      >
        <v-select
          :items="sortables"
          label="Sort By"
          solo
          flat
          @input="runwithsort"
        />
      </v-flex>
    </v-layout>

    <v-layout
      row
      wrap
    >
      <v-flex
        v-for="(item, index) in deals"
        :key="index"
        pa-2
        lg3
        md4
        sm6
        xs12
      >
        <deal-card
          :deal="item"
          @clickDeal="view"
        />
      </v-flex>
    </v-layout>

    <v-layout
      align-center
    >
      <v-flex
        grow
        justify-center
      >
        <v-layout
          justify-center
        >
          <v-pagination
            :value="page"
            :length="pagination.totalPages"
            :disabled="isLoading"
            :total-visible="6"
            @input="onPageChange"
          />
        </v-layout>
      </v-flex>
      <v-flex
        shrink
      >
        <v-select
          :value="rowsPerPage"
          :items="rowsPerPageItems"
          label="Results Per Page"
          @input="onRowsPerPageChange"
        />
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import Pagination from '@freshinup/core-ui/src/mixins/Pagination'
import FormatDate from '@freshinup/core-ui/src/mixins/FormatDate'
import DealCard from './DealCard'

let sortables = [
  { value: '-created_at', text: 'Age New-Old' },
  { value: 'created_at', text: 'Age Old-New' },
  { value: 'status_id', text: 'Status Asc' },
  { value: '-status_id', text: 'Status Desc' },
  { value: 'source', text: 'Source Asc' },
  { value: '-source', text: 'Source Desc' }
]

export default {
  components: {
    DealCard
  },
  mixins: [
    FormatDate,
    Pagination
  ],
  props: {
    deals: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      sortables: sortables
    }
  },
  computed: {
  },
  methods: {
    view (deal) {
      this.$emit('manage-view', deal)
    },
    onPageChange (value) {
      this.pagination = { ...this.pagination, page: value }
    },
    onRowsPerPageChange (value) {
      this.pagination = { ...this.pagination, rowsPerPage: value }
    },
    runwithsort (params) {
      var sortby = {}
      sortby.sort = params
      this.$emit('onSortRun', sortby)
    }
  }
}
</script>
