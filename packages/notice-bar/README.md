## mu-notice-bar 通知栏

### 安装方式

```bash
yarn add @mu-ui/mu-totice-bar
```

### 使用指南

```js
import NoticeBar from '@mu-ui/mu-totice-bar'

Vue.component('NoticeBar', NoticeBar)

<NoticeBar :text="list"></NoticeBar>
```

### mu-notice-bar Props

参数|说明|类型|默认值
---|---|---|---
text|消息（常量或者可追加，但不能删减）|[String, Array]|''
speed|速度|Number|50
interval|消息间隔|Number|3
delay|消息延迟|Number|1
