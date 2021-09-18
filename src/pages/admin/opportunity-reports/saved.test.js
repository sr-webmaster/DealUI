import { mount } from '@vue/test-utils'
import Vuex from 'vuex'
import createLocalVue
  from 'vue-cli-plugin-freshinup-ui/utils/testing/createLocalVue'
import dealTypes from '~/store/modules/dealTypes'
import dealStatuses from '~/store/modules/dealStatuses'
import savedReports from '~/store/modules/savedReports'
import { FIXTURE_OPPORTUNITY_TYPES_RESPONSE } from '@freshinup/deals-ui/tests/__data__/opportunityTypes'
import { FIXTURE_OPPORTUNITY_STATUSES_RESPONSE } from '@freshinup/deals-ui/tests/__data__/opportunityStatuses'
import { FIXTURE_DEALS_RESPONSE } from '@freshinup/deals-ui/tests/__data__/deals'
import { FIXTURE_REPORTABLES, FIXTURE_REPORTABLES_RESPONSE } from '@freshinup/deals-ui/tests/__data__/reportables'
import Component from './saved'

describe('Saved Reports Page', () => {
  let localVue, mock, store, actions
  beforeEach(() => {
    const vue = createLocalVue({ validation: false, vuex: true })
    localVue = vue.localVue
    actions = {
      'page/setTitle': jest.fn(),
      'page/setLoading': jest.fn()
    }

    store = new Vuex.Store({
      modules: {
        dealTypes: dealTypes({}),
        dealStatuses: dealStatuses({}),
        savedReports: savedReports({}),
        page: {
          namespaced: true,
          getters: {
            'title': () => {
              return 'Saved Reports Page Snapshots default 1'
            },
            'isLoading': () => {
              return false
            }
          }
        }
      },
      actions
    })
    mock = vue.mock
    mock
      .onGet('api/deals/v1/saved-reports',
        { params: { 'page[size]': 10, 'page[number]': 1 } })
      .reply(200, { data: FIXTURE_REPORTABLES })
      .onGet('api/deals/v1/saved-reports')
      .reply(200, FIXTURE_REPORTABLES_RESPONSE)

    mock
      .onGet('api/deals/v1/types')
      .reply(200, FIXTURE_OPPORTUNITY_TYPES_RESPONSE)
      .onGet('api/deals/v1/statuses')
      .reply(200, FIXTURE_OPPORTUNITY_STATUSES_RESPONSE)
      .onGet('api/deals/v1/deals')
      .reply(200, FIXTURE_DEALS_RESPONSE)
      .onAny()

    mock.onAny().reply(config => {
      console.warn('No mock match for ' + config.url, config)
      return [
        404,
        { message: 'No mock match for ' + config.url, data: config }]
    })
  })
  afterEach(() => {
    mock.restore()
  })

  describe('Snapshots', () => {
    test('default', done => {
      const wrapper = mount(Component, {
        localVue,
        store
      })

      // Action: load the page data
      Component.beforeRouteEnterOrUpdate(wrapper.vm, null, null, async () => {
        await wrapper.vm.$store.dispatch('page/setTitle', 'Saved Opp. Reports')
        await wrapper.vm.$store.dispatch('page/setLoading', true)
        await wrapper.vm.$store.dispatch('savedReports/getItems')
        await wrapper.vm.$store.dispatch('dealTypes/getItems')
        await wrapper.vm.$store.dispatch('dealStatuses/getItems')

        expect(store.state.savedReports.items.data[0])
          .toHaveProperty('name', 'Custom Report #1')
        expect(store.state.dealTypes.items.data[0])
          .toHaveProperty('name', 'Test 1')
        expect(store.state.dealStatuses.items.data[0])
          .toHaveProperty('name', 'Status 1')
        await wrapper.vm.$nextTick()
        await wrapper.vm.$store.dispatch('page/setLoading', false)
        expect(wrapper.element).toMatchSnapshot()
        expect(wrapper.text()).toContain('Create Reports')
        expect(wrapper.text()).toContain('Saved Reports')
        done()
      })
    })

    test('Delete Report', async () => {
      const wrapper = mount(Component, {
        localVue,
        store
      })
      await wrapper.vm.$store.dispatch('savedReports/getItems')
      let report = store.state.savedReports.items.data[0]

      wrapper.vm.deleteReport(report)
      wrapper.vm.deleteReports()
    })

    test('Delete Reports', async () => {
      const wrapper = mount(Component, {
        localVue,
        store
      })
      await wrapper.vm.$store.dispatch('savedReports/getItems')
      let reports = store.state.savedReports.items.data

      wrapper.vm.deleteMultipleReports(reports)
      wrapper.vm.deleteReports()
    })

    test('Filter', () => {
      const wrapper = mount(Component, {
        localVue,
        store
      })

      wrapper.vm.filterReportables({})
    })

    test('Paginate', async () => {
      const wrapper = mount(Component, {
        localVue,
        store
      })

      wrapper.vm.onPaginate(2)
    })
  })
})
