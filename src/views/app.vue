<template>
  <div class="page">
    <h1>hello, {{ name }}!</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'world'
    }
  }
}
</script>

<style lang="scss">
.page {
  h1 {
    color: red;
    font-size: 30px;
    text-align: center;
  }
}
</style>
