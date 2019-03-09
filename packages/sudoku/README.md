## mu-sudoku

sudoku vue component for vue 2.x

### Installation

```bash
yarn add @mu-ui/mu-sudoku
```

### Usage

```js
import Sudoku from '@mu-ui/mu-sudoku'

Vue.component('sudoku', Sudoku)

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

...
methods: {
  draw($result) {
    setTimeout(() => {
      this.lucky = Math.floor(Math.random() * 8)
      $result.set(this.lucky) // [0,7]
      // $result.free() // Call this method to release free state of sudoku when error
    }, 500)
  },
  showResult() {
    console.log(`恭喜抽中: ${this.gifts[this.lucky].name}`)
  }
}

```

### Options

#### turnsCount

Type: Number
Default: 3

turns count for per game by default, then it will find the position of the result you setted

#### initialRate

Type: Number
Default: 100
Range: [50, 200]

initial rate for turns

#### slowestRate

Type: Number
Default: 800
Range: [500, 1000]

slowest rate for turns
