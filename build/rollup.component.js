import { outputCfg, baseCfg } from './rollup.base'

/**
 * 单独组件专用
 */
export default [
  {
    output: {
      file: `lib/index.common.js`,
      format: 'cjs',
      ...outputCfg
    },
    ...baseCfg
  },
  {
    output: {
      file: `lib/index.esm.js`,
      format: 'es',
      ...outputCfg
    },
    ...baseCfg
  }
]
