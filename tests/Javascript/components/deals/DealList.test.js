import { createLocalVue, mount, shallowMount } from '@vue/test-utils'
import Component from '~/components/DealList.vue'

const FIXTURE_ITEMS = [
  {
    uuid: '1',
    status: '1',
    name: 'John Salesman',
    customer: {
      id: '234525',
      name: 'John Salesman'
    },
    age: '20',
    source: 'web',
    sales_manager: 'John Salesman',
    sales_rep: 'John Salesman'
  }
]

const FIXTURE_HEADERS = [
  { text: 'Opportunitity Title', sortable: true, value: 'name', align: 'left' },
  { text: 'Customer Info', sortable: true, value: 'customer', align: 'left' },
  { text: 'Manager', sortable: true, value: 'sales_manager', align: 'left' }
]

describe('DealList', () => {
  // Component instance "under test"
  let localVue
  describe('Snapshots', () => {
    test('deals set', () => {
      localVue = createLocalVue()
      const wrapper = mount(Component, {
        localVue: localVue,
        propsData: {
          items: FIXTURE_ITEMS
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })
    test('deal is empty', () => {
      localVue = createLocalVue()
      const wrapper = mount(Component, {
        localVue: localVue,
        propsData: {
          items: []
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })
    test('Custom headers', () => {
      localVue = createLocalVue()
      const wrapper = mount(Component, {
        localVue: localVue,
        propsData: {
          headers: FIXTURE_HEADERS
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })
    test('Custom item actions', () => {
      localVue = createLocalVue()
      const wrapper = mount(Component, {
        localVue: localVue,
        propsData: {
          itemActions: [{ action: 'view', text: 'View' }]
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('Methods', () => {
    beforeEach(() => {
      localVue = createLocalVue()
    })
    test('changeStatus() change-status', () => {
      const wrapper = shallowMount(Component, {
        propsData: {
          items: FIXTURE_ITEMS
        }
      })
      wrapper.vm.changeStatus()
      expect(wrapper.emitted()['change-status']).toBeTruthy()
    })
    test('viewDetails() emits manage-view', () => {
      const wrapper = shallowMount(Component)
      wrapper.vm.viewDetails({ uuid: 1 })
      expect(wrapper.emitted()['manage-view']).toBeTruthy()
      expect(wrapper.emitted()['manage-view'][0][0]).toEqual({ uuid: 1 })
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
    test('manage function emitted single manage action', () => {
      const wrapper = shallowMount(Component, {
        localVue
      })

      const itemActions = [
        { action: 'view', text: 'View / Edit' },
        { action: 'delete', text: 'Delete' }
      ]
      const mockDoc = { id: 1, title: 'mock title', status: 1 }

      wrapper.vm.manage(itemActions[0], mockDoc)
      wrapper.vm.manage(itemActions[1], mockDoc)

      expect(wrapper.emitted()['manage-view']).toBeTruthy()
      expect(wrapper.emitted()['manage-view'][0][0].id).toEqual(1)
      expect(wrapper.emitted()['manage-view'][0][0].title).toEqual('mock title')
      expect(wrapper.emitted()['manage-view'][0][0].status).toEqual(1)
      expect(wrapper.emitted()['manage-delete']).toBeTruthy()
      expect(wrapper.emitted()['manage-delete'][0][0].id).toEqual(1)
      expect(wrapper.emitted()['manage-delete'][0][0].title).toEqual('mock title')
      expect(wrapper.emitted()['manage-delete'][0][0].status).toEqual(1)
    })
    test('manageMultiple function emitted multiple manage action', () => {
      const wrapper = shallowMount(Component, {
        localVue
      })

      wrapper.vm.manageMultipleDelete('delete')

      expect(wrapper.emitted()['multipledelete']).toBeTruthy()
      expect(wrapper.emitted()['multipledelete'][0][0]).toEqual([])
    })

    describe('Computed', () => {
      beforeEach(() => {
        localVue = createLocalVue()
      })
      test('selectedUserActions', () => {
        const wrapper = shallowMount(Component)
        wrapper.setData({ selected: [] })
        expect(wrapper.vm.selectedUserActions).toEqual([])
        wrapper.setData({ selected: [ 1 ] })
        expect(wrapper.vm.selectedUserActions[0].action).toBe('delete')
        expect(wrapper.vm.selectedUserActions[0].text).toBe('Delete')
      })
    })
  })
})
