<template>
  <div class="loading">
    <loading>
      default type: ring
    </loading>
    <loading class="dual-ring-wrap" type="dual-ring">
      another type: dual-ring
    </loading>
    <loading class="dual-ring-wrap" type="dual-ring" color="#fd0">
      custom color: #fd0
    </loading>
    <loading class="dual-ring-wrap" type="dual-ring" :size="40">
      custom size: 40
    </loading>
    <loading class="dual-ring-wrap" type="dual-ring" :width="6" :size="40">
      custom width: 6
    </loading>
    <loading class="dual-ring-wrap" type="dual-ring" :width="6" :size="40">
      <div slot="icon" class="loading-dot"></div>
      custom icon
    </loading>
  </div>
</template>

<script>
import loading from '../../../packages/loading/index'

export default {
  components: {
    loading
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss">
@keyframes scale {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.3);
  }
}
.dual-ring-wrap {
  margin-top: 20px;
}
.loading-dot {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #272639;
  animation: scale 2s ease-in-out infinite;
}
</style>
