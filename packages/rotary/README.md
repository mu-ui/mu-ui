## mu-rotary 转盘

### 安装方式

```bash
yarn add @mu-ui/mu-rotary
```

### 使用指南

```js
import Rotary from '@mu-ui/mu-rotary'

Vue.component('Rotary', Rotary)

<Rotary class="rotary-main" @handle="draw" @finish="showResult">
  // 这里就放需要转动的dom
  <div slot="canvas" class="rotary-canvas">
    <div class="rotary-lamp"></div>
  </div>
  // 这里是按钮
  <div slot="handler" class="rotary-handler"></div>
</Rotary>

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

### mu-rotary Props

参数|说明|类型|默认值
---|---|---|---
turnsCount|抽奖转动圈数|Number|3
duration|转动时间|Number|6(s)
number|奖品区数量|Number|8

### mu-rotary Slots

名称|说明
---|---
canvas|转盘本身
handler|抽奖按钮

### mu-rotary Events

名称|说明
---|---
handle|抽奖逻辑, 并通过参数$result操控转盘
finish|抽奖转盘结束后触发,用于提供处理中奖弹窗等逻辑的时机
