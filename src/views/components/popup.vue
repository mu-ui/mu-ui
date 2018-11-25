<template>
  <div class="popup">
    <div class="popup-btn popup-center" @click="showPopup('center')">center</div>
    <div class="popup-btn popup-center" @click="showPopup('top')">top</div>
    <div class="popup-btn popup-center" @click="showPopup('bottom')">bottom</div>
    <div class="popup-btn popup-center" @click="showPopup('left')">left</div>
    <div class="popup-btn popup-center" @click="showPopup('right')">right</div>
    <popup v-model="show" class="popup-wrap" :position="pos" :duration="0.3">
      <p>I am {{ pos }} popup</p>
    </popup>
  </div>
</template>

<script>
import popup from '../../../packages/popup/index'

export default {
  components: {
    popup
  },
  data() {
    return {
      show: false,
      pos: 'center'
    }
  },
  methods: {
    showPopup(pos) {
      this.pos = pos
      this.show = true
    }
  }
}
</script>

<style lang="scss">
.popup-wrap {
  max-width: 100%;
  padding: 40px;
  background-color: #fff;
  &.jr-enter,
  &.jr-leave-active {
    transform: translate(-200%, -200%);
  }
  &.jr-enter-active,
  &.jr-leave-active {
    transition-property: transform;
  }
}
.popup-btn {
  display: block;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #666;
}
</style>
