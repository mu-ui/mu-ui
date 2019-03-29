<template>
  <div ref="touch-wrapper" class="mu-touch">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'MuTouch',
  props: {
    threshold: {
      type: Number,
      default: 50
    }, // 滑动生效的最小距离
    restraint: {
      type: Number,
      default: 80
    } // 滑动时另一个方向的最大距离
  },
  data() {
    return {
      startX: 0,
      startY: 0,
      distX: 0,
      distY: 0,
      type: 'none'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.wrapper = this.$refs['touch-wrapper']
      this.bindEvent()
    },
    bindEvent() {
      this.wrapper.addEventListener('touchstart', this.handleTouchStart)
      this.wrapper.addEventListener('touchend', this.handleTouchEnd)
    },
    handleTouchStart(event) {
      event.stopPropagation()
      const startTouchObj = event.touches[0]
      this.startX = startTouchObj.clientX
      this.startY = startTouchObj.clientY
      this.distX = 0
      this.distY = 0
      this.type = 'none'
    },
    handleTouchEnd(event) {
      event.stopPropagation()
      const endTouchObj = event.changedTouches[0]
      this.distX = endTouchObj.clientX - this.startX
      this.distY = endTouchObj.clientY - this.startY
      const absDistX = Math.abs(this.distX)
      const absDistY = Math.abs(this.distY)
      if (absDistX >= this.threshold && absDistY <= this.restraint) {
        this.type = this.distX < 0 ? 'left' : 'right'
        this.$emit('result', this.type)
      } else if (absDistY >= this.threshold && absDistX <= this.restraint) {
        this.type = this.distY < 0 ? 'up' : 'down'
        this.$emit('result', this.type)
      }
    }
  }
}
</script>

<style lang="scss">
.mu-touch {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
