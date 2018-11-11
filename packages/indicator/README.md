## mu-indicator

### Installation

```
yarn add @mu-ui/mu-indicator
```

### Usage

```
import Indicator from '@mu-ui/mu-indicator'

Vue.use(Indicator)

this.$indicator.show('loading...')
this.$indicator.show({
  type: 'rolling'
})
this.$indicator.hide()
```
