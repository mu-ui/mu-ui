import Vue from 'vue'
import Dialog from './dialog.vue'

const DialogClass = Vue.extend(Dialog)

let instance = null

const dialog = (options = {}) => {
  const { confirm, cancel, ...props } = options
  if (!instance) {
    instance = new DialogClass({
      propsData: props
    }).$mount()
  }
  if (instance.show) return
  if (confirm && typeof confirm === 'function') {
    instance.$once('confirm', confirm)
  }
  if (cancel && typeof cancel === 'function') {
    instance.$once('cancel', cancel)
  }
  instance.$watch('show', val => {
    if (val === false) {
      instance.$destroy()
      const parent = instance.$el.parentNode
      if (parent) {
        parent.removeChild(instance.$el)
      }
      instance = null
    }
  })
  document.body.appendChild(instance.$el)
  Vue.nextTick(() => {
    instance.isMounted = true
    instance.show = true
  })
}

export default dialog
