import { createLocalVue, shallowMount, mount } from '@vue/test-utils'
import Component from '~/components/ReportFilter.vue'

describe('ReportFilter', () => {
  // Component instance "under test"
  let localVue
  describe('Snapshots', () => {
    test('defaults', () => {
      localVue = createLocalVue()
      const wrapper = mount(Component, {
        localVue: localVue
      })
      expect(wrapper.element).toMatchSnapshot()
    })
  })
  describe('Methods', () => {
    beforeEach(() => {
      localVue = createLocalVue()
    })
    test('generate functions emit generate event', () => {
      const wrapper = shallowMount(Component)
      wrapper.vm.generate()
      expect(wrapper.emitted().generate).toBeTruthy()
    })
    test('changeDate() set values to date_after and date_before filters', () => {
      const wrapper = shallowMount(Component, {
        propsData: {
          filters: {
            status: null,
            type: null,
            leads: null,
            sales_rep_uuid: null,
            customer_uuid: null,
            date_after: null,
            date_before: null
          }
        }
      })
      wrapper.setData({ range: {
        start: '2019-12-11',
        end: '2019-12-17'
      } })
      wrapper.vm.changeDate()
      expect(wrapper.props().filters.date_after).toBe('2019-12-11')
      expect(wrapper.props().filters.date_before).toBe('2019-12-17')
      wrapper.setData({ range: null })
      wrapper.vm.changeDate()
      expect(wrapper.props().filters.date_after).toBeNull()
      expect(wrapper.props().filters.date_before).toBeNull()
    })
  })
  describe('data()', () => {
    beforeEach(() => {
      localVue = createLocalVue()
    })
    test('range is set if date_before and/or date_after are set', () => {
      localVue = createLocalVue()
      const wrapper = mount(Component, {
        localVue,
        propsData: {
          filters: {
            status: null,
            type: null,
            leads: null,
            sales_rep_uuid: null,
            customer_uuid: null,
            date_after: '2019-12-11',
            date_before: '2019-12-17'
          }
        }
      })
      expect(wrapper.vm.range).toEqual({
        start: '2019-12-11',
        end: '2019-12-17'
      })
    })
  })
})
