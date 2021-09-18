import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '~/components/InternetSalesFunnel.vue'

const data = [
  { label: 'CREATING', value: 10 },
  { label: 'ASSIGNMENT', value: 20 },
  { label: 'INITIAL CONTACT', value: 30 },
  { label: 'NEEDS ASSESSMENT', value: 40 },
  { label: 'VALUE BUILDING', value: 60 },
  { label: 'QUOTING ESTIMATION', value: 90 },
  { label: 'PENDING', value: 120 },
  { label: 'CLOSED', value: 150 }
]

describe('InternetSalesFunnel', () => {
  let localVue

  describe('Snapshot', () => {
    test('default', () => {
      global.SVGPathElement = jest.fn()
      localVue = createLocalVue()

      const wrapper = shallowMount(Component, {
        propsData: {
          chartData: { data }
        },
        localVue: localVue
      })

      expect(wrapper.element).toMatchSnapshot()
    })
    test('with format', () => {
      global.SVGPathElement = jest.fn()
      localVue = createLocalVue()

      const wrapper = shallowMount(Component, {
        propsData: {
          chartData: { data },
          numberFormat: "'$'#,##a"
        },
        localVue: localVue
      })

      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
