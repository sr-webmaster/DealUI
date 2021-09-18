import dealTypes from '~/store/modules/dealTypes'

describe('Deals Store', () => {
  test('the state has items', () => {
    const item = {}
    const items = []
    const result = dealTypes({ items, item })
    expect(result).toHaveProperty('state')
    expect(result.state).toHaveProperty('items', items)
  })

  test('is a namespaced module', () => {
    let item = {}
    let items = []
    const result = dealTypes({ items, item })
    expect(result).toHaveProperty('namespaced', true)
  })
})
