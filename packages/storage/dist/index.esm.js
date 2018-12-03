function _serialize(e) {
  return JSON.stringify(e)
}
function _deserialize(e) {
  try {
    return JSON.parse(e)
  } catch (r) {
    return e
  }
}
var createApi = function(e) {
  return {
    set: function(r, t) {
      void 0 !== t && e.setItem(r, _serialize(t))
    },
    get: function(r) {
      return _deserialize(e.getItem(r))
    },
    remove: function(r) {
      e.removeItem(r)
    },
    clearAll: function() {
      e.clear()
    },
    has: function(e) {
      return void 0 !== this.get(e)
    },
    forEach: function(r) {
      if (r && typeof r === 'function')
        for (var t = 0; t < e.length; t += 1) {
          var o = e.key(t)
          r(o, this.get(o))
        }
      else
        console.warn(
          'Warn from @mu-ui/mu-storage: forEach function need a callback param'
        )
    },
    filter: function(e) {
      var r = []

      var t = typeof e === 'function'
      return (
        this.forEach(function(o, a) {
          t ? e(o) && r.push({ key: o, val: a }) : r.push({ key: o, val: a })
        }),
        r
      )
    }
  }
}

var Storage = {
  isSupport: !!window.localStorage,
  local: createApi(window.localStorage),
  session: createApi(window.sessionStorage)
}
try {
  var key = 'mui_storage_key'

  var val = 'mui_storage_val'
  Storage.local.set(key, val),
    (Storage.isSupport = Storage.local.get(key) === val),
    Storage.local.remove(key)
} catch (e) {
  Storage.isSupport = !1
}
var install = function(e) {
  Storage.isSupport
    ? ((e.storage = e.prototype.$storage = Storage.local),
      (e.session = e.prototype.$session = Storage.session))
    : console.error(
        "Error from @mu-ui/mu-storage: Sorry, The current browser doesn't support Web Storage."
      )
}
export default install
