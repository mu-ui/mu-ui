<template>
  <div class="mu-rotary">
    <div ref="mu-rotary-canvas" class="mu-rotary-canvas-wrapper" :style="{'transform': `rotate(${rotate}deg)`, 'transition-duration': `${duration}s`}">
      <slot name="mu-rotary-canvas"></slot>
    </div>
    <div class="mu-rotary-click-handler" @click="rotaryHandler">
      <slot name="mu-rotary-handler"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MuRotary',
  props: {
    turnsCount: {
      type: Number,
      default: 3,
      validate(val) {
        return val > 0
      }
    },
    duration: {
      type: Number,
      default: 6,
      validate(val) {
        return val > 1
      }
    },
    number: {
      type: Number,
      default: 8,
      validate(val) {
        return val > 1
      }
    }
  },
  data() {
    return {
      rotate: 0,
      free: true,
      prev: 0,
      cur: 0,
      deg: 0,
      preDeg: 0
    }
  },
  mounted() {
    this.deg = 360 / this.number
    this.preDeg = this.turnsCount * 360
    this.resultHandler = {
      set: num => {
        this.$emit('$rotaryResult:set', num)
      },
      free: () => {
        this.$emit('$rotaryResult:free')
      }
    }
    this.$on('$rotaryResult:set', num => {
      if (typeof num === 'number' && num >= 0) {
        this.set(num)
      }
    })
    this.$on('$rotaryResult:free', () => {
      this.free = true
    })
    this.$refs['mu-rotary-canvas'].addEventListener('transitionend', () => {
      this.free = true
      this.prev = this.cur
      this.$emit('finish')
    })
  },
  methods: {
    set(num) {
      this.cur = num
      let restDeg = 0
      if (num < this.prev) {
        restDeg = (this.prev - num) * this.deg
      } else {
        restDeg = (this.number + this.prev - num) * this.deg
      }
      this.rotate += this.preDeg + restDeg
    },
    rotaryHandler() {
      if (this.free) {
        this.free = false
        this.$emit('handle', this.resultHandler)
      }
    }
  }
}
</script>

<style lang="scss">
.mu-rotary {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  &-canvas-wrapper {
    width: 100%;
    height: 100%;
    transform-origin: center center;
    transition: transform cubic-bezier(0.2, 0, 0, 1);
  }
  &-click-handler {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
}
</style>
