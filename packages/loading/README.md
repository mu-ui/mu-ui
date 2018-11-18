## mu-loading

loading vue component for vue 2.x

### Installation

```bash
yarn add @mu-ui/mu-loading
```

### Usage

```js
import Loading from '@mu-ui/mu-loading'

Vue.component('loading', Loading)

<loading type="dual-ring" :width="6" :size="40">
  custom width: 6
</loading>
<loading type="dual-ring" :width="6" :size="40">
  <div slot="icon" class="loading-dot"></div>
  custom icon
</loading>
```

### Options

#### type

Type: String
Default: ring

loading icon. It has two types(ring|dual-ring) built-in.

#### color

Type: String
Default: #272639

loading icon color

#### size

Type: Number
Default: 30

loading icon width & height

#### width

Type: Number
Default: 3

loading icon border width
