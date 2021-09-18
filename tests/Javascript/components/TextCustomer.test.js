import { mount } from '@vue/test-utils'
import Component from '~/components/TextCustomer.vue'

describe('Customer Message', () => {
  it('snapshot default', async () => {
    const deal = {
      id: 1,
      name: 'Trade in: 2016 Prius owner looking for SUV options'
    }
    const customer = {
      pbs_id: 999,
      name: 'User',
      email: 'info@mail.com',
      mobile_phone: '766-888-9999'
    }
    const wrapper = mount(Component, {
      propsData: {
        dialog: false,
        deal: deal,
        customer: customer
      }
    })
    wrapper.setData({ textMessage: '' })
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.text()).toContain(customer.email)
    expect(wrapper.props().customer).toBe(customer)
    expect(wrapper.props().deal).toBe(deal)
    wrapper.find('[data-textMessage]').setValue('alice')
    wrapper.find('button').trigger('click.prevent')
    await wrapper.vm.$nextTick()
    wrapper.findAll('button').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(2)
    expect(wrapper.emitted('save')).toHaveLength(1)
  })
})
