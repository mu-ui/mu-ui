<template>
  <div class="mu-loading">
    <slot name="icon">
      <div class="mu-loading-icon" :style="iconStyle"></div>
    </slot>
    <div class="mu-loading-con">
      <slot>
        <span class="mu-loading-tip">loading...</span>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MuLoading',
  props: {
    color: {
      type: String,
      default: '#272639',
      validator(val) {
        return val !== ''
      }
    },
    type: {
      type: String,
      default: 'ring',
      validator(val) {
        return ~['ring', 'dual-ring'].indexOf(val)
      }
    },
    size: {
      type: Number,
      default: 30,
      validator(val) {
        return val => 20
      }
    },
    width: {
      type: Number,
      default: 3,
      validator(val) {
        return val > 0
      }
    }
  },
  computed: {
    iconStyle() {
      let style = {
        width: `${this.size}px`,
        height: `${this.size}px`,
        borderWidth: `${this.width}px`,
        borderColor: this.color,
        borderRightColor: 'transparent'
      }
      if (this.type === 'dual-ring') {
        style.borderLeftColor = 'transparent'
      }
      return style
    }
  }
}
</script>

<style lang="scss">
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.mu-loading {
  text-align: center;
  &-icon {
    display: inline-block;
    box-sizing: border-box;
    border-radius: 50%;
    border-style: solid;
    animation: rotate 1s linear infinite;
  }
  &-con {
    padding-top: 10px;
  }
  &-tip {
    font-size: 14px;
    color: #666;
  }
}
</style>
