## mu-qrcode 二维码

### 安装方式

```bash
yarn add @mu-ui/mu-qrcode
```

### 使用指南

```js
import Qrcode from '@mu-ui/mu-qrcode'

Vue.component('Qrcode', Qrcode)

<Qrcode val="https://github.com/mu-ui/mu-ui/"></Qrcode>

// 如果H5需要自适应，可使用type=img
<Qrcode val="https://github.com/mu-ui/mu-ui/" type="img"></Qrcode>
```

### mu-qrcode Props

参数|说明|类型|默认值
---|---|---|---
val|url地址|String|''
size|二维码的尺寸|Number|128(px)
margin|二维码的外边距|Number|4(px)
type|二维码生成类型,可选值: canvas \| img|String|canvas
dark|前景色（既是深色块），取值需是RGBA|String|#000
light|背景色（既是浅色块），取值需是RGBA|String|#fff
