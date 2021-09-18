<template>
  <div>
    <v-data-table
      v-model="selected"
      class="elevation-1"
      :headers="_headers"
      :items="deals"
      :rows-per-page-items="[5, 10, 15, 25, 30, 50]"
      :pagination.sync="pagination"
      :loading="isLoading"
      :total-items="totalItems"
      item-key="id"
      hide-actions
      :select-all="isSelectable"
      must-sort
    >
      <v-progress-linear
        slot="progress"
        indeterminate
        height="10"
      />
      <template
        slot="headerCell"
        slot-scope="props"
      >
        <span v-if="isSelectable && selected.length > 1 && props.header.value === 'manage'">
          <v-btn
            color="primary"
            dark
            @click="manageMultipleDelete"
          >
            Delete Multiple
          </v-btn>
        </span>
        <span v-else>
          {{ props.header.text }}
        </span>
      </template>
      <template slot="no-data">
        <v-alert
          :value="true"
          color="error"
          icon="warning"
        >
          Sorry, nothing to display here :(
        </v-alert>
      </template>

      <template
        slot="items"
        slot-scope="props"
      >
        <td
          v-if="isSelectable"
          :class="props.item.appointments === true ? 'appointmentalert' : 'borderalert'"
        >
          <v-checkbox
            v-model="props.selected"
            primary
            hide-details
          />
        </td>
        <template
          v-for="(header, headerIndex) in _headers"
        >
          <slot
            v-if="header.value === 'id'"
            :name="'item-'+header.value"
            :item="props.item"
          >
            <td
              :key="idx"
              class="text-xs-left"
            >
              <slot
                :name="'item-inner-'+header.value"
                :item="props.item"
              >
                {{ props.item.id }}
              </slot>
            </td>
          </slot>

          <slot
            v-else-if="header.value === 'status'"
            :name="'item-'+header.value"
            :item="props.item"
          >
            <td
              :key="headerIndex"
              class="justify-center text-xs-center"
            >
              <slot
                :name="'item-inner-'+header.value"
                :item="props.item"
              >
                <v-select
                  :items="statuses"
                  :value="props.item.status_id"
                  item-text="name"
                  item-value="id"
                  menu-props="auto"
                  label="Status"
                  hide-details
                  single-line
                  solo
                  @change="changeStatus($event, props.item)"
                />
              </slot>
            </td>
          </slot>
          <slot
            v-else-if="header.value === 'name'"
            :name="'item-'+header.value"
            :item="props.item"
          >
            <td
              :key="headerIndex"
              class="text-xs-left"
            >
              <slot
                :name="'item-inner-'+header.value"
                :item="props.item"
              >
                <v-icon
                  v-if="props.item.appointments === true"
                  color="orange darken-2"
                >
                  warning
                </v-icon>
                <a
                  class="title"
                  @click="viewDetails(props.item)"
                >
                  {{ props.item.name }}
                </a>
              </slot>
            </td>
          </slot>
          <slot
            v-else-if="header.value === 'customer'"
            :name="'item-'+header.value"
            :item="props.item"
          >
            <td
              :key="headerIndex"
              class="text-xs-left"
            >
              <slot
                :name="'item-inner-'+header.value"
                :item="props.item"
              >
                <div class="font-weight-bold mb-1">
                  {{ get(props, 'item.customer.name', '') }}<br>
                  {{ get(props, 'item.customer.email', '') }}
                </div>
              </slot>
            </td>
          </slot>
          <slot
            v-else-if="header.value === 'age'"
            :name="'item-'+header.value"
            :item="props.item"
          >
            <td
              :key="headerIndex"
              class="text-xs-center"
            >
              <slot
                :name="'item-inner-'+header.value"
                :item="props.item"
              >
                <div class="@freshinup/core-ui-admin-user-list__joined_date">
                  {{ timeago(props.item.created_at, 'YYYY-MM-DD h:m:s') }}
                </div>
              </slot>
            </td>
          </slot>
          <slot
            v-else-if="header.value === 'source'"
            :name="'item-'+header.value"
            :item="props.item"
          >
            <td
              :key="headerIndex"
              class="text-xs-left"
            >
              <slot
                :name="'item-inner-'+header.value"
                :item="props.item"
              >
                <div class="font-weight-bold mb-1">
                  {{ props.item.source }}
                </div>
              </slot>
            </td>
          </slot>
          <slot
            v-else-if="header.value === 'sales_manager'"
            :name="'item-'+header.value"
            :item="props.item"
          >
            <td
              :key="headerIndex"
              class="text-xs-left"
            >
              <slot
                :name="'item-inner-'+header.value"
                :item="props.item"
              >
                <div class="font-weight-bold mb-1">
                  {{ get(props, 'item.manager.name', '') }}
                </div>
              </slot>
            </td>
          </slot>
          <slot
            v-else-if="header.value === 'salesrep'"
            :name="'item-'+header.value"
            :item="props.item"
          >
            <td
              :key="headerIndex"
              class="text-xs-left"
            >
              <slot
                :name="'item-inner-'+header.value"
                :item="props.item"
              >
                <div class="font-weight-bold mb-1">
                  {{ get(props, 'item.salesrep.first_name', '') }}
                  {{ get(props, 'item.salesrep.last_name', '') }}
                </div>
              </slot>
            </td>
          </slot>

          <slot
            v-else-if="header.value === 'manage'"
            :name="'item-'+header.value"
            :item="props.item"
          >
            <td
              :key="headerIndex"
              class="justify-center text-xs-center"
            >
              <slot
                :name="'item-inner-'+header.value"
                :item="props.item"
              >
                <f-btn-menu
                  v-if="itemActions.length > 1"
                  :items="itemActions"
                  item-label="text"
                  @item="manage($event, props.item)"
                >
                  Manage
                </f-btn-menu>

                <v-btn
                  v-else
                  round
                  color="primary"
                  @click="viewDetails(props.item)"
                >
                  {{ itemActions[0].text }}
                </v-btn>
              </slot>
            </td>
          </slot>
        </template>
      </template>
    </v-data-table>
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
  </div>
</template>

<script>

import Pagination from '@freshinup/core-ui/src/mixins/Pagination'
import FormatDate from '@freshinup/core-ui/src/mixins/FormatDate'
import FBtnMenu from '@freshinup/core-ui/src/components/FBtnMenu'
import timeago from '../mixins/timeago'
import get from 'lodash/get'

export const DEFAULT_HEADERS = [
  { text: 'Status', sortable: false, value: 'status', align: 'center' },
  { text: 'Opportunitity Title', sortable: true, value: 'name', align: 'left' },
  { text: 'Customer Info', sortable: true, value: 'customer', align: 'left' },
  { text: 'Age', sortable: true, value: 'age', align: 'center' },
  { text: 'Source', sortable: true, value: 'source', align: 'center' },
  { text: 'Manager', sortable: true, value: 'sales_manager', align: 'left' },
  { text: 'Sales rep', sortable: true, value: 'salesrep', align: 'left' },
  { text: 'Manage', sortable: false, value: 'manage', align: 'center' }
]
export const DEFAULT_ITEM_ACTIONS = [
  { action: 'view', text: 'View / Edit' },
  { action: 'delete', text: 'Delete' }
]
export default {
  components: { FBtnMenu },
  mixins: [
    Pagination,
    FormatDate,
    timeago
  ],
  props: {
    deals: {
      type: Array,
      default: () => []
    },
    statuses: {
      type: Array,
      default: () => [] // { text: '', value: 0 }
    },
    headers: {
      type: Array,
      default: () => (DEFAULT_HEADERS)
    },
    itemActions: {
      type: Array,
      default: () => (DEFAULT_ITEM_ACTIONS)
    },
    isSelectable: {
      type: Boolean,
      default: () => true
    }
  },
  data () {
    return {
      selected: [],
      actionBtnTitle: 'Manage'
    }
  },
  computed: {
    _headers () {
      let headers = [].concat(this.headers)
      return headers
    },

    selectedUserActions () {
      if (!this.selected.length) return []
      let actions = []
      actions.push({ action: 'delete', text: 'Delete' })
      return actions
    }
  },
  methods: {
    get,
    onPageChange (value) {
      this.pagination = { ...this.pagination, page: value }
    },
    onRowsPerPageChange (value) {
      this.pagination = { ...this.pagination, rowsPerPage: value }
    },
    manage (item, element) {
      this.$emit('manage-' + item.action, element)
      this.$emit('manage', item.action, element)
    },
    manageMultipleDelete () {
      this.$emit('multipledelete', this.selected)
    },
    changeStatus (value, element) {
      this.$emit('change-status', value, element)
    },
    viewDetails (element) {
      this.$emit('manage-view', element)
      this.$emit('manage', 'view', element)
    }
  }
}
</script>

<style scoped lang="scss">
  .highlight {
    background: #ffa;
  }
  .title {
     font-size: 1.1em !important;
   }
  .title:link {
    text-decoration: none;
  }
  .appointmentalert {
    border-left: orange;
    border-left-width: 5px;
    border-left-style: solid;
  }
  .borderalert {
    border-left: transparent;
    border-left-width: 5px;
    border-left-style: solid;
  }
</style>
