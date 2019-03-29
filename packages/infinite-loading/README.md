## mu-infinite-loading 滚动加载

### 安装方式

```bash
yarn add @mu-ui/mu-infinite-loading
```

### 使用指南

```js
import InfiniteLoading from '@mu-ui/mu-infinite-loading'

Vue.component('InfiniteLoading', InfiniteLoading)

<InfiniteLoading class="infinite-loading-container" @load="loadMore">
  <div v-for="n in amount" :key="n">this is No.{{ n }}</div>
  <div slot="complete">全部加载完啦~~</div>
  <div slot="error">系统出小差~~</div>
  <div slot="empty">暂无数据哦~~</div>
  <div slot="loading">拼命加载中~~</div>
</InfiniteLoading>

...
methods: {
  loadMore($state) {
    if (this.amount === 80) {
      $state.complete()
      // $state.error()
      // $state.empty()
      return
    }
    setTimeout(() => {
      this.amount += 20
      $state.loaded()
    }, 1000)
  }
}
```

### mu-infinite-loading Props

参数|说明|类型|默认值
---|---|---|---
target|默认使用组件时，你需要自己定高度，如果想监听 window 滚动，则 target 指定为 window|String|''
distance|距离目标底部多少距离触发加载|Number|20(px)
debounceTime|去抖时间间隔|Number|50(ms)
preload|是否预加载，即组件挂载后自动触发一次请求|Boolean|true
loadingText|加载提示文案，更灵活可使用 slot(name='loading')|String|'loading...'
completeText|加载提示文案，更灵活可使用 slot(name='complete')|String|'complete~'
errorText|加载提示文案，更灵活可使用 slot(name='error')|String|'error~'
emptyText|加载提示文案，更灵活可使用 slot(name='empty')|String|'empty~'

### mu-infinite-loading Slots

名称|说明
---|---
loading|加载中提示文案
complete|加载完成提示文案
error|加载出错提示文案
empty|加载为空提示文案

### mu-infinite-loading Events

名称|说明
---|---
load|触发加载事件逻辑, 并通过参数$state控制加载情况
