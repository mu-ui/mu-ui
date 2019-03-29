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
import InfiniteLoading from '@/views/components/infinite-loading.vue'
import Sudoku from '@/views/components/sudoku.vue'
import Rotary from '@/views/components/rotary.vue'
import Clipboard from '@/views/components/clipboard.vue'
import Scroll from '@/views/components/scroll.vue'
import NoticeBar from '@/views/components/notice-bar.vue'
import Collapse from '@/views/components/collapse.vue'
import Swipe from '@/views/components/swipe.vue'
import Touch from '@/views/components/touch.vue'

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
    path: '/infinite-loading',
    component: InfiniteLoading
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
    path: '/clipboard',
    component: Clipboard
  },
  {
    path: '/scroll',
    component: Scroll
  },
  {
    path: '/notice-bar',
    component: NoticeBar
  },
  {
    path: '/collapse',
    component: Collapse
  },
  {
    path: '/swipe',
    component: Swipe
  },
  {
    path: '/touch',
    component: Touch
  }
]

export default new Router({
  routes
})
