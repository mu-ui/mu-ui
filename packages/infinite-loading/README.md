## mu-infinite-loading

### Installation

```bash
yarn add @mu-ui/mu-infinite-loading
```

### Usage

```js
import InfiniteLoading from '@mu-ui/mu-infinite-loading'

Vue.component('infinite-loading', InfiniteLoading)

<infinite-loading class="infinite-loading-container" @load="loadMore">
  <div v-for="n in amount" :key="n">this is No.{{ n }}</div>
  <div slot="complete">全部加载完啦~~</div>
  <div slot="error">系统出小差~~</div>
  <div slot="empty">暂无数据哦~~</div>
  <div slot="loading">拼命加载中~~</div>
</infinite-loading>

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
    }, 2000)
  }
}
```

### Options

#### target

Type: String
Default: ''

By default, the target is the mounted element that you should set value for it's height. if you want to listen scroll event for window, that you should set 'window' to the target option.

#### distance

Type: Number
Default: 20(px)

distance from the bottom

#### debounceTime

Type: Number
Default: 50(ms)

debounce time

#### preload

Type: Boolean
Default: true

emit the custom load event when mounted

#### loadingText

Type: String
Default: 'loading...'

loading tip text, or you can use slot(name='loading')

#### completeText

Type: String
Default: 'complete~'

complete tip text, or you can use slot(name='complete')

#### errorText

Type: String
Default: 'error...'

error tip text, or you can use slot(name='error')

#### emptyText

Type: String
Default: 'empty...'

empty tip text, or you can use slot(name='empty')
