import makeRestStore from '@freshinup/core-ui/src/store/utils/makeRestStore'

export default ({ items, item }, options = {}) => {
  let store = makeRestStore('dealStatuses', { items, item }, {
    itemsPath: () => `/deals/v1/statuses`
  }, options)

  return {
    namespaced: true,
    ...store
  }
}
