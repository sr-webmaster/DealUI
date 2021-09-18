import { shallowMount } from '@vue/test-utils'
import createLocalVue from 'vue-cli-plugin-freshinup-ui/utils/testing/createLocalVue'
import { mount } from 'vue-cli-plugin-freshinup-ui/utils/testing'
import get from 'lodash/get'
import createStore from 'tests/createStore'
import { FIXTURE_DEALS_VISIBILITY } from '@freshinup/deals-ui/tests/__data__/deals'
import Component from './index.vue'
import * as Stories from './index.stories'

describe('Opp Report Page', () => {
  describe('Snapshots', () => {
    test('defaults', (done) => {
      const wrapper = mount(Stories.PopulatedList())
      wrapper.beforeRouteEnterOrUpdate(null, null, async () => {
        wrapper.vm.$nextTick()
        const table = wrapper.find('.csm-data-visibility')
        const defaultParameters = [
          { name: 'status', label: 'Status' },
          { name: 'name', label: 'Opportunity title' },
          { name: 'customer', label: 'Customer name / contact' },
          { name: 'age', label: 'Age' },
          { name: 'source', label: 'Lead source' },
          { name: 'sales_manager', label: 'Sales manager' },
          { name: 'salesrep', label: 'Sales Rep' }
        ]
        defaultParameters.forEach((item) => {
          const element = table.find('.v-input--checkbox input[aria-label="' + item.label + '"]')
          expect(element.attributes()).toHaveProperty('value', item.name)
          expect(element.attributes()).toHaveProperty('aria-checked', 'true')
        })
        const buttons = wrapper.findAll('button')
        buttons.trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.element).toMatchSnapshot()
        done()
      })
    })

    test('Reporting list', (done) => {
      const wrapper = mount(Stories.PopulatedList())

      wrapper.beforeRouteEnterOrUpdate(null, null, async () => {
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.$store.state.deals.items.data).toHaveLength(5)
        expect(wrapper.vm.$store.getters['deals/items'][0])
          .toHaveProperty('name', 'Test Name')
        expect(wrapper.vm.$store.state.dealTypes.items.data[0])
          .toHaveProperty('name', 'Test 1')
        expect(wrapper.vm.$store.state.dealStatuses.items.data[0])
          .toHaveProperty('name', 'Status 1')
        expect(wrapper.vm.$store.state.dealModifiers.items.data[0])
          .toHaveProperty('name', 'usque')
        await wrapper.vm.$nextTick()
        expect(wrapper.element).toMatchSnapshot()
        done()
      })
    })
  })

  describe('Methods', () => {
    let localVue, store, apiMocked
    beforeEach(() => {
      const apiMockRoutes = {
        'api/deals/v1/saved-reports': {
          POST: [200, {}]
        }
      }
      const vue = createLocalVue({ apiMockRoutes })
      localVue = vue.localVue
      apiMocked = vue.apiMocked
      store = createStore()
    })
    describe('saveReport()', () => {
      test('successful "shows" Success dialog', async () => {
        const goodData = {
          name: 'Report I like',
          modifier_1_uuid: 'sdfgsdg',
          modifier_2_uuid: 'sgsdfg',
          isFeatured: false
        }
        const wrapper = shallowMount(Component, {
          localVue,
          store
        })
        expect(wrapper.vm.confirmDialog).toEqual(false)
        await wrapper.vm.saveReport(goodData)
        wrapper.vm.$nextTick()
        expect(apiMocked.history.post).toHaveLength(1)
        expect(apiMocked.history.post[0]).toHaveProperty('url', '/deals/v1/saved-reports')
        const createItemData = JSON.parse(apiMocked.history.post[0].data)
        expect(createItemData).toHaveProperty('name', 'Report I like')
        expect(createItemData).toHaveProperty('filters')
        expect(wrapper.vm.saveDialog).toEqual(false)
        expect(wrapper.vm.confirmDialog).toEqual(true)
      })
    })
    test('onRun() emits runFilter', () => {
      const wrapper = shallowMount(Component, {
        localVue,
        store
      })
      wrapper.vm.onRun({ term: 'abc' })
      expect(wrapper.vm.lastFilterParams.term).toBe('abc')
    })
    test('sortRun() emits runFilter', () => {
      const wrapper = shallowMount(Component, {
        localVue,
        store
      })
      wrapper.vm.$store.dispatch('deals/setSort', 'customer')
      wrapper.vm.sortRun({ sort: 'customer' })
      expect(get(store.state, 'deals.sorting.sortBy')).toBe('customer')
    })
    test('selectedHeaders() returns currentUser.fresh_deals_visibility headers', () => {
      const wrapper = shallowMount(Component, {
        localVue,
        store
      })

      wrapper.vm.currentUser.fresh_deals_visibility = FIXTURE_DEALS_VISIBILITY

      let headers = wrapper.vm.selectedHeaders()
      let headerValues = headers.map(header => header.value)
      expect(headerValues).toEqual(expect.arrayContaining(FIXTURE_DEALS_VISIBILITY))
      expect(headerValues).toEqual(expect.arrayContaining(['manage']))
    })

    test('selectedHeaders() returns visibleParameters headers', () => {
      const wrapper = shallowMount(Component, {
        localVue,
        store
      })

      wrapper.vm.currentUser.fresh_deals_visibility = null
      wrapper.vm.visibleParameters = FIXTURE_DEALS_VISIBILITY
      let headers = wrapper.vm.selectedHeaders()
      let headerValues = headers.map(header => header.value)
      expect(headerValues).toEqual(expect.arrayContaining(FIXTURE_DEALS_VISIBILITY))
      expect(headerValues).toEqual(expect.arrayContaining(['manage']))
    })
  })
})
