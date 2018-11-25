import Dialog from './src/dialog.js'
import DialogComponent from './src/dialog.vue'

const install = Vue => {
  Vue.dialog = Vue.prototype.$dialog = Dialog
}

export default {
  install,
  Dialog: DialogComponent
}
