<template>
  <div
    v-show="show" class="mu-indicator" :style="{'background': maskColor}">
    <div class="mu-indicator-bd" :style="{'background-color': bgColor}">
      <mu-loading
        class="mu-indicator-loading"
        :type="type"
        :size="40"
        :color="color">
        <p
          class="mu-indicator-text"
          :style="{'color': color}">
          {{ tip }}
        </p>
      </mu-loading>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'ring',
      validator(val) {
        return ~['ring', 'dual-ring'].indexOf(val)
      }
    },
    color: {
      type: String,
      default: '#fff'
    },
    bgColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.7)'
    },
    maskColor: {
      type: String,
      default: 'transparent'
    },
    tip: {
      type: String,
      default: 'Loading...'
    }
  },
  data() {
    return {
      show: false
    }
  },
  mounted() {
    this.show = true
  }
}
</script>

<style lang="scss">
.mu-indicator {
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
    min-width: 100px;
    min-height: 100px;
    border-radius: 5px;
    text-align: center;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
    transform: translate3d(-50%, -50%, 0);
  }
  &-loading {
    margin-top: 10px;
  }
}
</style>
