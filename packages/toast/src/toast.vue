<template>
  <transition :name="type" type="animation" @after-enter="afterEnter" @after-leave="afterLeave">
    <div v-show="show" class="mu-toast" :class="[posClass]">
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
      required: true
    },
    position: {
      type: String,
      default: 'bottom'
    },
    duration: {
      type: Number,
      default: 3000
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
    isNotDefault() {
      return ~['top', 'middle'].indexOf(this.position)
    },
    posClass() {
      return this.isNotDefault ? `pos-${this.position}` : 'pos-bottom'
    },
    type() {
      return this.isNotDefault ? `bounce-${this.position}` : 'bounce-bottom'
    },
    customStyle() {
      let styleObj = {}
      this.color !== '' && (styleObj.color = this.color)
      this.bgColor !== '' && (styleObj.backgroundColor = this.bgColor)
      return styleObj
    }
  },
  mounted() {
    this.show = true
  },
  beforeDestroy() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  },
  methods: {
    afterEnter() {
      this.timer = setTimeout(() => {
        this.show = false
      }, this.duration)
    },
    afterLeave() {
      const parent = this.$el.parentNode
      if (parent) {
        parent.removeChild(this.$el)
      }
      this.$destroy()
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
  &.bounce-middle-enter-active {
    animation: bounceIn 0.5s;
  }
  &.bounce-middle-leave-active {
    animation: bounceOut 0.5s;
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
    padding: 5px 10px;
    line-height: 22px;
    border-radius: 5px;
    box-sizing: border-box;
    word-break: break-all;
    color: #fff;
    font-size: 16px;
    background-color: rgba(0, 0, 0, 0.7);
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
  }
}
</style>
