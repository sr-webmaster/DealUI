import { createLocalVue, mount } from '@vue/test-utils'
import Component from '~/components/DealFilterSorter.vue'
import { FIXTURE_OPPORTUNITY_TYPES } from '@freshinup/deals-ui/tests/__data__/opportunityTypes'
import { FIXTURE_OPPORTUNITY_STATUSES } from '@freshinup/deals-ui/tests/__data__/opportunityStatuses'

describe('Filter Sorter', () => {
  // Component instance "under test"
  let localVue
  describe('Snapshots', () => {
    test('snapshot', () => {
      localVue = createLocalVue()
      const wrapper = mount(Component, {
        localVue: localVue,
        propsData: {
          type: FIXTURE_OPPORTUNITY_TYPES,
          statuses: FIXTURE_OPPORTUNITY_STATUSES
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('Methods', () => {
    beforeEach(() => {
      localVue = createLocalVue()
    })

    test('changeDate() set values to date_after and date_before filters', () => {
      const wrapper = mount(Component, {
        propsData: {
          filters: {
            status_id: null,
            type_id: null,
            lot: null,
            salesrep_uuid: null,
            customer_uuid: null,
            date_after: null,
            date_before: null
          }
        }
      })
      wrapper.setData({ range: {
        start: '2019-12-11', end: '2019-12-17'
      } })
      wrapper.vm.changeDate()
      expect(wrapper.props().filters.date_after).toBe('2019-12-11')
      expect(wrapper.props().filters.date_before).toBe('2019-12-17')
      wrapper.setData({ range: null })
      wrapper.vm.changeDate()
      expect(wrapper.props().filters.date_after).toBeNull()
      expect(wrapper.props().filters.date_before).toBeNull()
    })

    test('clearFilters function clear filters', () => {
      const wrapper = mount(Component)
      wrapper.vm.clearFilters({})
      expect(wrapper.vm.status_id).toBeNull()
      expect(wrapper.vm.type_id).toBeNull()
    })
  })
})
