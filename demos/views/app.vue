<template>
  <div class="page">
    <nav class="nav-list">
      <router-link to="/storage" class="btn">storage</router-link>
      <router-link to="/qrcode" class="btn">qrcode</router-link>
      <router-link to="/toast" class="btn">toast</router-link>
      <router-link to="/flex" class="btn">flex</router-link>
      <router-link to="/popup" class="btn">popup</router-link>
      <router-link to="/loading" class="btn">loading</router-link>
      <router-link to="/infinite-loading" class="btn">infinite-loading</router-link>
      <router-link to="/indicator" class="btn">indicator</router-link>
      <router-link to="/dialog" class="btn">dialog</router-link>
      <router-link to="/sudoku" class="btn">sudoku</router-link>
      <router-link to="/rotary" class="btn">rotary</router-link>
      <router-link to="/clipboard" class="btn">clipboard</router-link>
      <router-link to="/scroll" class="btn">scroll</router-link>
      <router-link to="/notice-bar" class="btn">notice-bar</router-link>
      <router-link to="/collapse" class="btn">collapse</router-link>
      <router-link to="/swipe" class="btn">swipe</router-link>
      <router-link to="/touch" class="btn">touch</router-link>
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
  }
  .btn {
    height: 24px;
    line-height: 24px;
    padding: 0 10px;
    margin-right: 5px;
    margin-bottom: 10px;
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
