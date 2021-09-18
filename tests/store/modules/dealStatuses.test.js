import dealStatuses from '~/store/modules/dealStatuses'

describe('Deals Store', () => {
  test('the state has items', () => {
    const item = {}
    const items = []
    const result = dealStatuses({ items, item })
    expect(result).toHaveProperty('state')
    expect(result.state).toHaveProperty('items', items)
  })

  test('is a namespaced module', () => {
    let item = {}
    let items = []
    const result = dealStatuses({ items, item })
    expect(result).toHaveProperty('namespaced', true)
  })
})
