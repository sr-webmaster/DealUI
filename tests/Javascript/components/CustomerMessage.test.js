import { mount } from '@vue/test-utils'
import Component from '~/components/CustomerMessage.vue'

describe('Customer Message', () => {
  it('snapshot default', async () => {
    const wrapper = mount(Component, {
      propsData: {
        email: {
          subject: 'Discuss new arrivals / SUV options',
          message: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>',
          deal: {
            id: 1,
            name: 'Trade in: 2016 Prius owner looking for SUV options'
          },
          user: {
            id: 999,
            name: 'User',
            email: 'info@mail.com',
            phone: '766-888-9999'
          }
        }
      }
    })
    expect(wrapper.element).toMatchSnapshot()
    const closeBtn = wrapper.find('.v-btn--large')
    // wrapper.vm.close()
    closeBtn.trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
