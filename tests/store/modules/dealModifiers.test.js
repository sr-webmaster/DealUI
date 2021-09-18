import dealModifiers from '~/store/modules/dealModifiers'

describe('Deal Modifiers', () => {
  test('the state has items', () => {
    const item = {}
    const items = []
    const result = dealModifiers({ items, item })
    expect(result).toHaveProperty('state')
    expect(result.state).toHaveProperty('items', items)
  })

  test('is a namespaced module', () => {
    let item = {}
    let items = []
    const result = dealModifiers({ items, item })
    expect(result).toHaveProperty('namespaced', true)
  })
})
