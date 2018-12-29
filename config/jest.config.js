const path = require('path')

module.exports = {
  roots: [path.resolve(__dirname, '../packages')],
  setupFiles: ['@babel/polyfill'],
  moduleFileExtensions: ['js', 'vue'],
  transform: {
    '^.+\\.js$': './babel-jest.config.js',
    '.*\\.(vue)$': 'vue-jest'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  collectCoverage: true,
  collectCoverageFrom: ['packages/**/*.{js,vue}'],
  coverageReporters: ['html', 'lcov', 'text-summary'],
  coverageDirectory: '../test/coverage'
}
