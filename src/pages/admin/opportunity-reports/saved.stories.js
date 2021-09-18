import createStore from 'tests/createStore'
import makePageStory from 'vue-cli-plugin-freshinup-ui/utils/makePageStory'
import { DEALS } from '../../../../.storybook/categories.js'
import { FIXTURE_USER } from '@freshinup/deals-ui/tests/__data__/user'
import { FIXTURE_OPPORTUNITY_MODIFIERS_RESPONSE } from '@freshinup/deals-ui/tests/__data__/opportunityModifiers'
import { FIXTURE_REPORTABLES_RESPONSE } from '@freshinup/deals-ui/tests/__data__/reportables'
import Page from './saved.vue'
import PageStoryInstances from 'tests/PageStoryInstances'

export default {
  title: `${DEALS} Pages|admin/opportunity-reports/saved`,
  id: 'pages/admin/opportunity-reports/saved'
}

/**
 * https://storybook.js.org/docs/guides/guide-vue/#step-4-write-your-stories
 */
export const PopulatedList = () => {
  const store = createStore({
    currentUser: FIXTURE_USER
  })
  return makePageStory(Page, store, {
    ...PageStoryInstances,
    apiMockRoutes: {
      'api/currentUser': {
        GET: [200, FIXTURE_USER]
      },
      'api/deals/v1/saved-reports': {
        GET: [200, FIXTURE_REPORTABLES_RESPONSE]
      },
      'api/deals/v1/modifiers': {
        GET: [200, FIXTURE_OPPORTUNITY_MODIFIERS_RESPONSE]
      }
    },
    beforeMount () {
      setTimeout(() => {
        Page.beforeRouteEnterOrUpdate(this)
      }, 1300)
    }
  })
}

export const EmptyList = () => {
  const store = createStore({
    currentUser: FIXTURE_USER
  })
  return makePageStory(Page, store, {
    ...PageStoryInstances,
    apiMockRoutes: {
      'api/currentUser': {
        GET: [200, FIXTURE_USER]
      },
      'api/deals/v1/saved-reports': {
        GET: [200, { data: [] }]
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
