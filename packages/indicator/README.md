## mu-indicator 指示器

### 安装方式

```bash
yarn add @mu-ui/mu-indicator
```

### 使用指南

```js
import Indicator from '@mu-ui/mu-indicator'

Vue.use(Indicator)

// 显示
this.$indicator.show('hello')
this.$indicator.show({
  type: 'dual-ring',
  tip: 'hello',
  maskColor: 'rgba(0, 0, 0, 0.1)'
})
// 隐藏
this.$indicator.hide()
```

### mu-dialog Options

参数|说明|类型|默认值
---|---|---|---
tip|提示文案|String|'Loading...'
type|loading 图标，内部使用loading组件，故只能选择 ring | dual-ring|String|ring
color|指示器 图标和字体色|String|#fff
bgColor|指示器背景色|String|rgba(0, 0, 0, 0.7)
maskColor|蒙层颜色|String|transparent
