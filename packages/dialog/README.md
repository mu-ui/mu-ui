## mu-dialog

dialog component & plugin for vue 2.x

### Installation

```bash
yarn add @mu-ui/mu-dialog
```

### Usage

```js
// plugin
import Dialog from '@mu-ui/mu-dialog'

Vue.use(Dialog)

this.$dialog({
  title: 'Title',
  message: 'Message...',
  opacity: 0.5,
  single: true,
  highlight: '#fd0',
  btns: ['No', 'Yes'],
  confirm() {
    console.log('click confirm btn')
  },
  cancel() {
    console.log('click cancel btn')
  }
})

or

// component
import Dialog from '@mu-ui/mu-dialog'

Vue.component('mu-dialog', Dialog.Dialog)

// use v-model to control whether or not visible
<mu-dialog v-model="show" @confirm="confirm" @cancel="cancel">
  <div class="dialog-main">
    <p>1</p>
    <p>2</p>
    <p>3</p>
  </div>
</mu-dialog>
```

### Options

#### title

Type: String
Default: 'Tip'

dialog title

#### message

Type: String
Default: 'Are you sure?'

dialog message

#### btns

Type: Array
Default: []

custom button text. if you pass only one element, then a single button which emit confirm event will be displayed. And the priority is higher than the single option

#### single

Type: Boolean
Default: false

if true, only single button which emit confirm event will be displayed.

#### opacity

Type: Number
Default: 0.1

opacity of the mask's backgroundColor

#### highlight

Type: String
Default: #272639

text color of the confirm btn

#### pre

Type: Boolean
Default: false

if true, the confirm btn will be placed in the first place
