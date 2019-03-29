## mu-clipboard 剪贴板

### 安装方式

```bash
yarn add @mu-ui/mu-clipboard
```

### 使用指南

```js
// 插件
import Clipboard from '@mu-ui/mu-clipboard'

Vue.use(Clipboard)

...
methods: {
  async copy() {
    const res = await this.$copyText('复制文案内容')
    if (res.result === 'success') {
      // 成功
    } else if (res.result === 'empty') {
      // 内容为空
    } else if (res.result === 'error') {
      // 失败
    }
  }
}
```
