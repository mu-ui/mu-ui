import Vue from 'vue'
import Loading from '@mu/mu-loading'
import IndicatorTemplate from './indicator.vue'

Vue.use(Loading)

const IndicatorClass = Vue.extend(IndicatorTemplate)

const getInstance = () => {
  return new IndicatorClass().$mount(document.createElement('div'))
}

// 存储实例对象
let instance = null

export default {
  show(options = {}) {
    if (!instance) {
      instance = getInstance()
    }
    if (instance.show) return
    instance.tip =
      typeof options === 'string' ? options : options.tip || '加载中...'
    instance.type = options.type || 'rolling'
    instance.color = options.color || '#fff'
    instance.bgColor = options.bgColor || ''
    instance.maskColor = options.maskColor || ''

    if (!instance.isMounted) {
      document.body.appendChild(instance.$el)
      Vue.nextTick(() => {
        instance.isMounted = true
        instance.show = true
      })
    } else {
      instance.show = true
    }
  },
  hide() {
    !!instance && (instance.show = false)
  }
}
