import makeRestStore from '@freshinup/core-ui/src/store/utils/makeRestStore'

export default ({ items, item }, options = {}) => {
  let store = makeRestStore('dealTypes', { items, item }, {
    itemsPath: () => `/deals/v1/types`
  }, options)

  return {
    namespaced: true,
    ...store
  }
}
