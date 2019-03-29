<template>
  <div ref="scroll-wrapper" class="mu-scroll">
    <div v-if="pullRefresh" ref="scroll-pulldown" class="mu-scroll-pulldown" :style="{
      'transition-timing-function': 'cubic-bezier(0.165, 0.84, 0.44, 1)',
      'transition-duration': `${duration}ms`,
      'transform': `translate(0px, ${pullDownDiff}px) scale(1) translateZ(0px)`
    }">
      <slot name="pulldown">
        <p class="mu-scroll-pulldown-tip">{{ pullLoadingText[pullLoadingState] }}</p>
      </slot>
    </div>
    <!-- 内容区 -->
    <div ref="scroll-container" class="mu-scroll-container" :style="{
      'transition-timing-function': 'cubic-bezier(0.165, 0.84, 0.44, 1)',
      'transition-duration': `${duration}ms`,
      'transform': `translate(0px, ${diff}px) scale(1) translateZ(0px)`
    }">
      <slot></slot>
      <div v-if="infiniteLoading" ref="scroll-infinite">
        <slot name="infinite">
          <p class="mu-scroll-infinite-tip">{{ infiniteLoadingText[infiniteLoadingState] }}</p>
        </slot>
      </div>
    </div>
    <!-- 滚动条 -->
    <div v-if="scrollBar" class="mu-scroll-track" :style="{
      'background-color': scrollBarBgColor,
      'right': `${scrollBarOffset}px`
    }">
      <div class="mu-scroll-bar" :style="{
        'height': `${barHeight}px`,
        'background-color': scrollBarColor,
        'transition-timing-function': 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        'transition-duration': `${duration}ms`,
        'transform': `translate(0px, ${barDiff}px) scale(1) translateZ(0px)`
      }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MuScroll',
  props: {
    pullRefresh: {
      type: Boolean,
      default: false
    },
    infiniteLoading: {
      type: Boolean,
      default: false
    },
    scrollBar: {
      type: Boolean,
      default: false
    },
    scrollBarOffset: {
      type: Number,
      default: 0
    },
    scrollBarColor: {
      type: String,
      default: '#aaa'
    },
    scrollBarBgColor: {
      type: String,
      default: 'transparent'
    },
    pullStep: {
      type: Number,
      default: 4
    },
    bounceTime: {
      type: Number,
      default: 800
    }
  },
  data() {
    return {
      startY: 0,
      offsetY: 0,
      maxThreshold: 0,
      distance: 0,
      autoScroll: 600,
      duration: 0,
      diff: 0,
      pullDownDiff: 0,
      lastPullDownDiff: 0,
      extraPullDiff: 0,
      pullDownHeight: 0,
      pullLoading: false,
      pullLoadingText: ['下拉刷新', '释放刷新', '正在加载中...', '加载完成'],
      pullLoadingState: 0,
      infiniteLoadingText: ['上拉即可加载', '正在加载中...', '加载完成'],
      infiniteLoadingState: 0,
      barHeight: 0,
      barDiff: 0
    }
  },
  mounted() {
    this.init()
    // 下拉刷新状态处理器
    this.pulldownHandler = {
      finish: () => {
        this.$emit('$pulldownResult:finish')
      }
    }
    this.$on('$pulldownResult:finish', () => {
      this.resetPulldownState()
    })
    // 滚动加载状态处理器
    this.infiniteHandler = {
      loaded: () => {
        this.$emit('$infiniteResult:loaded')
      },
      complete: () => {
        this.$emit('$infiniteResult:complete')
      }
    }
    this.$on('$infiniteResult:loaded', () => {
      this.resetInfiniteState(0)
    })
    this.$on('$infiniteResult:complete', () => {
      this.resetInfiniteState(2)
    })
  },
  methods: {
    init() {
      this.wrapper = this.$refs['scroll-wrapper']
      this.scroll = this.$refs['scroll-container']
      this.wrapHeight = this.wrapper.offsetHeight
      this.computeScrollHeight()
      if (this.pullRefresh) {
        this.maxThreshold = 50
        this.pulldown = this.$refs['scroll-pulldown']
        this.pullDownHeight = this.pulldown.offsetHeight
        this.pullDownDiff = -this.pullDownHeight
      }
      if (this.infiniteLoading) {
        this.infiniteHeight = this.$refs['scroll-infinite'].offsetHeight
      }
      this.bindEvent()
    },
    bindEvent() {
      this.wrapper.addEventListener('touchstart', this.handleTouchStart)
      this.wrapper.addEventListener('touchmove', this.handleTouchMove)
      this.wrapper.addEventListener('touchend', this.handleTouchEnd)
      this.scroll.addEventListener('transitionend', () => {
        this.duration = 0
      })
      if (this.pullRefresh) {
        this.$emit('pull-state', 'init')
        this.pulldown.addEventListener('transitionend', () => {
          if (!this.pullLoading && this.pullLoadingState === 3) {
            this.pullLoadingState = 0
            this.$emit('pull-state', 'init')
          }
        })
      }
    },
    handleTouchStart(event) {
      if (this.pullLoading) {
        return
      }
      this.startTime = +Date.now()
      this.startY = event.touches[0].clientY
      this.lastDiff = this.diff
      if (this.pullRefresh) {
        this.lastPullDownDiff = this.pullDownDiff
      }
    },
    handleTouchMove(event) {
      event.preventDefault()
      event.stopPropagation()
      if (this.pullLoading) {
        return
      }
      this.offsetY = event.touches[0].clientY - this.startY
      this.distance = this.offsetY + this.lastDiff
      // 无下拉刷新，下拉时阻止
      if (!this.pullRefresh && this.distance >= 0) {
        return
      }
      // 必须在滑动范围内
      if (this.diff <= this.maxThreshold + this.pullDownHeight) {
        if (this.pullRefresh && this.offsetY > 0 && this.distance > 0) {
          if (this.extraPullDiff === 0) {
            this.extraPullDiff = this.offsetY
            this.pullLoadingState = 0
            this.$emit('pull-state', 'init')
            return
          }
          // 下拉展示阶段
          const realPullScrollDis =
            (this.offsetY - this.extraPullDiff) / this.pullStep
          this.distance = realPullScrollDis + this.extraPullDiff + this.lastDiff
          this.pullDownDiff = realPullScrollDis + this.lastPullDownDiff
          // 拉下状态切换，提示释放刷新
          if (this.pullDownDiff >= 10 && this.pullLoadingState !== 1) {
            this.pullLoadingState = 1
            this.$emit('pull-state', 'trigger')
          }
        } else if (
          this.infiniteLoading &&
          this.distance <= -this.scrollHeight + this.infiniteHeight &&
          this.offsetY < 0 &&
          this.infiniteLoadingState === 0
        ) {
          // 触发滚动加载
          this.infiniteLoadingState = 1
          this.$emit('infinite-loading', this.infiniteHandler)
        } else if (this.distance <= -this.scrollHeight && this.offsetY < 0) {
          // 触底边界
          this.distance = -this.scrollHeight
        }
        this.diff = this.distance
        this.computeBarDiff(this.distance)
      }
    },
    handleTouchEnd(event) {
      // 边界情况不处理
      if (
        Math.abs(event.changedTouches[0].clientY - this.startY) < 1 ||
        this.pullLoading ||
        (!this.infiniteLoading && this.diff <= -this.scrollHeight) ||
        (!this.pullRefresh && this.diff >= 0)
      ) {
        return
      }
      this.extraPullDiff = 0
      this.endTime = +Date.now()
      if (this.pullRefresh && this.diff > 0) {
        if (this.pullDownDiff >= 10) {
          this.scrollTo(this.pullDownHeight)
          this.pullScrollTo(0)
          // 触发下拉刷新
          this.pullLoadingState = 2
          // 锁住状态
          this.pullLoading = true
          this.$emit('pull-state', 'touchend')
          this.$emit('pull-refresh', this.pulldownHandler)
        } else {
          // 自动弹回
          this.scrollTo(0)
          this.pullScrollTo(-this.pullDownHeight)
        }
        return
      }
      const moveTime = this.endTime - this.startTime
      const scrollRate = Math.abs(this.offsetY) / moveTime
      // 分配
      if (scrollRate > 0.7) {
        this.handleScroll(this.autoScroll)
      } else if (scrollRate > 0.4) {
        this.handleScroll(this.autoScroll / 2)
      } else if (scrollRate > 0.2) {
        this.handleScroll(this.autoScroll / 4)
      }
    },
    handleScroll(scrollDis) {
      let time = 500
      if (this.offsetY > 0) {
        if (this.diff < -scrollDis) {
          this.distance = this.diff + scrollDis
        } else {
          this.distance = 0
          time = Math.abs(this.diff) > 100 ? 100 : 50
        }
      } else {
        if (this.diff - scrollDis > -this.scrollHeight) {
          this.distance = this.diff - scrollDis
        } else {
          this.distance = -this.scrollHeight
          time = this.distance + this.scrollHeight > 100 ? 100 : 50
        }
      }
      this.scrollTo(this.distance, time)
    },
    scrollTo(dis, time) {
      this.duration = time || this.bounceTime
      this.diff = dis
      this.computeBarDiff(dis)
    },
    pullScrollTo(dis, time) {
      this.pullDownDiff = dis
    },
    resetPulldownState() {
      this.pullLoadingState = 3
      this.$emit('pull-state', 'finish')
      this.scrollTo(0)
      this.pullScrollTo(-this.pullDownHeight)
      this.$nextTick(() => {
        this.computeScrollHeight()
        this.pullLoading = false
      })
    },
    resetInfiniteState(state) {
      this.$nextTick(() => {
        this.infiniteLoadingState = state
        this.computeScrollHeight()
      })
    },
    computeScrollHeight() {
      this.contHeight = this.scroll.offsetHeight
      this.scrollHeight =
        this.contHeight > this.wrapHeight
          ? this.contHeight - this.wrapHeight
          : 0
      if (this.scrollBar) {
        // 计算滚动条高度
        this.barHeight = Math.pow(this.wrapHeight, 2) / this.contHeight
      }
    },
    computeBarDiff(dis) {
      if (this.scrollBar) {
        if (dis >= 0) {
          this.barDiff = dis
        } else {
          this.barDiff = (this.wrapHeight * -dis) / this.contHeight
        }
      }
    }
  }
}
</script>

<style lang="scss">
.mu-scroll {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  &-pulldown {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
  &-pulldown-tip,
  &-infinite-tip {
    height: 30px !important;
    line-height: 30px !important;
    font-size: 13px;
    color: #999;
    text-align: center;
  }
  &-track {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 6px;
  }
  &-bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    border-radius: 6px;
  }
}
</style>
