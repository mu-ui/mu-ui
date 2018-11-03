const path = require('path')
const merge = require('webpack-merge')

const cwd = process.cwd()
const baseConfig = require('./webpack.base.js')

module.exports = merge(baseConfig('production'), {
  entry: './index.js',
  output: {
    path: path.resolve(cwd, 'lib'),
    filename: 'index.min.js',
    libraryTarget: 'umd'
  }
})
