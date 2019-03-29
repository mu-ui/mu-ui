## mu-popup 弹出层

### 安装方式

```bash
yarn add @mu-ui/mu-popup
```

### 使用指南

```js
import Popup from '@mu-ui/mu-popup'

Vue.component('Popup', Popup)

<Popup
  :show.sync="show" // 这里使用.sync修饰符，以达到组件内部可控制显示隐藏
  transition="slide"
  position="top"
  :modal="true"
  :clickable="true"
  :opacity="0.1"
  :duration="0.5"
>
  <p>I am a popup</p>
</Popup>
```

### mu-popup Props

参数|说明|类型|默认值
---|---|---|---
transition|选择过渡效果，内置 fade | slide，可自定义自己想要的过渡效果|String|fade
position|具体弹出框的位置['top', 'bottom', 'left', 'right', 'center']|String|center
modal|是否需要蒙层|Boolean|true
clickable|蒙层是否可以点击，默认可以点击，并且将会关闭弹出层|Boolean|true
opacity|蒙层的透明度|Number|0.5
duration|等价于 transition-duration|Number|0.5
touchmove|蒙层是否可以滑动|Boolean|true
clickFn|点击蒙层后，可自定义方法。该方法在弹出层关闭的同时触发。|Function|null
