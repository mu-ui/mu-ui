<template>
  <transition :name="transitionType">
    <div
      v-show="show"
      class="mu-popup"
      :class="`mu-popup-${position}`"
      :style="{'transition-duration': `${duration}s`}">
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'center',
      validator(value) {
        return ~['top', 'bottom', 'left', 'right', 'center'].indexOf(value)
      }
    },
    transition: {
      type: String,
      default: 'fade',
      validator(value) {
        return ~['fade', 'slide'].indexOf(value)
      }
    },
    modal: {
      type: Boolean,
      default: true
    },
    clickable: {
      type: Boolean,
      default: true
    },
    opacity: {
      type: Number,
      default: 0.5,
      validator(value) {
        return value >= 0 && value <= 1
      }
    },
    duration: {
      type: Number,
      default: 0.5,
      validator(value) {
        return value >= 0
      }
    }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    transitionType() {
      return this.position === 'center' ? 'fade' : 'slide'
    }
  },
  watch: {
    value(val) {
      this.show = val
      this.modal && this.toggleModal(val)
    }
  },
  created() {
    // 只有初始化实例时创建
    this.createModal()
  },
  methods: {
    createModal() {
      if (this.modal) {
        const modalAmount = document.querySelectorAll('.mu-popup-modal').length
        let popupModalEl = document.createElement('div')
        popupModalEl.className = `mu-popup-modal mu-popup-modal-${modalAmount}`
        popupModalEl.style.backgroundColor = `rgba(0, 0, 0, ${this.opacity})`
        popupModalEl.style.transitionDuration = `${this.duration}s`
        document.body.appendChild(popupModalEl)

        if (this.clickable) {
          popupModalEl.addEventListener('click', () => {
            this.$emit('input', false)
            this.toggleModal(false)
          })
          popupModalEl.addEventListener(
            'transitionend',
            () => !this.show && this.hideModal()
          )
        }
        // 挂载节点
        this.modalEl = popupModalEl
      }
      if (this.value) {
        this.$nextTick(() => {
          this.show = true
          this.modal && this.toggleModal(true)
        })
      }
    },
    toggleModal(isShow) {
      if (isShow) {
        this.modalEl.style.display = 'block'
        // nextTick失效，延迟10ms
        setTimeout(() => (this.modalEl.style.opacity = '1'), 10)
      } else {
        this.modalEl.style.opacity = '0'
      }
    },
    hideModal() {
      this.modalEl.style.display = 'none'
    }
  }
}
</script>

<style lang="scss">
.mu-popup {
  z-index: 3001;
  position: fixed;
  &-center {
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    &.fade-enter,
    &.fade-leave-active {
      opacity: 0;
    }
    &.fade-enter-active,
    &.fade-leave-active {
      transition-property: opacity;
    }
  }
  &-top {
    top: 0;
    left: 0;
    right: 0;
    transform: translate(0, 0);
    &.slide-enter,
    &.slide-leave-active {
      transform: translate(0, -100%);
    }
    &.slide-enter-active,
    &.slide-leave-active {
      transition-property: transform;
    }
  }
  &-bottom {
    bottom: 0;
    left: 0;
    right: 0;
    transform: translate(0, 0);
    &.slide-enter,
    &.slide-leave-active {
      transform: translate(0, 100%);
    }
    &.slide-enter-active,
    &.slide-leave-active {
      transition-property: transform;
    }
  }
  &-left {
    top: 0;
    left: 0;
    bottom: 0;
    transform: translate(0, 0);
    &.slide-enter,
    &.slide-leave-active {
      transform: translate(-100%, 0);
    }
    &.slide-enter-active,
    &.slide-leave-active {
      transition-property: transform;
    }
  }
  &-right {
    top: 0;
    bottom: 0;
    right: 0;
    transform: translate(0, 0);
    &.slide-enter,
    &.slide-leave-active {
      transform: translate(100%, 0);
    }
    &.slide-enter-active,
    &.slide-leave-active {
      transition-property: transform;
    }
  }
}
.mu-popup-modal {
  display: none;
  z-index: 3000;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0;
  transition-property: opacity;
}
</style>
