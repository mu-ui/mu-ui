## mu-dialog 对话框

### 安装方式

```bash
yarn add @mu-ui/mu-dialog
```

### 使用指南

```js
// 插件
import Dialog from '@mu-ui/mu-dialog'

Vue.use(Dialog)

this.$dialog({
  title: 'Title',
  message: 'Message...',
  opacity: 0.5,
  single: true,
  btns: ['No', 'Yes'],
  confirm() {
    console.log('click confirm btn')
  },
  cancel() {
    console.log('click cancel btn')
  }
})

// 组件
import Dialog from '@mu-ui/mu-dialog'

Vue.component('dialog', Dialog.Dialog)

// 使用 v-model 控制显示隐藏
<dialog v-model="show" @confirm="confirm" @cancel="cancel">
  <div class="dialog-main">
    <p>1</p>
    <p>2</p>
    <p>3</p>
  </div>
</dialog>
```

### mu-dialog Options & Props

参数|说明|类型|默认值
---|---|---|---
title|标题|String|'Tip'
message|内容|String|'Are you sure?'
btns|按钮文案自定义，如果只有一个元素，则对话框只有单个按钮|Array|[]
single|是否只展示单个按钮，btns优先级更高，如果为 true 并且 btns 不设置，<br>该设置才生效|Boolean|false
opacity|蒙层透明度|Number|0.1
pre|按钮交换位置，主要就是高亮按钮位置的置换|Boolean|false
confirm|确认按钮事件|Function|null
cancel|取消按钮事件|Function|null
