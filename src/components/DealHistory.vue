<template>
  <v-layout
    column
  >
    <v-layout
      row
      wrap
    >
      <v-flex
        shrink
        pa-3
      >
        <label
          for="deal-activity-types"
          class="font-weight-bold text-uppercase caption pa-2"
        >
          Display
        </label>
        <multi-select
          id="deal-activity-types"
          v-model="selectedDisplayFilters"
          class="mt-2"
          :items="types"
          item-value="id"
          item-text="name"
          placeholder="None selected"
          select-all-name="All Types"
          solo
          hide-details
        />
      </v-flex>

      <v-flex
        shrink
        pa-3
      >
        <label class="font-weight-bold text-uppercase caption pa-2">Sort By</label>
        <v-select
          v-model="sortBy"
          class="mt-2"
          :items="sortables"
          label="Sort By"
          solo
        />
      </v-flex>
    </v-layout>

    <v-layout>
      <v-timeline
        dense
        style="width:100%"
      >
        <v-timeline-item
          v-if="hasNoHistory"
          icon="fa-info"
          color="secondary"
        >
          <v-card class="elevation-1">
            <v-card-text class="d-flex">
              <div>
                <div class="caption">
                  No History available or none that matches the Filters.
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-timeline-item>
        <template
          v-for="(group, groupKey) in historyGroup"
        >
          <v-timeline-item
            :key="`group-${groupKey}`"
            color="secondary"
            class="f-deal-history__group"
          >
            <v-card
              class="elevation-2 d-flex"
              max-width="200px"
              min-width="100px"
              color="secondary"
              dark
            >
              <v-card-title
                class="d-flex text-center"
              >
                <h3 class="text-xs-center">
                  {{ groupKey }}
                </h3>
              </v-card-title>
            </v-card>
          </v-timeline-item>
          <template
            v-for="(item) in group"
          >
            <v-timeline-item
              :key="`item-${item.uuid}`"
              :icon="getIconByType(item.type).icon"
              :color="getIconByType(item.type).color"
              class="f-deal-history__item"
            >
              <v-card class="elevation-2">
                <v-card-text class="d-flex">
                  <div>
                    <div class="caption">
                      {{ item.title }}
                    </div>
                    <div class="title mt-2 mb-2">
                      {{ item.note }}
                    </div>
                    <div class="overline">
                      Due: {{ dateToFormat(item.scheduled_at) }} - <a
                        href="#"
                        @click.prevent="viewDetail(item)"
                      >Details</a>
                    </div>
                  </div>
                  <div class="d-flex align-center justify-end pr-4">
                    {{ item.posted_by && item.posted_by.name }}
                    {{ dateToFormat(item.created_at) }}
                  </div>
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </template>
        </template>
      </v-timeline>
    </v-layout>
  </v-layout>
</template>

<script>
import moment from 'moment'
import MultiSelect from '@freshinup/core-ui/src/components/FMultiSelect'
import get from 'lodash/get'
import map from 'lodash/map'
import size from 'lodash/size'
import groupBy from 'lodash/groupBy'

let sortables = [
  { value: 'desc', text: 'New - old' },
  { value: 'asc', text: 'Old - new' }
]

const TIMELINE_ICONS = {
  1: {
    icon: 'mdi-phone',
    color: 'red lighten-2'
  },
  2: {
    icon: 'mdi-message-text',
    color: 'purple darken-1'
  },
  3: {
    icon: 'mdi-email',
    color: 'green lighten-1'
  },
  4: {
    icon: 'mdi-walk',
    color: 'indigo'
  },
  5: {
    icon: 'mdi-calendar-outline',
    color: 'indigo'
  },
  DEFAULT: { icon: 'star', color: 'info' }
}

export default {
  components: {
    MultiSelect
  },
  props: {
    history: {
      type: Array,
      required: true
    },
    types: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    sortables,
    sortBy: 'asc',
    selectedDisplayFilters: []
  }),
  computed: {
    hasNoHistory () {
      return !size(this.historyGroup)
    },
    historyGroup () {
      let filtered = []
      // Filter
      if (this.selectedDisplayFilters.length === this.types.length) {
        filtered = this.history
      } else {
        filtered = this.history.filter(m => this.selectedDisplayFilters.includes(get(m, 'type.id', null)))
      }
      // Sort
      filtered = filtered.sort((a, b) => {
        const dateA = new Date(a.created_at)
        const dateB = new Date(b.created_at)
        filtered = (this.sortBy === 'desc' ? dateA - dateB : dateB - dateA)
        return filtered
      })
      return this.groupHistory(filtered)
    }
  },
  mounted () {
    this.groupHistory(this.history)
    this.selectedDisplayFilters = map(this.types, 'id')
  },
  methods: {
    dateToFormat (dateTime) {
      return moment(dateTime).startOf('day').format('LL')
    },
    viewDetail (obj) {
      this.$emit('view', obj)
    },
    getIconByType (type) {
      return get(TIMELINE_ICONS, type.id, TIMELINE_ICONS.DEFAULT)
    },
    groupHistory (items) {
      return groupBy(items, (item) => {
        return this.dateToFormat(item.created_at)
      })
    }
  }
}
</script>
