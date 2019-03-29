<template>
  <div class="scroll">
    <scroll
      :pullRefresh="true"
      :infiniteLoading="false"
      :scrollBar="true"
      :scrollBarOffset="0"
      @pull-refresh="load"
      @pull-state="state"
      @infinite-loading="load2">
      <p v-for="n in count" :key="n">我是第{{ n }}个lilili</p>
    </scroll>
  </div>
</template>

<script>
import scroll from '../../../packages/scroll/index'

export default {
  components: {
    scroll
  },
  data() {
    return {
      count: 20
    }
  },
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
}
</script>

<style lang="scss">
.scroll {
  width: 100%;
  height: 400px;
  padding: 0 !important;
  background: lightblue;
  p {
    line-height: 30px;
    height: 30px;
    font-size: 12px;
  }
}
</style>
