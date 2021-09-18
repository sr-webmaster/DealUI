import deals, { _getItemPath } from '~/store/modules/deals'

describe('Deals Store', () => {
  test('the state has items', () => {
    const item = {}
    const items = []
    const result = deals({ items, item })
    expect(result).toHaveProperty('state')
    expect(result.state).toHaveProperty('items', items)
  })

  test('the state has item', () => {
    const item = {}
    const items = []
    const result = deals({ items, item })
    expect(result).toHaveProperty('state')
    expect(result.state).toHaveProperty('item', item)
  })

  test('is a namespaced module', () => {
    let item = {}
    let items = []
    const result = deals({ items, item })
    expect(result).toHaveProperty('namespaced', true)
  })

  test('item url', () => {
    expect(_getItemPath({ id: 1 })).toEqual('/deals/v1/deals/1')
    expect(_getItemPath({ id: 3 })).toEqual('/deals/v1/deals/3')
  })
})
