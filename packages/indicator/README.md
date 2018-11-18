## mu-indicator

indicator plugin for vue 2.x

### Installation

```bash
yarn add @mu-ui/mu-indicator
```

### Usage

```js
import Indicator from '@mu-ui/mu-indicator'

Vue.use(Indicator)

this.$indicator.show('hello mu-ui')
this.$indicator.show({
  type: 'dual-ring',
  tip: 'hello mu-ui',
  maskColor: 'rgba(0, 0, 0, 0.1)'
})
this.$indicator.hide()
```

### Options

#### tip

Type: String

indicator tip content

#### type

Type: String
Default: ring

loading icon. It has two types(ring|dual-ring) built-in.

#### color

Type: String
Default: #fff

loading icon color & tip color

#### bgColor

Type: String
Default: rgba(0, 0, 0, 0.7)

indicator background color

#### maskColor

Type: String
Default: transparent

mask background color
