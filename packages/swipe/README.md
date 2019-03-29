## mu-swipe 轮播

### 安装方式

```bash
yarn add @mu-ui/mu-swipe
```

### 使用指南

```js
import { Swipe, SwipeItem } from '@mu-ui/mu-swipe'

Vue.component('Swipe', Swipe)
Vue.component('SwipeItem', SwipeItem)

<Swipe :loop="false" @change="change">
  <SwipeItem v-for="n in list" :key="n" :style="{'background-color': n}">
    第一屏{{ n }}
  </SwipeItem>
  <div slot="indicator">
    {{ current + 1 }} / {{ list.length }}
  </div>
</Swipe>

export default {
  data() {
    return {
      list: ['red', 'blue', 'green'],
      current: 0
    }
  },
  methods: {
    change(index) {
      this.current = index
    }
  }
}
```

### mu-swipe Props

参数|说明|类型|默认值
---|---|---|---
loop|循环播放|Boolean|true
showIndicator|是否展示指示器|Boolean|true
indicatorColor|指示器选中颜色|String|#fff
duration|滑动过渡时间|Number|500
autoplay|自动播放时间间隔|Number|3000

### mu-swipe Slots

名称|说明
---|---
indicator|自定义指示器

### mu-swipe Events

名称|说明
---|---
change|返回当前页码下标
