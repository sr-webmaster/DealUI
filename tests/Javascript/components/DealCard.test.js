import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import { FIXTURE_DEALS } from '../../__data__/deals'
import Component from '~/components/DealCard.vue'

describe('Deals Card', () => {
  describe('Snapshots', () => {
    test('defaults', () => {
      const wrapper = mount(Component, {
        localVue: createLocalVue(),
        propsData: {
          deal: {
            id: 1,
            name: 'Test Name',
            customer: { first_name: 'First', last_name: 'Last', id: '123' },
            manager: { first_name: 'First', last_name: 'Last', id: '1234' },
            salesrep: { first_name: 'First', last_name: 'Last', id: '12345' },
            created_at: '45 Days',
            source: 'cars.com',
            type_id: 1,
            estimate: '25000',
            status_id: 1,
            status: { id: 1, name: 'Active' }
          }
        }
      })
      expect(wrapper.element).toMatchSnapshot()
      expect(wrapper.text()).toContain('Active')
    })
  })
  describe('clickDeal event', () => {
    test('occurs when clickDeal method is invoked', () => {
      const wrapper = shallowMount(Component, {
        localVue: createLocalVue(),
        propsData: {
          deal: {
            id: 1,
            name: 'Test Name',
            customer: { first_name: 'First', last_name: 'Last', id: '123' },
            manager: { first_name: 'First', last_name: 'Last', id: '1234' },
            salesrep: { first_name: 'First', last_name: 'Last', id: '12345' },
            created_at: '45 Days',
            source: 'cars.com',
            type_id: 1,
            estimate: '25000',
            status_id: 1,
            status: { id: 1, name: 'Active' },
            type: { id: 1, name: 'Mobile' }
          }
        }
      })
      wrapper.vm.clickDeal()

      // assert event has been emitted
      expect(wrapper.emitted().clickDeal).toBeTruthy()
      expect(wrapper.emitted().clickDeal).toHaveLength(1)

      // assert event payload
      expect(wrapper.emitted().clickDeal[0][0]).toEqual({
        id: 1,
        name: 'Test Name',
        customer: { first_name: 'First', last_name: 'Last', id: '123' },
        manager: { first_name: 'First', last_name: 'Last', id: '1234' },
        salesrep: { first_name: 'First', last_name: 'Last', id: '12345' },
        created_at: '45 Days',
        source: 'cars.com',
        type_id: 1,
        estimate: '25000',
        status_id: 1,
        status: { id: 1, name: 'Active' },
        type: { id: 1, name: 'Mobile' }
      })
    })
  })
  describe('Computed', () => {
    describe('titleColor', () => {
      test('active color', () => {
        const wrapper = shallowMount(Component, {
          localVue: createLocalVue(),
          propsData: {
            deal: FIXTURE_DEALS[0]
          }
        })
        expect(wrapper.vm.titleColor).toEqual('#5a51c2')
      })
      test('status id 2 color', () => {
        const wrapper = shallowMount(Component, {
          localVue: createLocalVue(),
          propsData: {
            deal: FIXTURE_DEALS[3]
          }
        })
        expect(wrapper.vm.titleColor).toEqual('#9e84b4')
      })
      test('default color', () => {
        const wrapper = shallowMount(Component, {
          localVue: createLocalVue(),
          propsData: {
            deal: {
              ...FIXTURE_DEALS[2],
              status: { id: 4, name: 'Status 4' }
            }
          }
        })
        expect(wrapper.vm.titleColor).toEqual('#e01a00')
      })
    })
  })
})
