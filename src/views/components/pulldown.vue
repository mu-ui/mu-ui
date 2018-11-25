<template>
  <div class="page">
    <div ref="wrapper" class="mu-pulldown">
      <div ref="refresh" class="mu-pulldown-loading" :style="{
        'transition-timing-function': 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        'transition-duration': `${duration}ms`,
        'transform': `translate3d(-50%, ${diff}px, 0) scale(1)`
      }">我~</div>
      <ul ref="scroll" class="mu-pulldown-container">
        <li v-for="n in 30" :key="n">我是第{{ n }}个lilili</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      back: false,
      wrapper: null,
      diff: 0,
      lastDiff: 0,
      duration: 0,
      dirDistance: 0,
      refreshHeight: 0,
      startY: 0,
      curY: 0,
      maxY: 0,
      distanceStep: 2,
      maxThreshold: 40,
      defaultBounceDuration: 800
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.wrapper = this.$refs.wrapper
      this.refreshHeight = this.$refs.refresh.offsetHeight + 5
      this.diff = -this.refreshHeight
      this.bindEvents()
    },
    bindEvents() {
      this.wrapper.addEventListener('touchstart', this.handleTouchStart)
      this.wrapper.addEventListener('touchmove', this.handleTouchMove)
      this.wrapper.addEventListener('touchend', this.handleTouchEnd)
      this.$refs.refresh.addEventListener('transitionend', () => {
        this.duration = 0
        if (this.back) {
          this.timer = setTimeout(() => {
            this.back = false
            clearTimeout(this.timer)
          }, 1000)
        }
      })
    },
    handleTouchStart(event) {
      this.startY = event.touches[0].pageY
      this.lastDiff = this.diff
    },
    handleTouchMove() {
      event.stopPropagation()
      const scrollTop = this.wrapper.scrollTop
      if (scrollTop === 0) {
        this.curY = event.touches[0].pageY
        this.dirDistance = this.curY - this.startY
        if (this.dirDistance > 0 && !this.back) {
          const realPullScrollDis = this.dirDistance / this.distanceStep
          if (this.diff < this.maxThreshold || this.curY < this.maxY) {
            this.diff = realPullScrollDis + this.lastDiff
          } else if (this.maxY === 0) {
            this.maxY = this.curY
          }
        }
      } else if (scrollTop > 10) {
        if (this.diff === this.maxThreshold && !this.back) {
          this.back = true
          this.scrollTo(-this.refreshHeight)
          this.lastDiff = this.diff
        }
      }
    },
    handleTouchEnd() {
      this.maxY = 0
      this.scrollTo(
        this.diff < this.maxThreshold ? -this.refreshHeight : this.maxThreshold
      )
    },
    scrollTo(dis, time) {
      this.duration = time || this.defaultBounceDuration
      this.diff = dis
    }
  }
}
</script>

<style lang="scss">
.page {
  .mu-pulldown {
    position: relative;
    top: 20px;
    width: 100%;
    height: 400px;
    border: 1px solid #eee;
    overflow-y: scroll;
    .mu-pulldown-container {
      display: flex;
      flex-direction: column;
      li {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid lightgreen;
      }
    }
    .mu-pulldown-loading {
      position: absolute;
      top: 0;
      left: 50%;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      line-height: 50px;
      font-size: 16px;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.6);
    }
  }
}
</style>
