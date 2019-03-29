## mu-loading 加载中

### 安装方式

```bash
yarn add @mu-ui/mu-loading
```

### 使用指南

```js
import Loading from '@mu-ui/mu-loading'

Vue.component('Loading', Loading)

<Loading :width="6" :size="40">
  custom width: 6
</Loading>

<Loading type="dual-ring" :width="6" :size="40">
  <div slot="icon" class="loading-dot"></div>
  custom icon
</Loading>
```

### mu-loading Props

参数|说明|类型|默认值
---|---|---|---
type|loading 样式. 默认可选 ring 或者 dual-ring，如果有其他类型，可以自己通过slot自定义|String|'ring'
color|loading 图标颜色|String|'#272639'
size|图标的尺寸|Number|30
width|图标的边框宽度|Number|3

### mu-loading Slots

名称|说明
---|---
icon|loading icon
