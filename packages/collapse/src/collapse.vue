<template>
  <div class="mu-collapse">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'MuCollapse',
  props: {
    accordion: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeOther(name) {
      const childList = this.$children
      for (let i = 0, len = childList.length; i < len; i++) {
        if (childList[i].name !== name && childList[i].show) {
          childList[i].show = false
          break
        }
      }
    }
  }
}
</script>

<style lang="scss">
.mu-collapse {
  width: 100%;
}
</style>
