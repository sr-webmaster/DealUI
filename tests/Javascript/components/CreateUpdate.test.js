import { mount } from '@vue/test-utils'
import createLocalVue from 'vue-cli-plugin-freshinup-ui/utils/testing/createLocalVue'
import createStore from '../../createStore'
import BaseComponent from '~/components/CreateUpdate.vue'

describe('SalesOpportunitiesDetailPage', () => {
  let localVue, store, mock
  describe('Visuals', () => {
    beforeEach(() => {
      const vue = createLocalVue()
      localVue = vue.localVue
      store = createStore({})
      mock = vue.mock
    })

    afterEach(() => {
      mock.restore()
    })

    it('mount create page', async () => {
      const Component = {
        extends: BaseComponent,
        layout: BaseComponent.layout,
        beforeRouteEnterOrUpdate: BaseComponent.beforeRouteEnterOrUpdate,
        data () {
          return {}
        }
      }
      const wrapper = mount(Component, {
        localVue,
        store
      })

      Component.beforeRouteEnterOrUpdate(wrapper.vm, null, null, async () => {
        await wrapper.vm.$store.dispatch('page/setLoading', false)
        await wrapper.vm.$nextTick()
        expect(wrapper.html()).toContain('Sales Opportunities Detail')
        expect(wrapper.find('.back-btn-inner').text()).toContain('Return')
        expect(wrapper.element).toMatchSnapshot()
      })
    })

    test('backToList function will redirect to the opportunity list page', () => {
      const wrapper = mount(BaseComponent, {
        localVue,
        store
      })
      wrapper.vm.$router = {
        push: jest.fn()
      }
      wrapper.vm.backToList()
      expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ 'path': '/admin/sales-opportunities' })
    })
  })
})
