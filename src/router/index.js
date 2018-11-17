import Vue from 'vue'
import Router from 'vue-router'
import Storage from '@/views/components/storage.vue'
import Qrcode from '@/views/components/qrcode.vue'

Vue.use(Router)

const routes = [
  {
    path: '/storage',
    component: Storage
  },
  {
    path: '/qrcode',
    component: Qrcode
  }
]

export default new Router({
  routes
})
