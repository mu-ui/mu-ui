<template>
  <div
    v-show="show"
    class="mu-dialog"
    :style="{'background-color': `rgba(0, 0, 0, ${opacity})`}"
  >
    <div class="mu-dialog-bd">
      <div class="mu-dialog-con">
        <slot>
          <h3 class="mu-dialog-title">{{ title }}</h3>
          <p class="mu-dialog-message">
            <span>{{ message }}</span>
          </p>
        </slot>
      </div>
      <div class="mu-dialog-handler" :class="{'mu-loading-sep-line': !isSingle}">
        <div
          class="mu-dialog-btn mu-dialog-btn0"
          :class="{'mu-dialog-btn-highlight': isSingle, 'mu-dialog-order1': !isSingle && pre}"
          @click="handler(0)"
        >{{ customBtnText }}</div>
        <div
          v-if="!isSingle"
          class="mu-dialog-btn mu-dialog-btn1 mu-dialog-btn-highlight"
          @click="handler(1)"
        >{{ btns[1] || 'Confirm' }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    single: {
      type: Boolean,
      default: false
    },
    pre: {
      type: Boolean,
      default: false
    },
    opacity: {
      type: Number,
      default: 0.1,
      validator(value) {
        return value >= 0 && value <= 1
      }
    },
    title: {
      type: String,
      default: 'Tip'
    },
    message: {
      type: String,
      default: 'Are you sure?'
    },
    btns: {
      type: Array,
      default() {
        return []
      }
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isMounted: false, // 给实例方法
      show: false
    }
  },
  computed: {
    customBtnText() {
      return this.btns[0] || (this.single ? 'Confirm' : 'Cancel')
    },
    isSingle() {
      return this.btns.length === 1 || (this.single && this.btns.length === 0)
    }
  },
  watch: {
    value(val) {
      this.show = val
    }
  },
  mounted() {
    if (this.value) {
      this.show = true
    }
  },
  methods: {
    handler(btnIndex) {
      // 实例方法处理
      if (this.isMounted) {
        this.show = false
      } else {
        this.$emit('input', false)
      }
      if (this.isSingle || btnIndex === 1) {
        this.$emit('sure')
      } else {
        this.$emit('cancel')
      }
    }
  }
}
</script>

<style lang="scss">
.mu-dialog {
  z-index: 4000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  &-bd {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 520px;
    min-height: 250px;
    border-radius: 15px;
    box-sizing: border-box;
    text-align: center;
    box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    transform: translate3d(-50%, -50%, 0);
  }
  &-con {
    padding: 20px 20px 0 20px;
    margin-bottom: 110px;
  }
  &-title {
    padding-top: 15px;
    font-weight: bold;
    font-size: 30px;
  }
  &-message {
    display: inline-flex;
    align-items: center;
    min-height: 80px;
    padding-top: 20px;
    line-height: 40px;
    font-size: 26px;
  }
  &-handler {
    display: flex;
    justify-content: space-around;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 80px;
    line-height: 80px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    border-top: 1px solid #eee;
    overflow: hidden;
    &.mu-loading-sep-line {
      &:after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 50%;
        width: 1px;
        background-color: #eee;
        transform: translateX(-50%);
      }
    }
  }
  &-btn {
    flex: 1;
    color: #ccc;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
    &:active {
      background-color: rgba(0, 0, 0, 0.05);
    }
    &.mu-dialog-btn-highlight {
      color: #fd0;
    }
    &.mu-dialog-order1 {
      order: 1;
    }
  }
}
</style>
