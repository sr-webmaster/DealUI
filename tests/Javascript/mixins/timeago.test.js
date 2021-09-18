import timeago from '~/mixins/timeago'
describe('Mixins timeago', () => {
  describe('method', () => {
    test('timeago(date, format)', () => {
      expect(timeago.methods.timeago('0000-00-00 00:00:00', 'YYYY-MM-DD h:m:s')).toEqual('Invalid date')
    })
  })
})
