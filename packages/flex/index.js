import Flex from './src/flex.vue'
import FlexItem from './src/flex-item.vue'

const install = Vue => {
  Vue.component('mu-flex', Flex)
  Vue.component('mu-flex-item', FlexItem)
}

export default install
