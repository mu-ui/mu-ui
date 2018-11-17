import Toast from './src/toast.js'

const install = Vue => {
  Vue.toast = Vue.prototype.$toast = Toast
}

export default install
