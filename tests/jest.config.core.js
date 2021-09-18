/**
 * Backwards compatibility
 */
const jestCoreConfig = require('vue-cli-plugin-freshinup-ui/utils/testing/jest.config.core')
console.warn('DEPRECATION NOTICE: Please run `vue invoke freshinup` this will make ' +
  'you use vue-cli-plugin-freshinup version of jest.config.core.')
module.exports = jestCoreConfig
