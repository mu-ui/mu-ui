import Dialog from './src/dialog.js'
import DialogComponent from './src/dialog.vue'

const install = Vue => {
  Vue.dialog = Vue.prototype.$dialog = Dialog
  Vue.component('mu-dialog', DialogComponent)
}

export default install
