<template>
  <div ref="swipe-wrapper" class="mu-swipe">
    <div ref="swipe-container" class="mu-swipe-list" :style="{
      'width': `${width}px`,
      'transition-duration': `${dur}ms`,
      'transform': `translate(${diff}px, 0px)`
    }">
      <slot />
    </div>
    <div v-if="showIndicator" class="mu-swipe-indicator">
      <slot name="indicator">
        <div class="mu-swipe-indicator-list">
          <span v-for="n in $children.length" :key="n - 1" class="mu-swipe-indicator-item" :style="{
            'background-color': index === n - 1 ? indicatorColor : 'rgba(255, 255, 255, 0.5)'
          }"></span>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MuSwipe',
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    preventMove: {
      type: Boolean,
      default: true
    },
    showIndicator: {
      type: Boolean,
      default: true
    },
    indicatorColor: {
      type: String,
      default: '#fff'
    },
    duration: {
      type: Number,
      default: 500
    },
    changeIndex: {
      type: Number,
      default: 0
    },
    autoplay: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      width: 0,
      startX: 0,
      startY: 0,
      offsetX: 0,
      offsetY: 0,
      distance: 0,
      dur: 0,
      diff: 0,
      lastDiff: 0,
      cur: 0,
      index: 0,
      childLen: 0,
      leftBorder: 0,
      rightBorder: 0,
      lock: false,
      timer: null
    }
  },
  computed: {
    isNeedAutoPlay() {
      return this.autoplay > 0
    },
    isNeedLoop() {
      return this.autoplay > 0 || this.loop
    }
  },
  watch: {
    changeIndex(val) {
      if (val !== this.cur) {
        this.cur = val
        this.dur = this.duration
        this.diff = -this.wrapWidth * this.cur
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.wrapper = this.$refs['swipe-wrapper']
      this.container = this.$refs['swipe-container']
      this.wrapWidth = this.wrapper.clientWidth
      this.childLen = this.$children.length
      // 是否循环轮播
      if (this.isNeedLoop && this.childLen > 1) {
        const firstChild = this.$children[0].$el.cloneNode(true)
        const lastChild = this.$children[this.childLen - 1].$el.cloneNode(true)
        this.container.appendChild(firstChild)
        this.container.insertBefore(lastChild, this.$children[0].$el)
        this.childLen += 2
        this.cur = 1
        this.diff = -this.wrapWidth
      }
      this.width = this.childLen * this.wrapWidth
      this.bindEvent()
      if (this.isNeedAutoPlay) {
        this.autoSwipe()
      }
    },
    bindEvent() {
      this.wrapper.addEventListener('touchstart', this.handleTouchStart)
      this.wrapper.addEventListener('touchmove', this.handleTouchMove)
      this.wrapper.addEventListener('touchend', this.handleTouchEnd)
      this.container.addEventListener('transitionend', () => {
        this.dur = 0
        if (this.isNeedLoop) {
          if (this.cur === 0) {
            this.cur = this.childLen - 2
            this.diff = -this.wrapWidth * this.cur
          } else if (this.cur === this.childLen - 1) {
            this.cur = 1
            this.diff = -this.wrapWidth
          }
        }
        this.index = this.isNeedLoop ? this.cur - 1 : this.cur
        this.$emit('change', this.index)
        this.lastDiff = this.diff
        this.lock = false
        if (this.isNeedAutoPlay) {
          this.autoSwipe()
        }
      })
    },
    handleTouchStart(event) {
      if (this.lock) {
        return
      }
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.startX = event.touches[0].clientX
      this.startY = event.touches[0].clientY
      this.lastDiff = this.diff
      this.leftBorder = this.cur <= 0 ? 0 : -this.wrapWidth * (this.cur - 1)
      this.rightBorder =
        this.cur >= this.childLen - 1
          ? -this.wrapWidth * (this.childLen - 1)
          : -this.wrapWidth * (this.cur + 1)
    },
    handleTouchMove(event) {
      this.preventMove && event.preventDefault()
      event.stopPropagation()
      if (this.lock) {
        return
      }
      this.offsetX = event.touches[0].clientX - this.startX
      this.offsetY = event.touches[0].clientY - this.startY
      // 必须在滑动范围内
      this.distance = this.offsetX + this.lastDiff
      if (this.offsetX > 0 && this.distance >= this.leftBorder) {
        this.distance = this.leftBorder
      } else if (this.offsetX < 0 && this.distance <= this.rightBorder) {
        this.distance = this.rightBorder
      }
      if (Math.abs(this.offsetX) / Math.abs(this.offsetY) > 3) {
        this.diff = this.distance
      }
    },
    handleTouchEnd(event) {
      if (
        this.lock ||
        this.distance === this.leftBorder ||
        this.distance === this.rightBorder ||
        Math.abs(this.offsetX) / Math.abs(this.offsetY) <= 3
      ) {
        return
      }
      this.lock = true
      this.distance = event.changedTouches[0].clientX - this.startX
      // 分配
      if (Math.abs(this.distance) > 50) {
        if (this.distance > 0) {
          this.handleSwipe('prev')
        } else {
          this.handleSwipe('next')
        }
      } else {
        this.handleSwipe('back', 100)
      }
    },
    handleSwipe(type, time) {
      this.dur = time || this.duration
      if (type !== 'back') {
        if (type === 'prev') {
          this.cur--
        } else {
          this.cur++
        }
      }
      this.diff = -this.wrapWidth * this.cur
    },
    autoSwipe() {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.handleSwipe('next')
      }, this.autoplay)
    }
  }
}
</script>

<style lang="scss">
.mu-swipe {
  position: relative;
  width: 100%;
  height: 100%;
  user-select: none;
  overflow-x: hidden;
  &-list {
    display: flex;
    height: 100%;
  }
  &-indicator {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    &-list {
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
    }
    &-item {
      display: inline-block;
      width: 6px;
      height: 6px;
      margin: 0 3px;
      border-radius: 50%;
    }
  }
}
</style>
