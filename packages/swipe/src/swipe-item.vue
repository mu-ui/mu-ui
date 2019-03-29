<template>
  <div class="mu-swipe-item">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'MuSwipeItem'
}
</script>

<style lang="scss">
.mu-swipe-item {
  flex: 1;
  flex-shrink: 0;
  height: 100%;
}
</style>
