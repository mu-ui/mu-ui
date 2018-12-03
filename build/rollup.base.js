import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import css from 'rollup-plugin-css-only'
import postcss from 'rollup-plugin-postcss'
import postcssImport from 'postcss-import'
import preset from 'postcss-preset-env'
import cssnano from 'cssnano'
// import pxtorem from 'postcss-pxtorem'
import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

const cwd = process.cwd()
const babelCfg = require('../config/babelrc')
const pkg = require(`${cwd}/package.json`)

const exactCSS = process.env.EXACT_CSS || false

// const banner = `/**
// * @name ${pkg.name}
// * @license ${pkg.license}
// * @version ${pkg.version}
// * @description: ${pkg.description}
// * @copyright (c) 2018
// * @author ${pkg.author}
// */`

const postcssCfg = [
  postcssImport(),
  preset({
    browsers: 'last 2 versions'
  }),
  // pxtorem({
  //   rootValue: 75,
  //   unitPrecision: 4,
  //   propList: ['*'],
  //   minPixelValue: 2
  // }),
  cssnano()
]

const baseCfg = {
  input: './index.js',
  external: id => /^@mu-ui\/mu-.+/.test(id) || ['vue'].indexOf(id) > -1,
  plugins: [
    resolve(),
    commonjs(),
    exactCSS &&
      css({
        output: `${cwd}/lib/mu-ui.css`
      }),
    vue({
      css: !exactCSS,
      defaultLang: {
        style: 'scss'
      },
      template: {
        isProduction: true,
        transformAssetUrls: true
      },
      style: {
        postcssPlugins: postcssCfg
      }
    }),
    postcss({
      extensions: ['.css', '.scss'],
      plugins: postcssCfg
    }),
    babel({
      babelrc: false,
      ...babelCfg,
      runtimeHelpers: true,
      // include: ['packages'],
      exclude: ['node_modules'],
      extensions: ['.js', '.vue']
    }),
    terser({
      output: {
        comments: function(node, comment) {
          var text = comment.value
          var type = comment.type
          if (type === 'comment2') {
            // multiline comment
            return /@preserve|@license|@cc_on/i.test(text)
          }
        }
      }
    })
  ]
}

const outputCfg = {
  // banner,
  globals: {
    vue: 'Vue'
  }
}

export { pkg, outputCfg, baseCfg }
