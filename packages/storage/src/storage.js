function _serialize(val) {
  return JSON.stringify(val)
}

function _deserialize(val) {
  try {
    return JSON.parse(val)
  } catch (e) {
    return val
  }
}

const createApi = storage => ({
  set(key, val) {
    if (val === undefined) return
    storage.setItem(key, _serialize(val))
  },
  get(key) {
    return _deserialize(storage.getItem(key))
  },
  remove(key) {
    storage.removeItem(key)
  },
  clearAll() {
    storage.clear()
  },
  has(key) {
    return this.get(key) !== undefined
  },
  forEach(cb) {
    if (cb && typeof cb === 'function') {
      for (let i = 0; i < storage.length; i += 1) {
        const key = storage.key(i)
        cb(key, this.get(key))
      }
    } else {
      console.warn(
        'Warn from @mu-ui/mu-storage: forEach function need a callback param'
      )
    }
  },
  filter(cb) {
    const res = []
    const isFun = typeof cb === 'function'
    this.forEach((key, val) => {
      if (isFun) {
        cb(key) && res.push({ key, val })
      } else {
        res.push({ key, val })
      }
    })
    return res
  }
})

const Storage = {
  isSupport: !!window.localStorage,
  local: createApi(window.localStorage),
  session: createApi(window.sessionStorage)
}

// Compatibility test
try {
  const key = 'mui_storage_key'
  const val = 'mui_storage_val'
  Storage.local.set(key, val)
  Storage.isSupport = Storage.local.get(key) === val
  Storage.local.remove(key)
} catch (e) {
  Storage.isSupport = false
}

export default Storage
