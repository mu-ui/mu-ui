## mu-loading

### Installation

```
yarn add @mu-ui/mu-loading
```

### Usage

```
import Loading from '@mu-ui/mu-loading'

Vue.use(Loading)

<mu-loading
  class="loading" // your_class
  type="spinner" // loadingType: spinner|rolling|dual-ring(default)
  :size="50" // >= 10 60(default)
  color="green" #fd0 (default)
>something else</mu-loading>
```
