## mu-toast 轻提示

### 安装方式

```bash
yarn add @mu-ui/mu-toast
```

### 使用指南

```js
import Toast from '@mu-ui/mu-toast'

Vue.use(Toast)

// 两种调用方式
this.$toast('toast msg')
Vue.toast('toast msg')

// 自定义选项
this.$toast({
  message: 'toast msg',
  position: 'bottom',
  duration: 3000,
  color: '#fff',
  bgColor: 'rgba(0, 0, 0, 0.7)',
  customClass: 'custom-class'
})
```

### mu-toast Options

参数|说明|类型|默认值
---|---|---|---
message|消息内容|String|''
position|消息位置, 可选值: top \| middle \| bottom|String|bottom
duration|停留时长|Number|3000(ms)
color|字体颜色|String|#fff
bgColor|背景色|String|rgba(0, 0, 0, 0.7)
customClass|自定义样式类(全局声明)|String|''
