<template>
  <div class="page">
    <nav class="nav-list">
      <router-link to="/storage" class="btn">storage</router-link>
      <router-link to="/qrcode" class="btn">qrcode</router-link>
      <router-link to="/toast" class="btn">toast</router-link>
      <router-link to="/popup" class="btn">popup</router-link>
      <router-link to="/loading" class="btn">loading</router-link>
    </nav>
    <router-view class="main"></router-view>
  </div>
</template>

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
  padding: 10px;
  box-sizing: border-box;
  .nav-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
  }
  .btn {
    height: 24px;
    line-height: 24px;
    padding: 0 10px;
    text-align: center;
    background-color: lightblue;
    color: #fff;
    font-size: 16px;
    text-decoration: none;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
  }
  .main {
    margin-top: 20px;
    padding-top: 20px;
    box-sizing: border-box;
    border-top: 1px dashed lightcoral;
  }
}
</style>
