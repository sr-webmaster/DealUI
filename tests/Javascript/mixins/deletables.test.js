import { deletables } from '~/mixins/deletables'

describe('Mixins timeago', () => {
  describe('Methods', () => {
    test('chunk (arr, chunkSize)', () => {
      expect(deletables.methods.chunk([1, 2, 3, 4, 5, 6, 7, 8], '4'))
        .toEqual([[1, 2, 3, 4], [5, 6, 7, 8]])
    })

    test('sleep (ms)', () => {
      let ms = 5
      const promise = new Promise(resolve => setTimeout(resolve, ms))
      expect(deletables.methods.sleep(5)).toEqual(promise)
    })
  })
})
