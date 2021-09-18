import { mount } from 'vue-cli-plugin-freshinup-ui/utils/testing'
import DealList from '../../../components/DealList.vue'
import DealCardGrid from '../../../components/DealCardGrid.vue'
import get from 'lodash/get'
import * as Stories from './index.stories'

describe('Sales Opportunities Page', () => {
  describe('Visuals', () => {
    test('renders sales opportunities list page', (done) => {
      const wrapper = mount(Stories.PopulatedList())

      wrapper.beforeRouteEnterOrUpdate(null, null, async () => {
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.$store.getters['deals/items']).toHaveLength(5)
        const request = wrapper.apiMocked.history.get.filter((req) => req.url === '/deals/v1/deals')
        expect(request[0].params.include).toEqual(['manager', 'customer', 'salesrep', 'status', 'type'])
        expect(wrapper.text()).toContain('Sales Opportunities')
        expect(wrapper.element).toMatchSnapshot()
        done()
      })
    })

    test('switchView function CardView', async () => {
      const wrapper = mount(Stories.PopulatedList())
      wrapper.vm.switchView(2)
      await wrapper.vm.$nextTick()
      expect(wrapper.find(DealCardGrid).exists()).toBe(false)
      expect(wrapper.find(DealList).exists()).toBe(true)
    })

    test('switchView function ListView', async () => {
      const wrapper = mount(Stories.PopulatedList())
      wrapper.vm.switchView(1)
      await wrapper.vm.$nextTick()
      expect(wrapper.find(DealCardGrid).exists()).toBe(true)
      expect(wrapper.find(DealList).exists()).toBe(false)
    })
  })
  describe('Methods', () => {
    test('run() emits runFilter', () => {
      const wrapper = mount(Stories.PopulatedList())
      wrapper.vm.onRun({ term: 'abc' })
      expect(wrapper.vm.lastFilterParams.term).toBe('abc')
    })

    test('sortRun sets the sorting SortBy for deals', () => {
      const wrapper = mount(Stories.PopulatedList())
      wrapper.vm.sortRun({ sort: 'customer' })
      expect(get(wrapper.vm.$store.state, 'deals.sorting.sortBy')).toBe('customer')
    })
  })
})
