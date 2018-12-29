module.exports = {
  root: true,
  extends: [
    'standard',
    'plugin:prettier/recommended',
    'plugin:vue/recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  env: {
    node: true,
    browser: true,
    es6: true,
    'jest/globals': true
  },
  globals: {
    Vue: true,
    Vuex: true,
    VueRouter: true
  },
  plugins: ['vue', 'prettier', 'jest'],
  rules: {
    'prettier/prettier': 'error',
    'vue/html-self-closing': 0,
    'vue/html-closing-bracket-newline': 0,
    'vue/attribute-hyphenation': 0,
    'vue/max-attributes-per-line': 0
  }
}
