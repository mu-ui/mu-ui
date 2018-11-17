## mu-popup

popup vue component for vue 2.x

### Installation

```bash
yarn add @mu-ui/mu-popup
```

### Usage

```js
import Popup from '@mu-ui/mu-popup'

Vue.component('popup', Popup)

<popup
  v-model="show" // use v-model to control whether or not visible
  transition="slide"
  position="top"
  :modal="true"
  :clickable="true"
  :opacity="0.1"
  :duration="0.5"
>
  <p>I am a popup</p>
</popup>
```

### Options

#### transition

Type: String
Default: fade

custom transition effect. It has two transitions(fade|slide) built-in.

#### position

Type: String
Default: center // ['top', 'bottom', 'left', 'right', 'center']

position of popup

#### modal

Type: Boolean
Default: true

Whether or not need a modal

#### clickable

Type: Boolean
Default: true

Whether or not click the modal to hide popup

#### opacity

Type: Number
Default:0.5

opacity of the modal

#### duration

Type: Number
Default:0.5

transition-duration
