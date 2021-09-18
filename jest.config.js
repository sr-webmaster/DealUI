const JestConfig = require('vue-cli-plugin-freshinup-ui/utils/testing/jest.config.core')

module.exports = {
  ...JestConfig,
  collectCoverageFrom: JestConfig.collectCoverageFrom.concat([
    'src/**/*.{js,vue}'
  ]),
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90
    },
    'src/pages/admin/opportunity-reports/index.vue': {
      branches: 74
    },
    'src/pages/admin/sales-opportunities/_id/index.vue': {
      branches: 0,
      function: 0
    }
  },
  moduleNameMapper: {
    '@freshinup/deals-ui/src/(.*)$': '<rootDir>/src/$1',
    '@freshinup/deals-ui/tests/(.*)$': '<rootDir>/tests/$1',
    ...JestConfig.moduleNameMapper,
    '@/(.*)$': '<rootDir>/$1',
    '@freshinup/core-ui/src/(.*)$': '<rootDir>/node_modules/@freshinup/core-ui/src/$1'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@storybook/.*\\.vue$|vue-cli-plugin-freshinup-ui/.*\\.js$|@freshinup/.*\\.vue$|@freshinup/.*\\.js$|@amcharts/.*\\.js$))'
  ]
}
