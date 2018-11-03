<template>
  <div class="rule">
    <ul class="rule-list">
      <li>
        <i>121</i>
        <span>消耗1张抽奖券可抽奖1次，每次抽奖必中；</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    close() {
      const abc = Math.random()
      console.log(abc)
    }
  }
}
</script>

<style lang="scss">
.rule {
  &-list {
    position: relative;
    top: 40px;
    width: 550px;
    height: 620px;
    margin: 0 auto;
    padding: 0 10px;
    box-sizing: border-box;
    overflow-y: auto;
    li {
      display: flex;
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
      i {
        flex: 0 0 16px;
        display: block;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        margin-top: 10px;
        background-color: #f9563a;
      }
      span {
        flex: 1;
        padding-left: 20px;
        font-size: 24px;
        color: #242424;
      }
    }
  }
}
</style>
