import { mount } from 'vue-cli-plugin-freshinup-ui/utils/testing'
import * as Stories from './index.stories'

describe('Edit Sales Opportunity Page', () => {
  describe('Visuals', () => {
    test('ItemLoaded', async () => {
      const wrapper = mount(Stories.ItemLoaded())
      wrapper.beforeRouteEnterOrUpdate(null, null, async () => {
        expect(wrapper.text()).toContain('Sales Opportunity Details')
        expect(wrapper.element).toMatchSnapshot()
      })
    })
  })
})
