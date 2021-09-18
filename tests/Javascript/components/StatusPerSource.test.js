import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '~/components/StatusPerSource'

const items = [
  { label: 'a', statuses: [{ label: 'red', value: '10' }, { label: 'green', value: '10' }, { label: 'blue', value: '10' }] },
  { label: 'b', statuses: [{ label: 'red', value: '10' }, { label: 'green', value: '15' }, { label: 'blue', value: '10' }] },
  { label: 'c', statuses: [{ label: 'red', value: '10' }, { label: 'green', value: '10' }, { label: 'blue', value: '10' }] },
  { label: 'd', statuses: [{ label: 'red', value: '10' }, { label: 'green', value: '10' }, { label: 'blue', value: '25' }] },
  { label: 'e', statuses: [{ label: 'red', value: '10' }, { label: 'green', value: '15' }, { label: 'blue', value: '30' }] }
]

describe('Columns', () => {
  let localVue

  describe('Snapshot', () => {
    test('default', () => {
      global.SVGPathElement = jest.fn()
      localVue = createLocalVue()

      const wrapper = shallowMount(Component, {
        propsData: {
          items: items
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
          items: items,
          numberFormat: "'$'#,##a"
        },
        localVue: localVue
      })

      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
