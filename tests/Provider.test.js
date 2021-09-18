import Provider from '../src/Provider'
import { version, name } from '../package.json'
import isFunction from 'lodash/isFunction'

describe('Provider', () => {
  test('has version from package.json', () => {
    expect(Provider()).toHaveProperty('version', version)
  })
  test('has name from package.json', () => {
    expect(Provider()).toHaveProperty('name', name)
  })
  test('has pages context', () => {
    expect(Provider()).toHaveProperty('pages')
    expect(isFunction(Provider().pages)).toEqual(true)
  })
  test('has store', () => {
    const result = Provider()
    expect(result).toHaveProperty('store')
  })
  test('has store module example', () => {
    const result = Provider()
    expect(result.store).toHaveProperty('deals')
    const expectedStoreModules = [
      'deals',
      'dealTypes',
      'dealStatuses'
    ]
    expectedStoreModules.forEach((value) => {
      expect(result.store).toHaveProperty(value)
      expect(isFunction(result.store[value])).toEqual(true)
    })
  })
})
