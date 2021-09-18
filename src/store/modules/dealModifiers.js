import makeRestStore from '@freshinup/core-ui/src/store/utils/makeRestStore'

export default ({ items, item }, options = {}) => {
  let store = makeRestStore(
    'dealModifiers',
    { items, item },
    {
      itemsPath: () => `/deals/v1/modifiers`
    },
    options
  )

  return {
    namespaced: true,
    ...store
  }
}
