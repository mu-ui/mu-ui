<template>
  <div class="notice-bar-container">
    <NoticeBar :text="list" from="start"></NoticeBar>
  </div>
</template>

<script>
import NoticeBar from '../../../packages/notice-bar/index'

export default {
  components: {
    NoticeBar
  },
  data() {
    return {
      list: [
        '我是一条消息我是一条消息我是一条消息我是一条消息我是',
        '我是另一条消息1',
        '我是另一条消息2'
      ]
    }
  }
}
</script>

<style lang="scss">
.notice-bar-container {
  width: 100%;
  height: 30px;
  font-size: 14px;
  color: lightcoral;
  padding: 0 !important;
  background: #fd0;
}
</style>
