import Vue from 'vue'
import ToastTemplate from './toast.vue'

const ToastClass = Vue.extend(ToastTemplate)

ToastClass.prototype.close = function() {
  this.show = false
  this.$el.addEventListener('animationend', removeDom)
}

const removeDom = e => {
  if (e.target.parentNode) {
    e.target.parentNode.removeChild(e.target)
  }
}

const getInstance = () => {
  return new ToastClass().$mount(document.createElement('div'))
}

const toast = (options = {}) => {
  if (
    (typeof options === 'string' && options === '') ||
    (typeof options === 'object' && !options.message)
  ) {
    return
  }

  let instance = getInstance()
  const duration = options.duration || 3000
  instance.message = typeof options === 'string' ? options : options.message
  instance.position = options.position || 'middle'
  instance.customClass = options.customClass || ''
  instance.color = options.color || ''
  instance.bgColor = options.bgColor || ''

  document.body.appendChild(instance.$el)
  Vue.nextTick(() => {
    instance.show = true
    instance.timer = setTimeout(() => {
      instance.close()
    }, duration)
  })

  return instance
}

const install = Vue => {
  Vue.toast = Vue.prototype.$toast = toast
}

export default install
