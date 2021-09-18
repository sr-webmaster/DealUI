import { createLocalVue, shallowMount, mount } from '@vue/test-utils'
import Component from '~/components/DealCardGrid.vue'

describe('Deals Card View component', () => {
  let localVue
  describe('Snapshots', () => {
    test('defaults', () => {
      localVue = createLocalVue()
      const wrapper = mount(Component, {
        localVue: localVue
      })
      expect(wrapper.element).toMatchSnapshot()
    })

    test('occurs when runwithsort is invoked', () => {
      const wrapper = shallowMount(Component, {
        localVue: createLocalVue().localVue
      })
      wrapper.vm.runwithsort()
      expect(wrapper.emitted().onSortRun).toBeTruthy()
    })
  })

  describe('paginate event', () => {
    test('occurs when onRowsPerPageChange is invoked', () => {
      const wrapper = shallowMount(Component, {
        localVue: createLocalVue().localVue
      })
      wrapper.vm.onRowsPerPageChange(2)
      wrapper.vm.onRowsPerPageChange(1)

      // assert event has been emitted
      expect(wrapper.emitted().paginate).toBeTruthy()

      // assert event count
      expect(wrapper.emitted().paginate).toHaveLength(2)

      // assert event payload
      expect(wrapper.emitted().paginate[0][0].rowsPerPage).toEqual(2)
      expect(wrapper.emitted().paginate[1][0].rowsPerPage).toEqual(1)
    })
    test('occurs when onPageChange is invoked', () => {
      const wrapper = shallowMount(Component, {
        localVue: createLocalVue().localVue
      })
      wrapper.vm.onPageChange(17)
      wrapper.vm.onPageChange(4)

      // assert event has been emitted
      expect(wrapper.emitted().paginate).toBeTruthy()

      // assert event count
      expect(wrapper.emitted().paginate).toHaveLength(2)

      // assert event payload
      expect(wrapper.emitted().paginate[0][0].page).toEqual(17)
      expect(wrapper.emitted().paginate[1][0].page).toEqual(4)
    })
  })
  describe('manage-view event', () => {
    test('occurs when view method is invoked', () => {
      const wrapper = shallowMount(Component, {
        localVue: createLocalVue().localVue
      })
      wrapper.vm.view({ id: 2 })

      // assert event has been emitted
      expect(wrapper.emitted()['manage-view']).toBeTruthy()
      expect(wrapper.emitted()['manage-view']).toHaveLength(1)

      // assert event payload
      expect(wrapper.emitted()['manage-view'][0][0]).toEqual({ id: 2 })
    })
  })
})
