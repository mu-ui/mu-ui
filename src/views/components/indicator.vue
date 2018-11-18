<template>
  <div class="indicator">
    <div class="indicator-btn" @click="show">show indicator</div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    show() {
      this.$indicator.show('jr')
      setTimeout(() => {
        this.$indicator.hide()
      }, 3000)
    }
  }
}
</script>
