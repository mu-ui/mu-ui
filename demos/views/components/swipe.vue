<template>
  <div class="swipe">
    <Swipe :loop="false" @change="change">
      <SwipeItem v-for="(n, index) in list" :key="n" :style="{'background-color': n}">
        第{{ index + 1 }}屏{{ n }}
      </SwipeItem>
      <div slot="indicator">
        {{ current + 1 }} / {{ list.length }}
      </div>
    </Swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from '../../../packages/swipe/index'

export default {
  components: {
    Swipe,
    SwipeItem
  },
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
</script>


<style lang="scss">
.swipe {
  width: 100%;
  height: 120px;
  padding-top: 0 !important;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
