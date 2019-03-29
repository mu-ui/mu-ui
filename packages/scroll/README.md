## mu-scroll 局部滚动

### 安装方式

```bash
yarn add @mu-ui/mu-scroll
```

### 使用指南

```js
import Scroll from '@mu-ui/mu-scroll'

Vue.component('Scroll', Scroll)

<Scroll
  :pullRefresh="true"
  :infiniteLoading="false"
  :scrollBar="true"
  :scrollBarOffset="0"
  @pull-refresh="load"
  @pull-state="state"
  @infinite-loading="load2">
  <p v-for="n in count" :key="n">我是第{{ n }}个段落</p>
</Scroll>

...
methods: {
  load($result) {
    setTimeout(() => {
      this.count += 20
      $result.finish()
    }, 3000)
  },
  load2($result) {
    setTimeout(() => {
      this.count += 20
      $result.loaded()
    }, 3000)
  },
  state(state) {
    console.log(state)
  }
}
```

### mu-scroll Props

参数|说明|类型|默认值
---|---|---|---
pullRefresh|是否可下拉刷新|Boolean|false
infiniteLoading|是否可滚动加载|Boolean|false
scrollBar|是否要滚动条|Boolean|false
scrollBarOffset|滚动条偏移量|Number|0
scrollBarColor|滚动条颜色|String|#aaa
scrollBarBgColor|滚动条背景颜色|String|transparent
pullStep|下拉时缓动比例|Number|4
bounceTime|过渡时间|Number|800

### mu-scroll Slots

名称|说明
---|---
pulldown|自定义下拉展示内容
infinite|自定义滚动加载展示内容

### mu-scroll Events

名称|说明
---|---
pull-refresh|触发下拉加载
pull-state|下拉时，各阶段反馈
infinite-loading|触发滚动加载
