module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      browsers: 'last 2 versions'
    },
    cssnano: {},
    'postcss-pxtorem': {
      rootValue: 75,
      unitPrecision: 4,
      propList: ['*'],
      minPixelValue: 2
    }
  }
}
