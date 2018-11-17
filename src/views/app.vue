<template>
  <div class="page">
    <router-link to="/storage" class="btn">storage</router-link>
    <router-view class="main"></router-view>
</div></template>

<script>
export default {
  data() {
    return {
      name: 'mu-ui'
    }
  }
}
</script>

<style lang="scss">
.page {
  .btn {
    display: inline-block;
    height: 50px;
    line-height: 50px;
    margin: 10px;
    padding: 0 10px;
    text-align: center;
    background-color: lightblue;
    color: #fff;
    font-size: 28px;
    text-decoration: none;
  }
  .main {
    margin-top: 20px;
    padding: 20px;
    box-sizing: border-box;
    border-top: 1px dashed lightcoral;
  }
}
</style>
