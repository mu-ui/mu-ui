import '@/css/index.scss'
import Vue from 'vue'
import router from './router'
import App from './views/app.vue'
import Storage from '../packages/storage/index'

Vue.use(Storage)

new Vue({ // eslint-disable-line
  el: '#app',
  router,
  render: h => h(App)
})
