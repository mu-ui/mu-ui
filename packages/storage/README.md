## mu-storage 本地存储

### 安装方式

```bash
yarn add @mu-ui/mu-storage
```

### 使用指南

```js
import Storage from '@mu-ui/mu-storage'

Vue.use(Storage)

// localStorage
this.$storage.set('name', 'JR')
Vue.storage.get('name')

// sessionStorage
this.$session.set('name', 'JR')
Vue.session.get('name')
```

### mu-storage API

方法|说明|返回类型
---|---|---
set(key, val)|设置存储|-
get(key)|获取指定存储|String
remove(key)|移除指定存储|-
has(key)|判断当前存储是否有指定key|Boolean
clearAll()|清除所有存储|-
forEach(callback)|遍历所有存储并逐一作为参数调用callback|-
filter(callback(key))|过滤存储，不传callback获取所有存储|Array
