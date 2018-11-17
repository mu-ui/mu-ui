## mu-qrcode

qrcode vue component for vue 2.x by using [node-qrcode](https://github.com/soldair/node-qrcode)

### Installation

```bash
yarn add @mu-ui/mu-qrcode
```

### Usage

```js
import Qrcode from '@mu-ui/mu-qrcode'

Vue.component('qrcode', Qrcode)

<qrcode val="https://github.com/mu-ui/mu-ui/"></qrcode>
```

### Options

#### val

Type: String

the url address you want to generate a qrcode

#### size

Type: Number
Default: 128

size of the qrcode

#### margin

Type: Number
Default: 2

Define how much wide the quiet zone should be

#### type

Type: String
Default: canvas

canvas or img

#### dark

Type: String
Default: #000

Color of dark module. Value must be in hex format (RGBA).

#### light

Type: String
Default: #fff

Color of light module. Value must be in hex format (RGBA).
