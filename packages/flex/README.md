## mu-flex

### Installation

```
yarn add @mu-ui/mu-flex
```

### Usage

```
import Flex from '@mu-ui/mu-flex'

Vue.use(Flex)

<mu-flex
  class="your-class" // 业务class
  :inline="false" // true|false(default)
  direction="row" // col|row(default)
  :reverse="false" // true|false(default)
  :wrap="false" // true|false(default)
  justify="between" // [justify-content]start|end|center|around|between(default)
  items="center" // [align-items]start|end|center(default)
  align="center" // [align-content]start|end|center|around|between|stretch(default)
>
  <mu-flex-item
    :flex="1" // Number[optional]
    align="" // [align-self]start|end|center|auto(default)
  >item-1</mu-flex-item>
  <mu-flex-item>item-2</mu-flex-item>
  <mu-flex-item>item3</mu-flex-item>
</mu-flex>
```
