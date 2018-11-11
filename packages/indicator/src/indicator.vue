<template>
  <div
    v-show="show" class="mu-indicator" :style="{'background-color': maskColor}">
    <div class="mu-indicator-bd" :style="{'background-color': bgColor}">
      <mu-loading
        class="mu-indicator-loading"
        :type="type"
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
      default: 'rolling'
    },
    color: {
      type: String,
      default: '#fff'
    },
    bgColor: {
      type: String,
      default: ''
    },
    maskColor: {
      type: String,
      default: ''
    },
    tip: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: false,
      isMounted: false
    }
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
  background: transparent;
  pointer-events: none;
  &-bd {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    border-radius: 15px;
    text-align: center;
    box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.2);
    background-color: rgba(0, 0, 0, 0.7);
    transform: translate3d(-50%, -50%, 0);
  }
  &-loading {
    margin-top: 20px;
    color: #fff;
  }
  &-text {
    padding-top: 15px;
  }
}
</style>
