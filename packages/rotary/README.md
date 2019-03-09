## mu-rotary

rotary vue component for vue 2.x

### Installation

```bash
yarn add @mu-ui/mu-rotary
```

### Usage

```js
import Rotary from '@mu-ui/mu-rotary'

Vue.component('rotary', Rotary)

<rotary class="rotary-main" @handle="draw" @finish="showResult">
  <div slot="canvas" class="rotary-canvas">
    <div class="rotary-lamp"></div>
  </div>
  <div slot="handler" class="rotary-handler"></div>
</rotary>

...
methods: {
  draw($result) {
    setTimeout(() => {
      this.lucky = Math.floor(Math.random() * 8)
      $result.set(this.lucky) // [0,7]
      // $result.free() // Call this method to release free state of rotary when error
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

#### duration

Type: Number
Default: 6

duration time for per game

#### number

Type: Number
Default: 8

the number of prizes
