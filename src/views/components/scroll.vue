<template>
  <div class="page">
    <div ref="wrapper" class="vue-scroll">
      <div ref="pulldown" class="top" :style="{
        'transition-timing-function': 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        'transition-duration': `${pullDuration}ms`,
        'transform': `translate(0px, ${pullDownDiff}px) scale(1) translateZ(0px)`
      }">下拉刷新加载哦~</div>
      <ul ref="scroll" class="scroll-container" :style="{
        'transition-timing-function': 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        'transition-duration': `${duration}ms`,
        'transform': `translate(0px, ${diff}px) scale(1) translateZ(0px)`
      }">
        <li v-for="n in 150" :key="n">我是第{{ n }}个lilili</li>
      </ul>
      <div ref="pullup" class="bottom" :style="{
        'transition-timing-function': 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        'transition-duration': `${pullDuration}ms`,
        'transform': `translate(0px, ${pullUpDiff}px) scale(1) translateZ(0px)`
      }">上拉刷新加载哦~</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wrapper: null,
      scroll: null,
      pullup: null,
      pulldown: null,
      wrapHeight: 0,
      contHeight: 0,
      scrollHeight: 0,
      diff: 0,
      lastDiff: 0,
      duration: 0,
      distance: 0,
      dirDistance: 0,
      startY: 0,
      curY: 0,
      distanceStep: 2,
      startTime: 0,
      endTime: 0,
      autoScroll: 400,
      maxThreshold: 40,
      defaultBounceDuration: 800,
      defaultAutoScrollDuration: 600,
      pullDuration: 0,
      pullDownHeight: 0,
      pullUpHeight: 0,
      pullDownDiff: 0,
      lastPullDownDiff: 0,
      pullUpDiff: 0,
      lastPullUpDiff: 0,
      pullLoading: false,
      extraPullDiff: 0
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.wrapper = this.$refs.wrapper
      this.scroll = this.$refs.scroll
      this.pullup = this.$refs.pullup
      this.pulldown = this.$refs.pulldown
      this.contHeight = this.scroll.offsetHeight
      this.wrapHeight = this.wrapper.offsetHeight
      this.pullUpHeight = this.pullup.offsetHeight
      this.pullDownHeight = this.pulldown.offsetHeight
      this.scrollHeight =
        this.contHeight > this.wrapHeight
          ? this.contHeight - this.wrapHeight
          : 0
      this.pullUpDiff = this.pullUpHeight
      this.pullDownDiff = -this.pullDownHeight
      this.bindEvents()
    },
    bindEvents() {
      this.wrapper.addEventListener('touchstart', this.handleTouchStart)
      this.wrapper.addEventListener('touchmove', this.handleTouchMove)
      this.wrapper.addEventListener('touchend', this.handleTouchEnd)
      this.scroll.addEventListener('transitionend', () => {
        this.duration = 0
      })
      this.pulldown.addEventListener('transitionend', () => {
        this.pullDuration = 0
      })
      this.pullup.addEventListener('transitionend', () => {
        this.pullDuration = 0
      })
    },
    handleTouchStart(event) {
      this.startTime = +Date.now()
      this.startY = event.touches[0].pageY
      this.lastDiff = this.diff
      this.lastPullDownDiff = this.pullDownDiff
      this.lastPullUpDiff = this.pullUpDiff
    },
    handleTouchMove(event) {
      event.preventDefault()
      event.stopPropagation()
      if (
        this.diff > this.maxThreshold + this.pullDownHeight ||
        this.diff < -this.scrollHeight - this.maxThreshold - this.pullUpHeight
      ) {
        return
      }
      this.curY = event.touches[0].pageY
      this.dirDistance = this.curY - this.startY
      this.distance = this.dirDistance + this.lastDiff
      if (
        (this.diff > 0 && this.dirDistance > 0) ||
        (this.diff < -this.scrollHeight && this.dirDistance < 0)
      ) {
        if (this.extraPullDiff === 0) {
          this.extraPullDiff = this.dirDistance
        }
        const realPullScrollDis =
          (this.dirDistance - this.extraPullDiff) / this.distanceStep
        this.distance = realPullScrollDis + this.extraPullDiff + this.lastDiff
        if (this.dirDistance > 0) {
          this.pullDownDiff = realPullScrollDis + this.lastPullDownDiff
        } else {
          this.pullUpDiff = realPullScrollDis + this.lastPullUpDiff
        }
      }
      this.diff = this.distance
      if (this.pullDownDiff >= -this.pullDownHeight && this.dirDistance < 0) {
        this.pullDownDiff = this.dirDistance + this.lastPullDownDiff
      }
      if (this.pullUpDiff <= this.pullUpHeight && this.dirDistance > 0) {
        this.pullUpDiff = this.dirDistance + this.lastPullUpDiff
      }
    },
    handleTouchEnd(event) {
      this.extraPullDiff = 0
      this.endTime = +Date.now()
      if (this.diff < -this.scrollHeight) {
        if (this.pullUpDiff <= 0 && this.distance < 0) {
          this.scrollTo(-this.scrollHeight - this.pullUpHeight)
          this.pullScrollTo('down', 0)
        } else {
          this.scrollTo(-this.scrollHeight)
          this.pullScrollTo('down', this.pullUpHeight)
        }
        return
      }
      if (this.diff > 0) {
        if (this.pullDownDiff >= 0 && this.distance > 0) {
          this.scrollTo(this.pullDownHeight)
          this.pullScrollTo('up', 0)
        } else {
          this.scrollTo(0)
          this.pullScrollTo('up', -this.pullDownHeight)
        }
        return
      }
      const moveTime = this.endTime - this.startTime
      const absDistance = Math.abs(this.dirDistance)
      if (
        (moveTime < 150 && absDistance > 30) ||
        (absDistance / moveTime < 0.3 && absDistance > 80)
      ) {
        this.handleScroll(this.autoScroll, this.defaultAutoScrollDuration)
      } else if (absDistance / moveTime > 0.35 && moveTime < 2500) {
        this.handleScroll(200, 2000)
      }
    },
    handleScroll(scrollDis, scrollTime) {
      if (this.dirDistance > 0) {
        if (this.diff < -scrollDis) {
          this.distance = this.diff + scrollDis
        } else {
          this.distance = 0
          scrollTime /= 2
        }
      } else {
        if (this.diff - scrollDis > -this.scrollHeight) {
          this.distance = this.diff - scrollDis
        } else {
          this.dstance = -this.scrollHeight
          scrollTime /= 2
        }
      }
      this.scrollTo(this.distance, scrollTime)
    },
    scrollTo(dis, time) {
      this.duration = time || this.defaultBounceDuration
      this.diff = dis
    },
    pullScrollTo(dir, dis, time) {
      if (dir === 'up') {
        this.pullDownDiff = dis
      } else {
        this.pullUpDiff = dis
      }
      this.pullDuration = time || this.defaultBounceDuration
    }
  }
}
</script>

<style lang="scss">
.page {
  .vue-scroll {
    position: relative;
    top: 20px;
    width: 100%;
    height: 400px;
    border: 1px solid #eee;
    overflow: hidden;
    .scroll-container {
      display: flex;
      flex-direction: column;
      li {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid lightgreen;
      }
    }
    .top {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      text-align: center;
      // background-color: rgba(0, 0, 0, 0.3);
    }
    .bottom {
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      text-align: center;
      // background-color: rgba(0, 0, 0, 0.3);
    }
  }
}
</style>
