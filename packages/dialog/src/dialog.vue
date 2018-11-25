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
          :class="{'mu-dialog-order1': !isSingle && pre}"
          :style="[isSingle ? {'color': highlight} : '']"
          @click="handler(0)"
        >{{ customBtnText }}</div>
        <div
          v-if="!isSingle"
          class="mu-dialog-btn mu-dialog-btn1"
          :style="{'color': highlight}"
          @click="handler(1)"
        >{{ btns[1] || 'Confirm' }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MuDialog',
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
    highlight: {
      type: String,
      default: '#272639'
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isMounted: false,
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
      if (this.isMounted) {
        this.show = false
      } else {
        this.$emit('input', false)
      }
      if (this.isSingle || btnIndex === 1) {
        this.$emit('confirm')
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
    min-width: 260px;
    min-height: 125px;
    border-radius: 6px;
    box-sizing: border-box;
    text-align: center;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    transform: translate3d(-50%, -50%, 0);
  }
  &-con {
    padding: 10px 10px 0 10px;
    margin-bottom: 55px;
  }
  &-title {
    padding-top: 10px;
    font-weight: bold;
    font-size: 16px;
  }
  &-message {
    display: inline-flex;
    align-items: center;
    min-height: 40px;
    padding-top: 10px;
    line-height: 20px;
    font-size: 14px;
  }
  &-handler {
    display: flex;
    justify-content: space-around;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 40px;
    line-height: 40px;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
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
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    &:active {
      background-color: rgba(0, 0, 0, 0.05);
    }
    &.mu-dialog-order1 {
      order: 1;
    }
  }
}
</style>
