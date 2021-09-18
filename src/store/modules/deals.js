import makeRestStore from '@freshinup/core-ui/src/store/utils/makeRestStore'

export const _getItemPath = ({ id }) => `/deals/v1/deals/${id}`

export default ({ items, item }, options = {}) => {
  let store = makeRestStore('deals', { items, item }, {
    itemsPath: () => `/deals/v1/deals`,
    itemPath: _getItemPath
  }, options)

  return {
    namespaced: true,
    ...store
  }
}
