import Indicator from './src/indicator.js'

const install = Vue => {
  Vue.indicator = Vue.prototype.$indicator = Indicator
}

export default install
