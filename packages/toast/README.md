## mu-toast

### Installation

```
yarn add @mu-ui/mu-toast
```

### Usage

```
import Toast from '@mu-ui/mu-toast'

Vue.use(Toast)

// two ways to use
this.$toast('hello')
Vue.toast('world')

// more options
Vue.toast({
  message: 'toast message',
  position: 'bottom', // top|bottom|middle(default)
  duration: 2000, // 3000(default)
  color: '#000', // #fff(default)
  bgColor: 'rgba(255, 255, 255, 0.7)', // rgba(0, 0, 0, 0.7)(default)
  customClass: 'custom-class' // [optional]
})
```
