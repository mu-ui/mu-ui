## mu-touch 滑动手势

### 安装方式

```bash
yarn add @mu-ui/mu-touch
```

### 使用指南

```js
import Touch from '@mu-ui/mu-touch'

Vue.component('Touch', Touch)

<Touch @result="result">
  ...
</Touch>

...
methods: {
  result(res) {
    console.log(res) // top|bottom|left|right
  }
}
```

### mu-touch Props

参数|说明|类型|默认值
---|---|---|---
threshold|滑动生效的最小距离|Number|50
restraint|滑动时另一个方向的最大距离|Number|80

### mu-touch Events

名称|说明
---|---
result|返回触发方向的结果
