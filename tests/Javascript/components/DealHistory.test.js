import { createLocalVue, shallowMount } from '@vue/test-utils'
import size from 'lodash/size'
import map from 'lodash/map'
import Component from '~/components/DealHistory.vue'
import { FIXTURE_CUSTOMERS, FIXTURE_SALEREPS, FIXTURE_STATUSES } from '@freshinup/deals-ui/tests/__data__/activities'

const FIXTURE_TYPES = [
  { id: 1, name: 'Opportunity updates' },
  { id: 2, name: 'Email' },
  { id: 3, name: 'Text' },
  { id: 4, name: 'Activity updates' }
]

const FIXTURE_ACTIVITIES = [
  {
    uuid: '7141df95-7807-4df2-a2d2-a1c4cfb8f322',
    title: 'History of type text',
    note: 'Note of type text',
    created_at: '2019-01-01 11:21:00',
    type: FIXTURE_TYPES[0],
    posted_by: {
      name: 'John Doe'
    },
    status: {
      name: 'changed'
    },
    scheduled_at: '2019-01-01 11:05:00'
  },
  {
    uuid: '7141df95-7807-4df2-a2d2-b1c4cfb8f8e1',
    title: 'History of type email',
    note: 'Note of type email',
    created_at: '2019-11-01 11:25:00',
    type: FIXTURE_TYPES[1],
    posted_by: {
      name: 'John Doe'
    },
    status: {
      name: 'changed'
    },
    scheduled_at: '2019-01-28 11:10:00'
  },
  {
    uuid: '7141df95-7807-4df2-a2d2-e1c4cfb8f8e1',
    title: 'History of type scheduled activity',
    note: 'Note of type scheduled activity',
    created_at: '2019-02-01 11:29:00',
    type: FIXTURE_TYPES[1],
    posted_by: {
      name: 'John Doe'
    },
    status: {
      name: 'changed'
    },
    scheduled_at: '2019-01-29 11:25:00'
  },
  {
    uuid: '71443f95-7807-4df2-a2d2-a1c4cfb8f8e1',
    title: 'History of type opportunity update',
    note: 'Note of type opportunity update',
    created_at: '2019-01-02 11:20:00',
    type: FIXTURE_TYPES[0],
    posted_by: {
      name: 'John Doe'
    },
    status: {
      name: 'changed'
    },
    scheduled_at: '2019-01-30 11:20:00'
  },
  {
    uuid: '1231df95-7807-4df2-a2d2-a1c4cfb8f8e1',
    title: 'History of Duplicate Day',
    note: 'Note of Duplicate Day',
    created_at: '2019-01-02 11:26:00',
    type: FIXTURE_TYPES[1],
    posted_by: {
      name: 'John Doe'
    },
    status: {
      name: 'changed'
    },
    scheduled_at: '2019-01-29 11:20:00'
  },
  {
    uuid: '7141df95-7807-4df2-a2d2-a1c4cfb8f8r1',
    title: 'Lorem Ipsum',
    note: 'Notes are good',
    created_at: '2019-01-02 11:25:00',
    type: FIXTURE_TYPES[3],
    posted_by: {
      name: 'John Doe'
    },
    status: {
      name: 'changed'
    },
    scheduled_at: '2019-01-29 11:20:00'
  },
  {
    uuid: '7141df95-7807-4df2-a2d2-a1c4cfb8f8e2',
    title: 'Lorem Ipsum3 ',
    note: 'text type',
    created_at: '2019-06-20T15:30:23Z',
    type: FIXTURE_TYPES[3],
    posted_by: {
      name: 'John Doe'
    },
    status: {
      name: 'changed'
    },
    scheduled_at: '2019-01-29 11:20:00'
  },
  {
    uuid: '7141df95-7807-4df2-a2d2-a1c4cfb8f8e1',
    title: 'Lorem Ipsum 2',
    note: 'duplicate day',
    created_at: '2019-06-20T15:30:23Z',
    type: FIXTURE_TYPES[3],
    posted_by: {
      name: 'John Doe'
    },
    status: {
      name: 'changed'
    },
    scheduled_at: '2019-01-29 11:20:00'
  }
]

