## mu-flex 基础布局

### 安装方式

```bash
yarn add @mu-ui/mu-flex
```

### 使用指南

```js
import { Flex, FlexItem } from '@mu-ui/mu-flex'

Vue.component('flex', Flex)
Vue.component('flex-item', FlexItem)

<flex
  :inline="false" // true|false(default)
  direction="row" // col|row(default)
  :reverse="false" // true|false(default)
  :wrap="false" // true|false(default)
  justify="between" // [justify-content]start|end|center|around|between(default)
  items="center" // [align-items]start|end|center(default)
  align="center" // [align-content]start|end|center|around|between|stretch(default)
>
  <flex-item
    :flex="1" // Number[optional]
    align="" // [align-self]start|end|center|auto(default)
  >item-1</flex-item>
  <flex-item>item-2</flex-item>
  <flex-item>item3</flex-item>
</flex>
```
