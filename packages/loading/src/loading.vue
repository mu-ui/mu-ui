<template>
  <div class="mu-loading">
    <component
      :is="type"
      :width="size"
      :height="size"
      :color="color"
    />
    <slot />
  </div>
</template>

<script>
import Spinner from './components/spinner.vue'
import dualRing from './components/dual-ring.vue'
import Rolling from './components/rolling.vue'

export default {
  /* eslint-disable */
  components: {
    Spinner,
    dualRing,
    Rolling
  },
  /* eslint-enable */
  props: {
    type: {
      type: String,
      default: 'dual-ring',
      validator(value) {
        return ~['dual-ring', 'spinner', 'rolling'].indexOf(value)
      }
    },
    color: {
      type: String,
      default: '#fd0',
      validator(value) {
        return value !== ''
      }
    },
    size: {
      type: Number,
      default: 60,
      validator(value) {
        return value >= 10
      }
    }
  }
}
</script>

<style lang="scss">
.mu-loading {
  text-align: center;
  svg {
    display: block;
    margin: 0 auto;
  }
}
</style>
