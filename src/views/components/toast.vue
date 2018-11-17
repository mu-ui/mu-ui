<template>
  <div class="toast">
    <div class="toast-btn" @click="showToast('top')">show toast from top</div>
    <div class="toast-btn" @click="showToast('middle')">show toast from middle</div>
    <div class="toast-btn" @click="showToast('bottom')">show toast from bottom (default)</div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    showToast(pos) {
      this.$toast({
        message: `My position is ${pos}`,
        position: pos,
        duration: pos === 'bottom' ? 4000 : 3000,
        color: pos === 'top' ? '#fff' : '',
        bgColor: pos === 'top' ? 'lightblue' : '',
        customClass: pos === 'middle' ? 'toast-middle' : ''
      })
    }
  }
}
</script>

<style lang="scss">
.toast-middle {
  background-color: #f60;
  color: #fff;
  font-size: 33px;
}
.toast-btn {
  display: block;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #666;
}
</style>
