module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage'
      }
    ]
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 2
      }
    ]
  ]
}
