import Vue from 'vue'
import DialogTemplate from './dialog.vue'

const DialogClass = Vue.extend(DialogTemplate)

const getInstance = () => {
  return new DialogClass().$mount(document.createElement('div'))
}

// 存储实例对象
let instance = null

const dialog = (options = {}) => {
  if (!instance) {
    instance = getInstance()
  }
  if (instance.show) return
  instance.title = options.title || 'Tip'
  instance.message = options.message || 'Are you sure?'
  instance.single = options.single || false
  instance.pre = options.pre || false
  instance.opacity = options.opacity || 0.1
  instance.btns = options.btns || []
  if (options.sure && typeof options.sure === 'function') {
    instance.$once('sure', options.sure)
  }
  if (options.cancel && typeof options.cancel === 'function') {
    instance.$once('cancel', options.cancel)
  }
  if (!instance.isMounted) {
    document.body.appendChild(instance.$el)
    Vue.nextTick(() => {
      instance.isMounted = true
      instance.show = true
    })
  } else {
    instance.show = true
  }
}
export default dialog
