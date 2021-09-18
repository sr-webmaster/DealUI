import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import Component from './CustomerDetails.vue'

describe('Customer Card View', () => {
  let localVue
  describe('Visuals', () => {
    test('defaults', () => {
      localVue = createLocalVue()
      const wrapper = mount(Component, { localVue })
      expect(wrapper.element).toMatchSnapshot()
    })
    test('customer property is null', () => {
      localVue = createLocalVue()
      let wrapper = {}
      expect(() => {
        wrapper = mount(Component, {
          localVue,
          propsData: {
            customer: null
          }
        })
      }).not.toThrow()
      expect(wrapper.element).toMatchSnapshot()
    })
    test('customer populated', () => {
      localVue = createLocalVue()
      const wrapper = mount(Component, {
        localVue,
        propsData: {
          customer: {
            id: 1,
            first_name: 'First',
            last_name: 'Last',
            email: 'example@email.com',
            phone: '123456789',
            title: 'Sir',
            company: 'Place',
            text_enabled: 'Yes',
            customer_deals: 3
          }
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })
    test('rows set', () => {
      localVue = createLocalVue()
      const wrapper = mount(Component, {
        localVue,
        propsData: {
          customer: {
            id: 1,
            first_name: 'First',
            last_name: 'Last',
            email: 'example@email.com',
            phone: '123456789',
            title: 'Sir',
            company: 'Place',
            text_enabled: 'Yes',
            customer_deals: 3
          },
          rows: [
            { text: 'Email', key: 'email' },
            { text: 'Phone', key: 'phone' },
            { text: 'Can be texted?', key: 'text_enabled' }
          ]
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })
  })
  describe('Computed', () => {
    describe('item', () => {
      test('returns empty object when customer property isNil', () => {
        const wrapper = shallowMount(Component, {
          propsData: {
            customer: null
          }
        })
        expect(wrapper.vm.item).toBeTruthy()
        expect(wrapper.vm.item).toEqual({})
      })
    })
    describe('companyName', () => {
      test('returns string of company name when customer.company is a string', () => {
        const wrapper = shallowMount(Component, {
          propsData: {
            customer: {
              id: 1,
              first_name: 'First',
              last_name: 'Last',
              email: 'example@email.com',
              phone: '123456789',
              title: 'Sir',
              company: 'FreshinUp',
              text_enabled: 'Yes',
              customer_deals: 3
            }
          }
        })
        expect(wrapper.vm.companyName).toEqual('FreshinUp')
      })
      test('returns string of company name when customer.company is an object', () => {
        const wrapper = shallowMount(Component, {
          propsData: {
            customer: {
              id: 1,
              first_name: 'First',
              last_name: 'Last',
              email: 'example@email.com',
              phone: '123456789',
              title: 'Sir',
              company: {
                id: 22,
                uuid: 'c67d7e83-02ee-4c2a-975e-61567c1f4c0a',
                created_at: '2020-04-03 07:19:32',
                status: 1,
                name: 'FreshinUp',
                address: '2266 Test Ave',
                address2: 'unit 5',
                city: 'Madison',
                state: 'WI',
                zip: '53558',
                country: 'US',
                website: null,
                notes: null,
                members_count: null,
                teams_count: null,
                tags: [],
                logo: 'https://via.placeholder.com/800x600.png',
                company_types: []
              },
              text_enabled: 'Yes',
              customer_deals: 3
            }
          }
        })
        expect(wrapper.vm.companyName).toEqual('FreshinUp')
      })
    })
  })
})
