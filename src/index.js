import '@/css/index.scss'
import Vue from 'vue'
import router from './router'
import App from './views/app.vue'
import Storage from '../packages/storage/index'
import Toast from '../packages/toast/index'

Vue.use(Storage)
Vue.use(Toast)

new Vue({ // eslint-disable-line
  el: '#app',
  router,
  render: h => h(App)
})
