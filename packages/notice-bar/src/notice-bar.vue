<template>
  <div ref="notice-bar-wrapper" class="mu-notice-bar">
    <div class="mu-notice-bar-container" :style="{
      'transition-duration': `${duration}ms`,
      'transform': `translate(0, ${diff}px) scale(1) translateZ(0px)`
    }">
      <p v-for="(item, index) in list" :key="index" :class="`mu-notice-bar-text notice-bar-text-${index}`" :style="{
        'height': `${wrapHeight}px`,
        'transition-duration': `${item.dur}ms`,
        'transform': `translate(${item.diff}px, 0) scale(1) translateZ(0px)`
      }">
        <span>{{ item.text }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MuNoticeBar',
  props: {
    text: {
      type: [String, Array],
      default: ''
    },
    speed: {
      type: Number,
      default: 50
    },
    interval: {
      type: Number,
      default: 3
    },
    delay: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      cur: 0,
      curEl: null,
      wrapWidth: 0,
      wrapHeight: 0,
      textWidth: 0,
      duration: 0,
      diff: 0,
      timer: null,
      wrapTimer: null,
      single: false,
      from: 'start',
      list: [],
      rawData: []
    }
  },
  watch: {
    text: {
      handler(val) {
        const list = typeof val === 'string' ? [val] : val
        const curLen = this.list.length
        this.single = list.length === 1
        if (curLen === 0) {
          this.list = list.map(text => {
            return {
              text,
              diff: 0,
              dur: 0
            }
          })
        } else if (this.single) {
          this.rawData.push({
            text: list[0],
            diff: 0,
            dur: 0
          })
        } else {
          const newList = list.slice(curLen).map(text => {
            return {
              text,
              diff: 0,
              dur: 0
            }
          })
          this.list.push(...newList)
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.wrapper = this.$refs['notice-bar-wrapper']
      this.wrapWidth = this.wrapper.clientWidth
      this.wrapHeight = this.wrapper.clientHeight
      this.wrapper.addEventListener('transitionend', event => {
        event.stopPropagation()
        this.duration = 0
        this.cur++
        if (this.cur === this.list.length) {
          this.diff = 0
          this.cur = 0
        }
        this.check()
      })
      this.check()
    },
    check() {
      this.curEl = document.querySelector(`.notice-bar-text-${this.cur}`)
      this.textWidth = this.curEl.children[0].offsetWidth
      if (this.textWidth > this.wrapWidth) {
        this.curEl.addEventListener('transitionend', this.transitionHandler)
        this.run()
      } else if (!this.single) {
        this.wrapMove()
      }
    },
    wrapMove(immediate) {
      if (this.wrapTimer) {
        clearTimeout(this.wrapTimer)
      }
      if (immediate) {
        this.duration = 500
        this.diff += -this.wrapHeight
      } else {
        this.wrapTimer = setTimeout(() => {
          this.duration = 500
          this.diff += -this.wrapHeight
        }, immediate ? 10 : this.interval * 1000)
      }
    },
    run(refreshWidth) {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      const curItem = this.list[this.cur]
      curItem.dur = 0
      curItem.diff = this.from === 'end' ? this.wrapWidth : 0
      this.timer = setTimeout(() => {
        if (refreshWidth) {
          this.textWidth = this.curEl.children[0].offsetWidth
        }
        curItem.dur = (this.textWidth / this.speed) * 1000
        curItem.diff = -this.textWidth
      }, this.delay * 1000)
    },
    transitionHandler(event) {
      event.stopPropagation()
      // 如果列表不止一个，执行下一个
      if (!this.single) {
        this.curEl.removeEventListener('transitionend', this.transitionHandler)
        this.wrapMove(true)
      } else {
        this.from = 'end'
        if (this.rawData.length === 1) {
          this.list = this.rawData
          this.rawData = []
          this.run(true)
        } else {
          this.run()
        }
      }
    }
  }
}
</script>

<style lang="scss">
.mu-notice-bar {
  width: 100%;
  height: 100%;
  overflow: hidden;
  &-text {
    display: flex;
    align-items: center;
    white-space: nowrap;
    transition-timing-function: linear;
  }
}
</style>
