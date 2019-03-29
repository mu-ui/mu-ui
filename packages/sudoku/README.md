## mu-sudoku 九宫格

### 安装方式

```bash
yarn add @mu-ui/mu-sudoku
```

### 使用指南

```js
import Sudoku from '@mu-ui/mu-sudoku'

Vue.component('Sudoku', Sudoku)

<div v-if="gifts.length > 0" class="sudoku-main">
  <Sudoku @handle="draw" @finish="showResult">
    <template
      v-for="(item, index) in gifts"
      :slot="`item-${index}`"
      slot-scope="props">
      <div
        :key="item.id"
        class="sudoku-item"
        // props.active会自动处理选中类，根据业务自己定制 .sudoku-active 选中样式
        :class="{'sudoku-active': props.active}">
        // 自己的业务
        <div
          class="sudoku-gift"
          :style="{
            'background-image': `url(${item.giftImg})`
          }"></div>
      </div>
    </template>
    // 抽奖按钮UI处理
    <div
      slot="handler"
      class="sudoku-item sudoku-click-btn">
      <p class="sudoku-text">抽奖次数: {{ userinfo.remainCount }}</p>
    </div>
  </Sudoku>
</div>

...
methods: {
  async draw ($result) {
    const userinfo = this.userinfo
    if (userinfo.remainCount === 0) {
      this.showResultPop('您已经用完抽奖次数')
      // 因为点击抽奖按钮会锁住状态不让用户频繁点击触发，
      // 当抽奖次数为0或者接口异常时，需要手动解锁并释放抽奖状态
      $result.free()
      return
    }
    const res = await $api.draw()
    if (res.result === 0) {
      userinfo.remainCount -= 1
      const id = res.data.awardId
      if (id >= 0) {
        const gifts = this.gifts
        for (let i = 0, len = gifts.length; i < len; i++) {
          if (gifts[i].id === id) {
            this.drawId = i
            // 通知设置中奖位置
            $result.set(i)
            break
          }
        }
      } else {
        this.$toast('奖品已经抽完了')
      }
    }
  },
  showResult () {
    const reward = this.gifts[this.drawId]
    let text = ''
    if (reward.type === -1) {
      text = '很遗憾，刚刚您什么也没抽到，祝您下次中奖！'
    } else {
      text = `恭喜您抽中${reward.giftName}！`
    }
    this.showResultPop(text)
  },
}
```

### mu-sudoku Props

参数|说明|类型|默认值
---|---|---|---
turnsCount|抽奖转动圈数|Number|3
initialRate|初始速度, 可选值范围: [50, 200]|Number|100
maxLimitRate|最慢转动速度, 可选值范围: [500, 1000]|Number|800

### mu-sudoku Slots

名称|说明
---|---
item-{number:[1-8]}|九宫格中的奖品区位置, 并使用作用域插槽获取当前选中位置
handler|抽奖按钮

### mu-sudoku Events

名称|说明
---|---
handle|抽奖逻辑, 并通过参数$result操控九宫格
finish|抽奖转盘结束后触发,用于提供处理中奖弹窗等逻辑的时机
