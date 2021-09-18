import { name, version } from '../package.json'
import deals from './store/modules/deals'
import dealStatuses from './store/modules/dealStatuses'
import dealTypes from './store/modules/dealTypes'
import dealModifiers from './store/modules/dealModifiers'
import savedReports from './store/modules/savedReports'
import page from '@freshinup/core-ui/src/store/modules/page'

const pages = require.context('./pages', true, /\.vue$/)

export default () => {
  return {
    name,
    pages,
    // layouts
    store: {
      deals,
      dealStatuses,
      dealTypes,
      dealModifiers,
      savedReports,
      page
    },
    version
  }
}
