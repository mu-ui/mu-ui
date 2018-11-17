import Vue from 'vue'
import Router from 'vue-router'
import Storage from '@/views/components/storage.vue'

Vue.use(Router)

const routes = [
  {
    path: '/storage',
    component: Storage
  }
]

export default new Router({
  routes
})
