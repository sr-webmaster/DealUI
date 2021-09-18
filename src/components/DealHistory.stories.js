import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import DealHistory from './DealHistory.vue'
import { MAIN } from '../../.storybook/categories.js'
import { FIXTURE_ACTIVITIES, FIXTURE_TYPES } from '@freshinup/deals-ui/tests/__data__/activities'

const history = [
  {
    uuid: '7141df95-7807-4df2-a2d2-a1c4cfb8f322',
    title: 'History of type text',
    note: 'Note of type text',
    created_at: '2019-01-01 11:21:00',
    type: {
      id: 1,
      name: 'text'
    },
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
    type: {
      id: 2,
      name: 'email'
    },
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
    type: {
      id: 3,
      name: 'scheduled_activity'
    },
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
    type: {
      id: 4,
      name: 'opportunity_update'
    },
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
    type: {
      id: 3,
      name: 'scheduled_activity'
    },
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
    type: {
      id: 3,
      name: 'scheduled_activity'
    },
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
    note: 'Nd',
    created_at: '2019-06-20T15:30:23Z',
    type: {
      id: 3,
      name: 'scheduled_activity'
    },
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
    note: '',
    created_at: '2019-06-20T15:30:23Z',
    type: {
      id: 3,
      name: 'scheduled_activity'
    },
    posted_by: {
      name: 'John Doe'
    },
    status: {
      name: 'changed'
    },
    scheduled_at: '2019-01-29 11:20:00'
  }
]

const types = [
  { id: 1, name: 'Opportunity updates' },
  { id: 2, name: 'Email' },
  { id: 3, name: 'Text' },
  { id: 4, name: 'Activity updates' }
]

storiesOf(`${MAIN}|DealHistory`, module)
  .addDecorator(withKnobs)
  .add('Deal History Timeline', () => {
    return {
      components: { DealHistory },
      data () {
        return {
          history: history,
          types: types
        }
      },
      methods: {
        sortHistory (value) {
          action('sortHistory')(value)
        },
        displayHistory (value) {
          action('displayHistory')(value)
        },
        viewDetail (params) {
          action('Run')(params)
        }
      },
      template: `
        <v-container>
          <deal-history
            :history="history"
            :types="types"
            @on-sortrun="sortHistory"
            @on-displayrun="displayHistory"
            @view="viewDetail"
          />
        </v-container>
      `
    }
  })
  .add('using API fixture data', () => {
    return {
      components: { DealHistory },
      data () {
        return {
          history: FIXTURE_ACTIVITIES,
          types: FIXTURE_TYPES
        }
      },
      methods: {
        sortHistory (value) {
          action('sortHistory')(value)
        },
        displayHistory (value) {
          action('displayHistory')(value)
        },
        viewDetail (params) {
          action('Run')(params)
        }
      },
      template: `
        <v-container>
          <deal-history
            :history="history"
            :types="types"
            @on-sortrun="sortHistory"
            @on-displayrun="displayHistory"
            @view="viewDetail"
          />
        </v-container>
      `
    }
  })
  .add('no data', () => {
    return {
      components: { DealHistory },
      data () {
        return {
          history: [],
          types: FIXTURE_TYPES
        }
      },
      methods: {
        sortHistory (value) {
          action('sortHistory')(value)
        },
        displayHistory (value) {
          action('displayHistory')(value)
        },
        viewDetail (params) {
          action('Run')(params)
        }
      },
      template: `
        <v-container>
          <deal-history
            :history="history"
            :types="types"
            @on-sortrun="sortHistory"
            @on-displayrun="displayHistory"
            @view="viewDetail"
          />
        </v-container>
      `
    }
  })
