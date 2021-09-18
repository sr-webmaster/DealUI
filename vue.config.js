const path = require('path')
const webpack = require('webpack')
module.exports = {
  chainWebpack: config => {
    config.plugin(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
    config.resolve.alias.set('~', path.resolve(__dirname, 'src'))
    config.resolve.alias.set('sass', path.resolve(__dirname, 'src/sass'))
    config.resolve.alias.set('tests', path.resolve(__dirname, 'tests'))
    config.resolve.alias.set('axios', path.resolve(__dirname, 'node_modules/axios'))
    config.resolve.alias.set('storybook-vue-router', path.resolve(__dirname, 'node_modules/storybook-vue-router'))
    config.resolve.alias.set('@freshinup/core-ui/src', path.resolve(__dirname, 'node_modules/@freshinup/core-ui/src'))
    config.resolve.alias.set('@freshinup/deals-ui', path.resolve(__dirname))
    config.resolve.alias.set('@freshinup/report-ui/src', path.resolve(__dirname, 'node_modules/@freshinup/report-ui/src'))
    config.resolve.symlinks = true
    if (process.env.STORYBOOK && process.env.STORYBOOK.trim() === 'true') {
      // eslint-disable-next-line no-console
      console.info('info => Updating webpack using chain-webpack')
      config.module
        .rule('addon-storysource')
        .enforce()
        .pre()
        .test(/\.stories\.jsx?$/)
        .use('@storybook/source-loader')
        .loader('@storybook/source-loader')
        .options({
          semi: false,
          printWidth: 120,
          singleQuote: true
        })
        .end()
    }
  }
}
