## mu-collapse 折叠面板

### 安装方式

```bash
yarn add @mu-ui/mu-collapse
```

### 使用指南

```js
import { Collapse, CollapseItem } from '@mu-ui/mu-collapse'

Vue.component('Collapse', Collapse)
Vue.component('CollapseItem', CollapseItem)

<Collapse :accordion="true">
  <CollapseItem name="1" title="来来来">
    <p v-for="n in 5" :key="n">{{ n }}</p>
  </CollapseItem>
  <CollapseItem name="2" title="去去去">
    <p v-for="n in 10" :key="n">{{ n }}</p>
  </CollapseItem>
  <CollapseItem name="3" title="来去来">
    <p v-for="n in 15" :key="n">{{ n }}</p>
  </CollapseItem>
</Collapse>
```

### mu-collapse Props

参数|说明|类型|默认值
---|---|---|---
accordion|是否手风琴效果|Boolean|false

### mu-collapse-item Props

参数|说明|类型|默认值
---|---|---|---
name|唯一标识（必填）|[String, Number]|-
title|标题|String|标题
titleColor|标题字体颜色|String|#2c2c2c
arrowColor|角标颜色|String|#8a8a8a
arrowSize|角标大小|Number|16
borderColor|边框线条颜色|String|#ddd

### mu-collapse-item Slots

名称|说明
---|---
header|自定义头部
