import createStore from 'tests/createStore'
import makePageStory from 'vue-cli-plugin-freshinup-ui/utils/makePageStory'
import { DEALS } from '../../../../.storybook/categories.js'
import { FIXTURE_USER } from '@freshinup/deals-ui/tests/__data__/user'
import { FIXTURE_OPPORTUNITY_MODIFIERS_RESPONSE } from '@freshinup/deals-ui/tests/__data__/opportunityModifiers'
import { FIXTURE_OPPORTUNITY_TYPES_RESPONSE } from '@freshinup/deals-ui/tests/__data__/opportunityTypes'
import { FIXTURE_OPPORTUNITY_STATUSES_RESPONSE } from '@freshinup/deals-ui/tests/__data__/opportunityStatuses'
import { FIXTURE_DEALS_RESPONSE } from '@freshinup/deals-ui/tests/__data__/deals'
import Page from './index.vue'
import PageStoryInstances from 'tests/PageStoryInstances'

export default {
  title: `${DEALS} Pages|admin/opportunity-reports`,
  id: 'pages/admin/opportunity-reports'
}

/**
 * https://storybook.js.org/docs/guides/guide-vue/#step-4-write-your-stories
 */
export const PopulatedList = () => {
  const store = createStore({
    currentUser: FIXTURE_USER,
    page: {
      title: 'Opportunity Reports'
    }
  })
  return makePageStory(Page, store, {
    ...PageStoryInstances,
    apiMockRoutes: {
      'api/currentUser': {
        GET: [200, FIXTURE_USER]
      },
      'api/deals/v1/deals': {
        GET: [200, FIXTURE_DEALS_RESPONSE]
      },
      'api/deals/v1/statuses': {
        GET: [200, FIXTURE_OPPORTUNITY_STATUSES_RESPONSE]
      },
      'api/deals/v1/types': {
        GET: [200, FIXTURE_OPPORTUNITY_TYPES_RESPONSE]
      },
      'api/deals/v1/modifiers': {
        GET: [200, FIXTURE_OPPORTUNITY_MODIFIERS_RESPONSE]
      }
    },
    beforeMount () {
      Page.beforeRouteEnterOrUpdate(this)
    }
  })
}

export const EmptyList = () => {
  const store = createStore({
    currentUser: FIXTURE_USER,
    page: {
      title: 'Opportunity Reports'
    }
  })
  return makePageStory(Page, store, {
    ...PageStoryInstances,
    apiMockRoutes: {
      'api/currentUser': {
        GET: [200, FIXTURE_USER]
      },
      'api/deals/v1/deals': {
        GET: [200, { data: [] }]
      },
      'api/deals/v1/statuses': {
        GET: [200, FIXTURE_OPPORTUNITY_STATUSES_RESPONSE]
      },
      'api/deals/v1/types': {
        GET: [200, FIXTURE_OPPORTUNITY_TYPES_RESPONSE]
      },
      'api/deals/v1/modifiers': {
        GET: [200, FIXTURE_OPPORTUNITY_MODIFIERS_RESPONSE]
      }
    },
    beforeMount () {
      Page.beforeRouteEnterOrUpdate(this)
    }
  })
}
