const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const baseConfig = require('./webpack.base.js')

module.exports = merge(baseConfig('development'), {
  entry: './demos/index.js',
  output: {
    path: path.resolve(__dirname, '../dev'),
    filename: 'bundle.js',
    publicPath: './'
  },
  plugins: [
    new FriendlyErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'demos/index.html'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../demos'),
      assets: path.resolve(__dirname, '../demos/assets')
    }
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../demos'),
    publicPath: '/',
    hot: true,
    clientLogLevel: 'none',
    quiet: true,
    port: 9999,
    open: true,
    disableHostCheck: true,
    proxy: {}
  }
})
