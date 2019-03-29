<template>
  <div class="touch">
    <touch @result="result">
      <p v-for="n in count" :key="n">我是第{{ n }}个lilili</p>
    </touch>
  </div>
</template>

<script>
import touch from '../../../packages/touch/index'

export default {
  components: {
    touch
  },
  data() {
    return {
      count: 20
    }
  },
  methods: {
    result(res) {
      console.log(res)
    }
  }
}
</script>

<style lang="scss">
.touch {
  width: 100%;
  padding: 0 !important;
  p {
    line-height: 30px;
    height: 30px;
    font-size: 12px;
  }
}
</style>
