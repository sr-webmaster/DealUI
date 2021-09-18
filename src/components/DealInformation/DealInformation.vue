<template>
  <v-container
    fluid
    grid-list-lg
  >
    <v-form>
      <v-layout row>
        <v-flex sm9>
          <label
            class="font-weight-bold text-uppercase caption py-2"
          >Opportunity Title</label>
          <v-text-field
            v-model.lazy.trim="name"
            autofocus
            single-line
            outline
          />
        </v-flex>
        <v-flex sm3>
          <label
            class="font-weight-bold text-uppercase caption pa-2"
          >Status</label>
          <div>
            <f-btn-status
              v-model="selectedStatusId"
              label="Status"
              :items="statusList"
            />
          </div>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex sm3>
          <label class="font-weight-bold text-uppercase caption py-2">Opportunity Type</label>
          <v-select
            v-model="type_id"
            :items="types"
            item-value="id"
            item-text="name"
            outline
            single-line
          />
        </v-flex>
        <v-flex sm3>
          <label class="font-weight-bold text-uppercase caption py-2">Lead Source</label>
          <v-text-field
            :value="source"
            disabled
            solo
            flat
          />
        </v-flex>
        <v-flex sm3>
          <label class="font-weight-bold text-uppercase caption py-2">Import Date &amp; Time</label>
          <p class="pa-2">
            {{ deal && formatDate(deal.created_at) }}
          </p>
        </v-flex>
        <v-flex sm3>
          <label class="font-weight-bold text-uppercase caption py-2">Age</label>
          <p class="pa-2">
            {{ deal && deal.age }}
          </p>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex sm3>
          <label class="font-weight-bold text-uppercase caption py-2">Sales Rep</label>
          <f-search-simple
            v-model="salesrep"
            :url="autocompleteSalesRepsUrl"
            term-param="filter[name]"
            placeholder="type a name"
            persistent-hint
            results-id-key="id"
            :label="null"
            outline
            single-line
          />
        </v-flex>
        <v-flex sm3>
          <label class="font-weight-bold text-uppercase caption py-2">Internet Coordinator</label>
          <v-text-field
            :value="deal && formatName(deal.internet_coordinator)"
            disabled
            solo
            flat
          />
        </v-flex>
        <v-flex sm3>
          <label class="font-weight-bold text-uppercase caption py-2">Sales Manager</label>
          <v-text-field
            :value="deal && formatName(deal.manager)"
            disabled
            solo
            flat
          />
        </v-flex>
        <v-flex sm3>
          <label class="font-weight-bold text-uppercase caption py-2">F &amp; I Manager</label>
          <v-text-field
            :value="deal && formatName(deal.fi_manager)"
            disabled
            solo
            flat
          />
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex sm3>
          <label
            for="deal-info-estimate"
            class="font-weight-bold text-uppercase caption py-2"
          >Estimated Budget</label>
          <v-text-field
            id="deal-info-estimate"
            v-model="estimate"
            type="number"
            single-line
            outline
          />
        </v-flex>
        <v-flex sm3>
          <label
            for="deal-info-pbsid"
            class="font-weight-bold text-uppercase caption py-2"
          >PBS Deal Id</label>
          <v-text-field
            id="deal-info-pbsid"
            v-model="deal_pbs_id"
            single-line
            outline
          />
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex grow>
          <label
            for="deal-info-notes"
            class="font-weight-bold text-uppercase caption pa-2"
          >Notes</label>
          <v-textarea
            id="deal-info-notes"
            v-model="notes"
            autogrow
            single-line
            outline
          />
        </v-flex>
      </v-layout>
      <v-divider />
      <v-layout>
        <v-flex>
          <f-btn
            round
            large
            color="primary"
            @click="save"
          >
            Save Changes
          </f-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
import get from 'lodash/get'
import map from 'lodash/map'
import mapModelFields from '@freshinup/core-ui/src/utils/mapModelFields'
import FormatDate from '@freshinup/core-ui/src/mixins/FormatDate'
import FBtn from '@freshinup/core-ui/src/components/FBtn'
import FBtnStatus from '@freshinup/core-ui/src/components/FBtnStatus'
import FSearchSimple from '@freshinup/core-ui/src/components/FSearchSimple'

export default {
  components: {
    FSearchSimple,
    FBtn,
    FBtnStatus
  },
  mixins: [
    FormatDate
  ],
  model: {
    prop: 'deal',
    event: 'change'
  },
  props: {
    deal: {
      type: Object,
      default: () => ({})
    },
    types: {
      type: Array,
      default: () => []
    },
    statuses: {
      type: Array,
      default: () => []
    },
    autocompleteSalesRepsUrl: {
      type: String,
      default: 'api/users?filter[type]=1'
    }
  },
  computed: {
    statusList () { return map(this.statuses, (status) => ({ id: status.id.toString(), label: status.name })) },
    typeList () { return map(this.types, (type) => ({ id: type.id.toString(), label: type.name })) },
    typeName () { return get(this.types.find((type) => type.id === this.type_id), 'name') },

    // use a custom v-model modifier?
    selectedStatusId: {
      get () { return this.status_id && this.status_id.toString() },
      set (val) { this.status_id = parseInt(val) }
    },
    selectedTypeId: {
      get () { return this.type_id && this.type_id.toString() },
      set (val) { this.type_id = parseInt(val) }
    },
    ...mapModelFields([
      'name',
      'status_id',
      'salesrep',
      'source',
      'type_id',
      'estimate',
      'deal_pbs_id',
      'notes'
    ], {
      prop: 'deal',
      event: 'change'
    })
  },
  methods: {
    formatName (contact) {
      return (get(contact, 'first_name', '') + ' ' + get(contact, 'last_name', '')).trim()
    },
    emitChange (val) {
      this.$emit('change', { ...this.deal, ...val })
    },
    save () {
      this.$emit('save', this.deal)
    },
    cancel () {
      this.$emit('cancel', this.deal)
    }
  }
}
</script>

<style scoped>
  ::v-deep .v-input__slot {
    border-width: 1px !important;
  }
</style>
