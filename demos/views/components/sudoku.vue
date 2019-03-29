<template>
  <div class="sudoku">
    <div class="sudoku-main">
      <sudoku @handle="draw" @finish="showResult">
        <template
          v-for="(item, index) in gifts"
          :slot="`item-${index}`"
          slot-scope="props">
          <div
            :key="item.id"
            class="sudoku-item"
            :class="{'sudoku-active': props.active}">
            {{ item.name }}
          </div>
        </template>
        <div slot="handler" class="sudoku-item sudoku-click-btn">
          <p class="sudoku-text">抽奖</p>
        </div>
      </sudoku>
    </div>
  </div>
</template>

<script>
import sudoku from '../../../packages/sudoku/index'

export default {
  components: {
    sudoku
  },
  data() {
    return {
      lucky: -1,
      gifts: [
        { id: 1, name: '手机' },
        { id: 2, name: '电脑' },
        { id: 3, name: '手环' },
        { id: 4, name: '笔记本' },
        { id: 5, name: '耳机' },
        { id: 6, name: '篮球' },
        { id: 7, name: '门票' },
        { id: 8, name: '1000元' }
      ]
    }
  },
  methods: {
    draw($result) {
      setTimeout(() => {
        this.lucky = Math.floor(Math.random() * 8)
        $result.set(this.lucky)
      }, 500)
    },
    showResult() {
      console.log(`恭喜抽中: ${this.gifts[this.lucky].name}`)
    }
  }
}
</script>

<style lang="scss">
.sudoku {
  &-main {
    width: 300px;
    height: 300px;
    margin: 0 auto;
  }
  &-item {
    width: 80px;
    height: 80px;
    line-height: 80px;
    border-radius: 5px;
    text-align: center;
    background-color: #add8e6;
  }
  &-active {
    background-color: #f08080;
  }
  &-click-btn {
    background-color: burlywood;
  }
}
</style>
