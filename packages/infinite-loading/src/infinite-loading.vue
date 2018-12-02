<template>
  <div ref="ilWrapper" class="mu-infinite-loading" :class="{
    'mu-infinite-loading-part': isPartialLoad
  }">
    <div ref="ilContainer" class="mu-infinite-loading-container">
      <slot />
    </div>
    <div v-show="loading" class="mu-infinite-loading-tip">
      <slot name="loading">
        {{ loadingText || 'loading...' }}
      </slot>
    </div>
    <div v-if="complete" class="mu-infinite-loading-tip">
      <slot name="complete">
        {{ completeText || 'complete~' }}
      </slot>
    </div>
    <div v-if="error" class="mu-infinite-loading-tip">
      <slot name="error">
        {{ errorText || 'error~' }}
      </slot>
    </div>
    <div v-if="empty" class="mu-infinite-loading-tip">
      <slot name="empty">
        {{ emptyText || 'empty~' }}
      </slot>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  name: 'MuInfiniteLoading',
  props: {
    target: {
      type: String,
      default: ''
    },
    distance: {
      type: Number,
      default: 20,
      validate(val) {
        return val >= 10
      }
    },
    debounceTime: {
      type: Number,
      default: 50,
      validate(val) {
        return val >= 20
      }
    },
    preload: {
      type: Boolean,
      default: true
    },
    loadingText: {
      type: String,
      default: ''
    },
    completeText: {
      type: String,
      default: ''
    },
    errorText: {
      type: String,
      default: ''
    },
    emptyText: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      scrollParent: null,
      container: null,
      scrollParentClientHeight: 0,
      containerHeight: 0,
      loading: false,
      complete: false,
      error: false,
      empty: false,
      eventHandler: null
    }
  },
  computed: {
    isPartialLoad() {
      return this.scrollParent !== window
    }
  },
  mounted() {
    const _this = this
    this.scrollParent = this.getScrollParent()
    this.container = this.$refs.ilContainer
    this.scrollParentClientHeight = this.getClientHeight(this.scrollParent)
    this.containerHeight = this.container.offsetHeight
    this.eventHandler = debounce(_this.handleScroll, this.debounceTime)
    this.scrollParent.addEventListener('scroll', this.eventHandler)

    this.stateChanger = {
      loaded: () => {
        this.$emit('$infiniteLoading:loaded')
      },
      complete: () => {
        this.$emit('$infiniteLoading:complete')
      },
      error: () => {
        this.$emit('$infiniteLoading:error')
      },
      empty: () => {
        this.$emit('$infiniteLoading:empty')
      }
    }

    this.$on('$infiniteLoading:loaded', () => {
      this.$nextTick(() => {
        this.refresh()
      })
    })
    this.$on('$infiniteLoading:complete', () => {
      this.$nextTick(() => {
        this.refresh(true)
      })
    })
    this.$on('$infiniteLoading:error', () => {
      this.$nextTick(() => {
        this.reset('error')
      })
    })
    this.$on('$infiniteLoading:empty', () => {
      this.$nextTick(() => {
        this.reset('empty')
      })
    })

    if (this.preload) {
      this.execute()
    }
  },
  beforeDestroy() {
    this.removeListener()
  },
  methods: {
    getScrollParent() {
      let target = this.$refs.ilWrapper
      if (this.target === 'window') {
        target = window
      }
      return target
    },
    getScrollTop(target) {
      if (target === window) {
        return Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop
        )
      }
      return target.scrollTop
    },
    getElementTop(element) {
      return element.getBoundingClientRect().top + this.getScrollTop(window)
    },
    getClientHeight(target) {
      if (target === window) {
        return document.documentElement.clientHeight
      }
      return target.clientHeight
    },
    check() {
      let scrollTop = 0
      if (this.scrollParent === window) {
        scrollTop =
          this.getScrollTop(window) - this.getElementTop(this.$refs.ilWrapper)
      } else {
        scrollTop = this.getScrollTop(this.scrollParent)
      }
      if (
        scrollTop + this.scrollParentClientHeight >=
        this.containerHeight - this.distance
      ) {
        return true
      }
      return false
    },
    handleScroll() {
      if (this.complete || this.loading) return
      const isReachBottom = this.check()
      if (isReachBottom) {
        this.execute()
      }
    },
    execute() {
      this.loading = true
      this.$emit('load', this.stateChanger)
    },
    refresh(isComplete) {
      this.containerHeight = this.container.offsetHeight
      this.loading = false
      if (isComplete) {
        this.complete = true
      }
    },
    reset(type) {
      if (type === 'empty') {
        this.empty = true
      } else if (type === 'error') {
        this.error = true
      }
      this.loading = false
      this.removeListener()
    },
    removeListener() {
      this.scrollParent.removeEventListener('scroll', this.eventHandler)
    }
  }
}
</script>

<style lang="scss">
.mu-infinite-loading {
  &-part {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
  &-tip {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    text-align: center;
    color: #999;
  }
}
</style>
