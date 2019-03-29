<template>
  <div class="mu-collapse-item" :style="{
    'border-bottom-color': borderColor
  }">
    <div class="mu-collapse-item-header" :style="borderStyle" @click="togglePanel">
      <slot name="header">
        <p class="mu-collapse-item-title" :style="titleColorStyle">{{ title }}</p>
        <div class="mu-collapse-item-toggle" :style="arrowTransform">
          <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" :width="arrowSize" :height="arrowSize"><path d="M517.688889 796.444444c-45.511111 0-85.333333-17.066667-119.466667-51.2L73.955556 381.155556c-22.755556-22.755556-17.066667-56.888889 5.688888-79.644445 22.755556-22.755556 56.888889-17.066667 79.644445 5.688889l329.955555 364.088889c5.688889 5.688889 17.066667 11.377778 28.444445 11.377778s22.755556-5.688889 34.133333-17.066667l312.888889-364.088889c22.755556-22.755556 56.888889-28.444444 79.644445-5.688889 22.755556 22.755556 28.444444 56.888889 5.688888 79.644445L637.155556 739.555556c-28.444444 39.822222-68.266667 56.888889-119.466667 56.888888 5.688889 0 0 0 0 0z" :fill="arrowColor"></path></svg>
        </div>
      </slot>
    </div>
    <div class="mu-collapse-item-body" :style="contentStyle">
      <div ref="content" class="mu-collapse-item-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MuCollapseItem',
  props: {
    name: {
      type: [String, Number],
      required: true
    },
    title: {
      type: String,
      default: '标题'
    },
    titleColor: {
      type: String,
      default: '#2c2c2c'
    },
    arrowColor: {
      type: String,
      default: '#8a8a8a'
    },
    arrowSize: {
      type: Number,
      default: 16
    },
    borderColor: {
      type: String,
      default: '#ddd'
    }
  },
  data() {
    return {
      show: false,
      height: 0
    }
  },
  computed: {
    borderStyle() {
      return {
        borderTopColor: this.borderColor
      }
    },
    titleColorStyle() {
      return {
        color: this.titleColor
      }
    },
    arrowTransform() {
      return {
        transform: `rotate(${this.show ? -180 : 0}deg)`
      }
    },
    contentStyle() {
      return {
        height: this.show ? `${this.height}px` : 0
      }
    }
  },
  mounted() {
    this.timer = setTimeout(() => {
      clearTimeout(this.timer)
      this.height = this.$refs.content.offsetHeight
    }, 0)
  },
  methods: {
    togglePanel() {
      this.show = !this.show
      if (this.$parent.accordion) {
        this.$parent.closeOther(this.name)
      }
    }
  }
}
</script>

<style lang="scss">
.mu-collapse-item {
  width: 100%;
  &:last-child {
    border-bottom-width: 1px;
    border-bottom-style: solid;
  }
  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding: 0 5px;
    box-sizing: border-box;
    border-top-width: 1px;
    border-top-style: solid;
    &:active {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
  &-title {
    font-size: 13px;
  }
  &-toggle {
    transition: transform 0.4s ease-in-out;
  }
  &-body {
    transition: height 0.4s ease-in-out;
    overflow: hidden;
  }
  &-content {
    padding: 5px;
    box-sizing: border-box;
  }
}
</style>