describe('DealHistory', () => {
  let localVue
  describe('Snapshots', () => {
    test('deal history timeline', () => {
      localVue = createLocalVue()
      const wrapper = shallowMount(Component, {
        localVue: localVue,
        propsData: {
          history: FIXTURE_ACTIVITIES,
          types: FIXTURE_TYPES
        }
      })
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('FilterHistory', () => {
    beforeEach(() => {
      localVue = createLocalVue()
    })
    test('filter history all', async () => {
      const wrapper = shallowMount(Component, {
        localVue,
        propsData: {
          history: FIXTURE_ACTIVITIES,
          types: FIXTURE_TYPES
        },
        data: () => ({
          selectedDisplayFilters: map(FIXTURE_TYPES, 'id')
        })
      })
      await wrapper.vm.$nextTick()
      expect(wrapper.findAll('.f-deal-history__item')).toHaveLength(FIXTURE_ACTIVITIES.length)
    })
    test('filter history to 1 type', async () => {
      const wrapper = shallowMount(Component, {
        localVue,
        propsData: {
          history: FIXTURE_ACTIVITIES,
          types: FIXTURE_TYPES
        }
      })
      wrapper.setData({ selectedDisplayFilters: [1] })
      await wrapper.vm.$nextTick()
      expect(wrapper.findAll('.f-deal-history__group')).toHaveLength(2)
      expect(wrapper.findAll('.f-deal-history__item')).toHaveLength(2)
      expect(wrapper.findAll('.f-deal-history__item').at(0).text()).toContain('History of type opportunity update')
    })
    test('filter history 2 types', async () => {
      const wrapper = shallowMount(Component, {
        localVue,
        propsData: {
          history: FIXTURE_ACTIVITIES,
          types: FIXTURE_TYPES
        },
        data: () => ({
          selectedDisplayFilters: [2, 3]
        })
      })
      await wrapper.vm.$nextTick()
      expect(wrapper.findAll('.f-deal-history__group')).toHaveLength(5)
      expect(wrapper.findAll('.f-deal-history__item').at(0).text()).toContain('email')
      expect(wrapper.findAll('.f-deal-history__item').at(1).text()).toContain('text')
    })
  })

  describe('SortHistory', () => {
    beforeEach(() => {
      localVue = createLocalVue()
    })
    test('Sort Ascending', async () => {
      const wrapper = shallowMount(Component, {
        localVue,
        propsData: {
          history: FIXTURE_ACTIVITIES,
          types: FIXTURE_TYPES
        },
        data: () => ({
          sortBy: 'asc',
          selectedDisplayFilters: map(FIXTURE_TYPES, 'id')
        })
      })
      await wrapper.vm.$nextTick()
      expect(wrapper.findAll('.f-deal-history__group')).toHaveLength(5)
      expect(wrapper.findAll('.f-deal-history__item').at(0).text()).toContain('November 1, 2019')
      expect(wrapper.findAll('.f-deal-history__item').at(1).text()).toContain('June 20, 2019')
      expect(wrapper.findAll('.f-deal-history__item').at(2).text()).toContain('June 20, 2019')
      expect(wrapper.findAll('.f-deal-history__item').at(3).text()).toContain('February 1, 2019')
      expect(wrapper.findAll('.f-deal-history__item').at(4).text()).toContain('January 2, 2019')
    })

    test('Sort Descending', async () => {
      const wrapper = shallowMount(Component, {
        localVue,
        propsData: {
          history: FIXTURE_ACTIVITIES,
          types: FIXTURE_TYPES
        }
      })
      wrapper.setData({
        sortBy: 'desc',
        selectedDisplayFilters: map(FIXTURE_TYPES, 'id')
      })
      await wrapper.vm.$nextTick()
      expect(wrapper.findAll('.f-deal-history__group')).toHaveLength(5)
      expect(wrapper.findAll('.f-deal-history__item').at(7).text()).toContain('November 1, 2019')
      expect(wrapper.findAll('.f-deal-history__item').at(6).text()).toContain('June 20, 2019')
      expect(wrapper.findAll('.f-deal-history__item').at(5).text()).toContain('June 20, 2019')
      expect(wrapper.findAll('.f-deal-history__item').at(4).text()).toContain('February 1, 2019')
      expect(wrapper.findAll('.f-deal-history__item').at(3).text()).toContain('January 2, 2019')
    })
  })

  describe('Methods', () => {
    describe('groupHistory()', () => {
      test('sets two groups from created_at', async () => {
        const wrapper = shallowMount(Component, {
          localVue,
          propsData: {
            history: [
              {
                'uuid': '89102675-5b82-42aa-a2a1-6ea2f742a089',
                'scheduled_at': '2019-11-16T21:45:42Z',
                'created_at': '2020-05-29T02:08:00Z',
                'status': FIXTURE_STATUSES[1],
                'type': FIXTURE_TYPES[4],
                'customer': FIXTURE_CUSTOMERS[41],
                'salesrep': FIXTURE_SALEREPS[19],
                'title': 'Multi-layered full-range throughput',
                'activity_reminder_quantity': 9,
                'activity_reminder_unity_id': 28
              },
              {
                'uuid': 'e6275696-f21c-41f7-8ae3-d4d08bdaae62',
                'scheduled_at': '2019-10-11T14:55:22Z',
                'created_at': '2020-05-29T02:08:00Z',
                'status': FIXTURE_STATUSES[2],
                'type': FIXTURE_TYPES[4],
                'customer': FIXTURE_CUSTOMERS[2],
                'salesrep': FIXTURE_SALEREPS[47],
                'title': 'Reverse-engineered composite open architecture',
                'activity_reminder_quantity': 6,
                'activity_reminder_unity_id': 57
              },
              {
                'uuid': '800840ea-3157-4ff1-ac70-250f25c195d8',
                'scheduled_at': '2019-06-22T14:00:44Z',
                'created_at': '2020-05-19T02:08:00Z',
                'status': FIXTURE_STATUSES[3],
                'type': FIXTURE_TYPES[3],
                'customer': FIXTURE_CUSTOMERS[5],
                'salesrep': FIXTURE_SALEREPS[23],
                'title': 'Distributed bifurcated knowledge user',
                'activity_reminder_quantity': 9,
                'activity_reminder_unity_id': 20
              }
            ],
            types: FIXTURE_TYPES
          }
        })
        wrapper.vm.groupHistory(wrapper.vm.history)
        await wrapper.vm.$nextTick()
        expect(size(wrapper.vm.historyGroup)).toEqual(2)
        expect(Object.keys(wrapper.vm.historyGroup)).toEqual(['May 29, 2020', 'May 19, 2020'])
      })
    })
  })
})
