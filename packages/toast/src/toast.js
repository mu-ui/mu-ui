import Vue from 'vue'
import Toast from './toast.vue'

const ToastClass = Vue.extend(Toast)

const toast = (options = {}) => {
  if (
    (typeof options === 'string' && options === '') ||
    (typeof options === 'object' && !options.message)
  ) {
    return
  }

  if (typeof options === 'string') {
    options = {
      message: options
    }
  }

  const instance = new ToastClass({
    propsData: options
  }).$mount()
  document.body.appendChild(instance.$el)

  return instance
}

export default toast
