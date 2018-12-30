<template>
  <div class="storage">
    <h4>current localStorage:</h4>
    <ul>
      <li v-for="item in storages" :key="item.key">{{ item.key }} : {{ item.val }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      storages: []
    }
  },
  created() {
    this.storages = this.$storage.filter()
  }
}
</script>

<style lang="scss">
.storage {
  font-size: 14px;
  color: #333;
}
</style>
