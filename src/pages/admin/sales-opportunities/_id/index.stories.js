import createStore from 'tests/createStore'
import makePageStory from 'vue-cli-plugin-freshinup-ui/utils/makePageStory'
import Page from './index.vue'
import PageStoryInstances from 'tests/PageStoryInstances'
import { DEALS } from '../../../../../.storybook/categories.js'
import { FIXTURE_USER } from '@freshinup/deals-ui/tests/__data__/user'
import { FIXTURE_DEALS } from '@freshinup/deals-ui/tests/__data__/deals'
import { FIXTURE_ACTIVITIES, FIXTURE_TYPES } from '@freshinup/deals-ui/tests/__data__/activities'
import { FIXTURE_OPPORTUNITY_STATUSES_RESPONSE } from '@freshinup/deals-ui/tests/__data__/opportunityStatuses'
import { FIXTURE_OPPORTUNITY_TYPES_RESPONSE } from '@freshinup/deals-ui/tests/__data__/opportunityTypes'

export default {
  title: `${DEALS} Pages|admin/sales-opportunities/_id`,
  id: 'pages/admin/sales-opportunities/_id'
}

/**
 * https://storybook.js.org/docs/guides/guide-vue/#step-4-write-your-stories
 */

export const PageLoading = () => {
  const store = createStore({
    currentUser: FIXTURE_USER
  })
  return makePageStory(Page, store, {
    ...PageStoryInstances,
    apiMockRoutes: {
      'api/currentUser': {
        GET: [200, FIXTURE_USER]
      }
    },
    beforeMount () {
      store.dispatch('page/setLoading', true)
    }
  })
}

export const ItemLoaded = () => {
  const store = createStore({
    currentUser: FIXTURE_USER
  })
  return makePageStory(Page, store, {
    ...PageStoryInstances,
    apiMockRoutes: {
      'api/currentUser': {
        GET: [200, FIXTURE_USER]
      },
      'api/deals/v1/deals/1': {
        GET: [200, { data: FIXTURE_DEALS[0] }]
      },
      'api/activity/v1/activities': {
        GET: [200, { data: FIXTURE_ACTIVITIES }]
      },
      'api/deals/v1/statuses': {
        GET: [200, FIXTURE_OPPORTUNITY_STATUSES_RESPONSE]
      },
      'api/deals/v1/types': {
        GET: [200, FIXTURE_OPPORTUNITY_TYPES_RESPONSE]
      },
      'api/activity/v1/types': {
        GET: [200, { data: FIXTURE_TYPES }]
      }
    },
    beforeMount () {
      Page.beforeRouteEnterOrUpdate(this, { params: { id: 1 } })
    }
  })
}
