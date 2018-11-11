## mu-qrcode

### Installation

```
yarn add @mu-ui/mu-qrcode
```

### Usage

```
import Qrcode from '@mu-ui/mu-qrcode'

Vue.use(Qrcode)

<mu-qrcode
  val="http://www.google.com" // 必填，非空
  :size="128" // 默认128
  type="canvas" // img|canvas(default)
  :margin="4" // 留白，默认4像素
  dark="#f60" // 前景色，默认#000 必须#xxx 格式
  light="#f60" // 背景色，默认#fff 必须#xxx 格式
/>
```
