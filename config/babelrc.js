module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          android: '4.4',
          ios: '9'
        }
      }
    ]
  ],
  plugins: ['@babel/plugin-transform-runtime']
}
