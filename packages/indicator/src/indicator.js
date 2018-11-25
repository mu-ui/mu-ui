import Vue from 'vue'
import Loading from '@mu-ui/mu-loading'
import Indicator from './indicator.vue'

Vue.component('mu-loading', Loading)
const IndicatorClass = Vue.extend(Indicator)

let instance = null

export default {
  show(options = {}) {
    if (typeof options === 'string') {
      options = {
        tip: options
      }
    }
    if (!instance) {
      instance = new IndicatorClass({
        propsData: options
      }).$mount()
    } else if (instance.show) {
      return
    }
    document.body.appendChild(instance.$el)
  },
  hide() {
    instance.show = false
    instance.$destroy()
    if (instance.$el.parentNode) {
      instance.$el.parentNode.removeChild(instance.$el)
    }
    instance = null
  }
}
