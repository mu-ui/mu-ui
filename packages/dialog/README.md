## mu-dialog

### Installation

```
yarn add @mu-ui/mu-dialog
```

### Usage

```
import Dialog from '@mu-ui/mu-dialog'

Vue.use(Dialog)

this.$dialog({
  message: 'Are you sure?',
  title: 'tip',
  opacity: '0.3',
  pre: true,
  btns: ['cancel', 'sure']
  cancel() {
    console.log('cancel')
  },
  sure() {
    console.log('sure')
  }
})

<mu-dialog v-model="show" title="hello" :single="true" :pre="true" :btns="btns" @sure="sure" @cancel="cancel"></mu-dialog>
```
