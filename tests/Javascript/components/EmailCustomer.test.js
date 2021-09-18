import { mount } from '@vue/test-utils'
import Component from '~/components/EmailCustomer.vue'

describe('Email Customer', () => {
  it('snapshot default', () => {
    const user = {
      id: 999,
      name: 'User',
      email: 'info@mail.com',
      phone: '766-888-9999'
    }
    const templates = [
      'Template One',
      'Template Two'
    ]
    const deal = {
      id: 1,
      name: 'Your Best Chance'
    }

    const wrapper = mount(Component, {
      propsData: {
        dialog: false,
        user: user,
        templates: templates,
        deal: deal
      }

    })
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.text()).toContain(user.email)
    expect(wrapper.props().user).toBe(user)
    expect(wrapper.props().deal).toBe(deal)
    expect(wrapper.props().templates).toBe(templates)
    wrapper.findAll('button').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(2)
    expect(wrapper.emitted('save')).toHaveLength(1)
  })
})
