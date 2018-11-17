## mu-toast

toast plugin for vue 2.x

### Installation

```bash
yarn add @mu-ui/mu-toast
```

### Usage

```js
import Toast from '@mu-ui/mu-toast'

Vue.use(Toast)

// two ways to use
this.$toast('hello')
Vue.toast('world')

// more options
this.$toast({
  message: 'toast message',
  position: 'bottom', // top|middle|bottom(default)
  duration: 3000, // 3000(default)
  color: '#fff', // #fff(default)
  bgColor: 'rgba(0, 0, 0, 0.7)', // rgba(0, 0, 0, 0.7)(default)
  customClass: 'custom-class' // [optional]
})
```

### Options

#### message

Type: String|Required

toast message

#### position

Type: String
Default: bottom

the position of toast instance, one of top|middle|bottom

#### duration

Type: Number
Default: 3000

stay time

#### color

Type: String
Default: #fff

text color

#### bgColor

Type: String
Default: rgba(0, 0, 0, 0.7)

backgroundColor

#### customClass

Type: String
Default: ''

custom className to overwrite default style. pay attention to the CSS class scope
