import makeRestStore from '@freshinup/core-ui/src/store/utils/makeRestStore'

export const _getItemPath = ({ id }) => `/deals/v1/saved-reports/${id}`

export default ({ items, item }, options = {}) => {
  let store = makeRestStore('savedReports', { items, item }, {
    itemsPath: () => `/deals/v1/saved-reports`,
    itemPath: _getItemPath
  }, options)

  return {
    namespaced: true,
    ...store
  }
}
