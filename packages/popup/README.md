## mu-popup

### Installation

```
yarn add @mu-ui/mu-popup
```

### Usage

```
import Popup from '@mu-ui/mu-popup'

Vue.use(Popup)

<mu-popup
  class="your-class" // 业务class
  v-model="showPopup" // 控制显示隐藏
  transition="slide" // 过渡效果 [fade|slide] -- fade只用于 position: center
  position="top" // top|bottom|left|right|center(default)
  :modal="true" // 是否需要蒙层 true(default)
  :clickable="true" // 蒙层是否点击关闭popup true(default)
  :opacity="0.1" // [0-1] 0.5(default)
  :duration="0.5" // [0, ∞) 0.5(default)
>
</mu-popup>
```
