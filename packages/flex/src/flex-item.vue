<template>
  <div class="mu-flex-item" :class="customAlign" :style="customStyle">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'MuFlexItem',
  props: {
    flex: {
      type: Number,
      default: 0
    },
    align: {
      type: String,
      default: 'auto',
      validator(value) {
        return ~['start', 'end', 'center', 'auto'].indexOf(value)
      }
    }
  },
  computed: {
    customAlign() {
      let customClass = []
      if (this.align !== 'auto') {
        customClass.push(`mu-flex-item-${this.align}`)
      }
      return customClass
    },
    customStyle() {
      let styleObj = {}
      if (this.flex > 0) {
        styleObj['-webkit-box-flex'] = this.flex
        styleObj['flex'] = this.flex
      }
      return styleObj
    }
  }
}
</script>

<style lang="scss">
.mu-flex-item {
  &-start {
    align-self: flex-start;
  }
  &-end {
    align-self: flex-end;
  }
  &-center {
    align-self: center;
  }
}
</style>
