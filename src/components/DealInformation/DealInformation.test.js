import { mount, shallowMount } from '@vue/test-utils'
import createLocalVue from 'vue-cli-plugin-freshinup-ui/utils/testing/createLocalVue'
import Component from '@freshinup/deals-ui/src/components/DealInformation'
import * as Stories from './DealInformation.stories'
import { FIXTURE_DEALS } from '@freshinup/deals-ui/tests/__data__/deals'
import { FIXTURE_OPPORTUNITY_STATUSES } from '@freshinup/deals-ui/tests/__data__/opportunityStatuses'
import { FIXTURE_OPPORTUNITY_TYPES } from '@freshinup/deals-ui/tests/__data__/opportunityTypes'

describe('DealInformation', () => {
  let localVue
  beforeAll(() => {
    localVue = createLocalVue().localVue
  })

  describe('Computed', () => {
    // Using shallowMount test the computed properties
    test('Property Values and Defined', () => {
      const wrapper = shallowMount(Component, { localVue })
      expect(wrapper.props().deal).toEqual({})
      expect(wrapper.props().types).toEqual([])
      expect(wrapper.props().statuses).toEqual([])
    })
    test('Lookup List Conversion', () => {
      const wrapper = shallowMount(Component, {
        localVue,
        propsData: {
          statuses: FIXTURE_OPPORTUNITY_STATUSES,
          types: FIXTURE_OPPORTUNITY_TYPES
        }
      })
      expect(wrapper.vm.statusList).toContainEqual({ id: '2', label: 'Status 2' })
      expect(wrapper.vm.typeList).toContainEqual({ id: '2', label: 'Test 2' })
    })
    test('Lookup Id Conversion', () => {
      const wrapper = shallowMount(Component, {
        localVue,
        propsData: {
          deal: FIXTURE_DEALS[0],
          statuses: FIXTURE_OPPORTUNITY_STATUSES,
          types: FIXTURE_OPPORTUNITY_TYPES
        }
      })
      expect(wrapper.vm.selectedStatusId).toBe('1')
      expect(wrapper.vm.selectedTypeId).toBe('1')
    })
  })

  describe('Methods', () => {
    test('Change Event Emitted', () => {
      const wrapper = shallowMount(Component, { localVue })
      wrapper.vm.emitChange({ key: 'value' })
      expect(wrapper.emitted().change).toBeTruthy()
      expect(wrapper.emitted().change[0]).toEqual([ { key: 'value' } ])
    })
    test('Change Event Emitted - Value wrap', () => {
      const wrapper = shallowMount(Component, {
        localVue,
        propsData: {
          deal: { name: 'Deal' }
        }
      })
      wrapper.vm.emitChange({ key: 'value' })
      expect(wrapper.emitted().change).toBeTruthy()
      expect(wrapper.emitted().change[0]).toEqual([ { name: 'Deal', key: 'value' } ])
    })
    test('Contact Name Formatting', () => {
      const wrapper = shallowMount(Component, { localVue })
      expect(wrapper.vm.formatName(FIXTURE_DEALS[0].manager)).toBe('Wally Schirra')
    })
    test('Events Triggered', () => {
      const wrapper = shallowMount(Component, { localVue })
      wrapper.vm.save()
      expect(wrapper.emitted().save).toBeTruthy()
      wrapper.vm.cancel()
      expect(wrapper.emitted().cancel).toBeTruthy()
    })
    test('Lookup change triggers Change', async () => {
      const wrapper = shallowMount(Component, {
        localVue,
        propsData: {
          deal: FIXTURE_DEALS[0],
          statuses: FIXTURE_OPPORTUNITY_STATUSES,
          types: FIXTURE_OPPORTUNITY_TYPES
        }
      })

      wrapper.vm.selectedStatusId = '2'
      wrapper.vm.selectedTypeId = '2'
      expect(wrapper.emitted().change).toBeTruthy()
      expect(wrapper.emitted().change).toHaveLength(2)
      expect(wrapper.emitted().change[0]).toEqual([ { ...FIXTURE_DEALS[0], status_id: 2 } ])
      expect(wrapper.emitted().change[1]).toEqual([ { ...FIXTURE_DEALS[0], type_id: 2 } ])
    })
  })

  describe('Visuals', () => {
    test('Update Mode', () => {
      // Use mount and snapshot assertions
      const wrapper = mount(Stories.UpdateMode(), { localVue })

      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.element).toMatchSnapshot()
    })
    test('New Mode', () => {
      // Use mount and snapshot assertions
      const wrapper = mount(Stories.NewMode(), { localVue })

      expect(wrapper.isVueInstance()).toBe(true)
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
