import Vue from 'vue'
import Router from 'vue-router'
import Storage from '@/views/components/storage.vue'
import Qrcode from '@/views/components/qrcode.vue'
import Toast from '@/views/components/toast.vue'
import Flex from '@/views/components/flex.vue'
import Popup from '@/views/components/popup.vue'
import Loading from '@/views/components/loading.vue'
import Indicator from '@/views/components/indicator.vue'
import Dialog from '@/views/components/dialog.vue'
import Sudoku from '@/views/components/sudoku.vue'
import Rotary from '@/views/components/rotary.vue'
import Scroll from '@/views/components/scroll.vue'

Vue.use(Router)

const routes = [
  {
    path: '/storage',
    component: Storage
  },
  {
    path: '/qrcode',
    component: Qrcode
  },
  {
    path: '/toast',
    component: Toast
  },
  {
    path: '/flex',
    component: Flex
  },
  {
    path: '/popup',
    component: Popup
  },
  {
    path: '/loading',
    component: Loading
  },
  {
    path: '/indicator',
    component: Indicator
  },
  {
    path: '/dialog',
    component: Dialog
  },
  {
    path: '/sudoku',
    component: Sudoku
  },
  {
    path: '/rotary',
    component: Rotary
  },
  {
    path: '/scroll',
    component: Scroll
  }
]

export default new Router({
  routes
})
