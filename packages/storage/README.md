## mu-storage

a simple storage plugin for vue 2.x to use localStorage & sessionStorage.

### Installation

```bash
yarn add @mu-ui/mu-storage
```

### Usage

```js
import Storage from '@mu-ui/mu-storage'

Vue.use(Storage)
```

### Example

```js
// localStorage
this.$storage.set('name', 'JR')
Vue.storage.get('name')

// sessionStorage
this.$session.set('name', 'JR')
Vue.session.get('name')
```

### Api

#### set(key, val)

set storage with key and val

#### get(key)

get storage with key

#### remove(key)

remove storage with key

#### has(key)

determine storage has the key

#### clearAll()

clear all storages

#### forEach(callback)

forEach the storages and call the callback function with each storage

#### filter(callback(key))

create a array with all storages that pass the test implemented by the provided function. If no storages pass the test, an empty array will be returned. If don't provide a callback function, a array with all storages will be returned.

**callback**

Function is a predicate, to test each storage of the storages. Return true to keep the storage, false otherwise. It accepts one arguments:

**key**

key of the current storage

```js
const arr = this.$storage.filter(key => {
  return key === 'name'
})
console.log(arr) // [{key: 'name', val: 'JR'}]
```
