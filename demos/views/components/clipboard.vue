<template>
  <div class="clipboard">
    <div class="clipboard-btn" @click="copy">{{ text }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '点击我复制这段文案'
    }
  },
  methods: {
    async copy() {
      const res = await this.$copyText(this.text)
      console.log('复制文案结果', res)
      if (res.result === 'success') {
        this.$toast('复制成功~')
      }
    }
  }
}
</script>

<style lang="scss">
.clipboard-btn {
  display: inline-block;
  padding: 5px;
  margin-top: 20px;
  background-color: lightcoral;
  cursor: pointer;
}
</style>
