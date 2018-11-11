<template>
  <transition :name="transitionType" type="animation">
    <div v-show="show" class="mu-toast" :class="positionClass">
      <p class="mu-toast-text" :class="customClass" :style="customStyle">
        {{ message }}
      </p>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: ''
    },
    position: {
      type: String,
      default: 'middle'
    },
    customClass: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    bgColor: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    positionClass() {
      let posClass = ''
      if (~['top', 'bottom'].indexOf(this.position)) {
        posClass = `pos-${this.position}`
      } else {
        posClass = 'pos-middle'
      }
      return posClass
    },
    transitionType() {
      let style = ''
      if (~['top', 'bottom'].indexOf(this.position)) {
        style = `bounce-${this.position}`
      } else {
        style = 'zoom-middle'
      }
      return style
    },
    customStyle() {
      let styleObj = {}
      if (this.color !== '') {
        styleObj.color = this.color
      }
      if (this.bgColor !== '') {
        styleObj.backgroundColor = this.bgColor
      }
      return styleObj
    }
  }
}
</script>

<style lang="scss">
@import './_animate.scss';

.mu-toast {
  z-index: 10000;
  position: fixed;
  width: 80%;
  text-align: center;
  opacity: 1;
  &.pos-middle {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1, 1);
  }
  &.pos-top {
    top: 50px;
    left: 50%;
    transform: translate(-50%, 0);
  }
  &.pos-bottom {
    bottom: 50px;
    left: 50%;
    transform: translate(-50%, 0);
  }
  &.zoom-middle-enter-active {
    animation: zoomIn 0.5s;
  }
  &.zoom-middle-leave-active {
    animation: zoomOut 0.5s;
  }
  &.bounce-top-enter-active {
    animation: bounceInDown 0.75s;
  }
  &.bounce-top-leave-active {
    animation: bounceOutUp 0.75s;
  }
  &.bounce-bottom-enter-active {
    animation: bounceInUp 0.75s;
  }
  &.bounce-bottom-leave-active {
    animation: bounceOutDown 0.75s;
  }
  &-text {
    display: inline-block;
    min-width: 200px;
    padding: 10px 20px;
    line-height: 40px;
    border-radius: 5px;
    box-sizing: border-box;
    word-break: break-all;
    color: #fff;
    font-size: 14px;
    background-color: rgba(0, 0, 0, 0.7);
    box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.2);
  }
}
</style>
