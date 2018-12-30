<template>
  <div class="infinite-loading">
    <infinite-loading class="infinite-loading-container" loading-text="拼命加载中..." @load="loadMore">
      <div v-for="n in amount" :key="n">this is No.{{ n }}</div>
      <div slot="complete">全部加载完啦~~</div>
    </infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from '../../../packages/infinite-loading'
// import InfiniteLoading from '@mu-ui/mu-infinite-loading'

export default {
  components: {
    InfiniteLoading
  },
  data() {
    return {
      amount: 0,
      pos: 'center'
    }
  },
  methods: {
    loadMore($state) {
      if (this.amount === 80) {
        $state.complete()
        return
      }
      setTimeout(() => {
        this.amount += 20
        $state.loaded()
      }, 2000)
    }
  }
}
</script>

<style lang="scss">
.infinite-loading {
  &-container {
    height: 400px;
  }
}
</style>
