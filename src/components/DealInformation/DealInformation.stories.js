import { DEALS } from '../../../.storybook/categories.js'
import { action } from '@storybook/addon-actions'
import DealInformation from './DealInformation.vue'
import { FIXTURE_DEALS } from '@freshinup/deals-ui/tests/__data__/deals'
import { FIXTURE_OPPORTUNITY_STATUSES } from '@freshinup/deals-ui/tests/__data__/opportunityStatuses'
import { FIXTURE_OPPORTUNITY_TYPES } from '@freshinup/deals-ui/tests/__data__/opportunityTypes'

export default {
  title: `${DEALS}|DealInformation`,
  id: 'admin/deal-information',
  decorators: [ () => `<v-container><v-card><story /></v-card></v-container>` ]
}

/**
 * https://storybook.js.org/docs/guides/guide-vue/#step-4-write-your-stories
 */
export const UpdateMode = () => ({
  components: {
    DealInformation
  },
  data () {
    return {
      deal: FIXTURE_DEALS[0],
      statuses: FIXTURE_OPPORTUNITY_STATUSES,
      types: FIXTURE_OPPORTUNITY_TYPES
    }
  },
  methods: {
    change (params) {
      action('change')(params)
    },
    save (params) {
      action('save')(params)
    }
  },
  template: `
    <deal-information
      v-model="deal"
      :statuses="statuses"
      :types="types"
      @change="change"
      @save="save"
    />
  `
})

export const NewMode = () => ({
  components: {
    DealInformation
  },
  data () {
    return {
      deal: {},
      statuses: FIXTURE_OPPORTUNITY_STATUSES,
      types: FIXTURE_OPPORTUNITY_TYPES
    }
  },
  methods: {
    change (params) {
      action('change')(params)
    }
  },
  template: `
    <deal-information
      v-model="deal"
      isNew
      :statuses="statuses"
      :types="types"
    />
  `
})
