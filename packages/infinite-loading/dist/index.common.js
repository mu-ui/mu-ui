'use strict'
var commonjsGlobal =
  typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined'
      ? global
      : typeof self !== 'undefined'
        ? self
        : {}
function createCommonjsModule(e, t) {
  return e((t = { exports: {} }), t.exports), t.exports
}
var _typeof_1$$1 = createCommonjsModule(function(e) {
  function t(e) {
    return (t =
      typeof Symbol === 'function' && _typeof_1$$1(Symbol.iterator) === 'symbol'
        ? function(e) {
            return _typeof_1$$1(e)
          }
        : function(e) {
            return e &&
              typeof Symbol === 'function' &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? 'symbol'
              : _typeof_1$$1(e)
          })(e)
  }
  function n(i) {
    return (
      typeof Symbol === 'function' && t(Symbol.iterator) === 'symbol'
        ? (e.exports = n = function(e) {
            return t(e)
          })
        : (e.exports = n = function(e) {
            return e &&
              typeof Symbol === 'function' &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? 'symbol'
              : t(e)
          }),
      n(i)
    )
  }
  e.exports = n
})
function isObject(e) {
  var t = _typeof_1$$1(e)
  return e != null && (t == 'object' || t == 'function')
}
var isObject_1 = isObject

var freeGlobal =
  _typeof_1$$1(commonjsGlobal) == 'object' &&
  commonjsGlobal &&
  commonjsGlobal.Object === Object &&
  commonjsGlobal

var _freeGlobal = freeGlobal

var freeSelf =
  (typeof self === 'undefined' ? 'undefined' : _typeof_1$$1(self)) ==
    'object' &&
  self &&
  self.Object === Object &&
  self

var root = _freeGlobal || freeSelf || Function('return this')()

var _root = root

var now = function() {
  return _root.Date.now()
}

var now_1 = now

var _Symbol2 = _root.Symbol

var _Symbol = _Symbol2

var objectProto = Object.prototype

var hasOwnProperty = objectProto.hasOwnProperty

var nativeObjectToString = objectProto.toString

var symToStringTag = _Symbol ? _Symbol.toStringTag : void 0
function getRawTag(e) {
  var t = hasOwnProperty.call(e, symToStringTag)

  var n = e[symToStringTag]
  try {
    e[symToStringTag] = void 0
  } catch (e) {}
  var i = nativeObjectToString.call(e)
  return t ? (e[symToStringTag] = n) : delete e[symToStringTag], i
}
var _getRawTag = getRawTag

var objectProto$1 = Object.prototype

var nativeObjectToString$1 = objectProto$1.toString
function objectToString(e) {
  return nativeObjectToString$1.call(e)
}
var _objectToString = objectToString

var nullTag = '[object Null]'

var undefinedTag = '[object Undefined]'

var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : void 0
function baseGetTag(e) {
  return e == null
    ? void 0 === e
      ? undefinedTag
      : nullTag
    : symToStringTag$1 && symToStringTag$1 in Object(e)
      ? _getRawTag(e)
      : _objectToString(e)
}
var _baseGetTag = baseGetTag
function isObjectLike(e) {
  return e != null && _typeof_1$$1(e) == 'object'
}
var isObjectLike_1 = isObjectLike

var symbolTag = '[object Symbol]'
function isSymbol(e) {
  return (
    _typeof_1$$1(e) == 'symbol' ||
    (isObjectLike_1(e) && _baseGetTag(e) == symbolTag)
  )
}
var isSymbol_1 = isSymbol

var NAN = NaN

var reTrim = /^\s+|\s+$/g

var reIsBadHex = /^[-+]0x[0-9a-f]+$/i

var reIsBinary = /^0b[01]+$/i

var reIsOctal = /^0o[0-7]+$/i

var freeParseInt = parseInt
function toNumber(e) {
  if (typeof e === 'number') return e
  if (isSymbol_1(e)) return NAN
  if (isObject_1(e)) {
    var t = typeof e.valueOf === 'function' ? e.valueOf() : e
    e = isObject_1(t) ? t + '' : t
  }
  if (typeof e !== 'string') return e === 0 ? e : +e
  e = e.replace(reTrim, '')
  var n = reIsBinary.test(e)
  return n || reIsOctal.test(e)
    ? freeParseInt(e.slice(2), n ? 2 : 8)
    : reIsBadHex.test(e)
      ? NAN
      : +e
}
var toNumber_1 = toNumber

var FUNC_ERROR_TEXT = 'Expected a function'

var nativeMax = Math.max

var nativeMin = Math.min
function debounce(e, t, n) {
  var i

  var o

  var r

  var a

  var s

  var l

  var c = 0

  var u = !1

  var d = !1

  var f = !0
  if (typeof e !== 'function') throw new TypeError(FUNC_ERROR_TEXT)
  function _(t) {
    var n = i

    var r = o
    return (i = o = void 0), (c = t), (a = e.apply(r, n))
  }
  function m(e) {
    var n = e - l
    return void 0 === l || n >= t || n < 0 || (d && e - c >= r)
  }
  function p() {
    var e = now_1()
    if (m(e)) return g(e)
    s = setTimeout(
      p,
      (function(e) {
        var n = t - (e - l)
        return d ? nativeMin(n, r - (e - c)) : n
      })(e)
    )
  }
  function g(e) {
    return (s = void 0), f && i ? _(e) : ((i = o = void 0), a)
  }
  function h() {
    var e = now_1()

    var n = m(e)
    if (((i = arguments), (o = this), (l = e), n)) {
      if (void 0 === s)
        return (function(e) {
          return (c = e), (s = setTimeout(p, t)), u ? _(e) : a
        })(l)
      if (d) return (s = setTimeout(p, t)), _(l)
    }
    return void 0 === s && (s = setTimeout(p, t)), a
  }
  return (
    (t = toNumber_1(t) || 0),
    isObject_1(n) &&
      ((u = !!n.leading),
      (r = (d = 'maxWait' in n) ? nativeMax(toNumber_1(n.maxWait) || 0, t) : r),
      (f = 'trailing' in n ? !!n.trailing : f)),
    (h.cancel = function() {
      void 0 !== s && clearTimeout(s), (c = 0), (i = l = o = s = void 0)
    }),
    (h.flush = function() {
      return void 0 === s ? a : g(now_1())
    }),
    h
  )
}
var debounce_1 = debounce

var script = {
  name: 'MuInfiniteLoading',
  props: {
    target: { type: String, default: '' },
    distance: {
      type: Number,
      default: 20,
      validate: function(e) {
        return e >= 10
      }
    },
    debounceTime: {
      type: Number,
      default: 50,
      validate: function(e) {
        return e >= 20
      }
    },
    preload: { type: Boolean, default: !0 },
    loadingText: { type: String, default: '' },
    completeText: { type: String, default: '' },
    errorText: { type: String, default: '' },
    emptyText: { type: String, default: '' }
  },
  data: function() {
    return {
      scrollParent: null,
      container: null,
      scrollParentClientHeight: 0,
      containerHeight: 0,
      loading: !1,
      complete: !1,
      error: !1,
      empty: !1,
      eventHandler: null
    }
  },
  computed: {
    isPartialLoad: function() {
      return this.scrollParent !== window
    }
  },
  mounted: function() {
    var e = this
    ;(this.scrollParent = this.getScrollParent()),
      (this.container = this.$refs.ilContainer),
      (this.scrollParentClientHeight = this.getClientHeight(this.scrollParent)),
      (this.containerHeight = this.container.offsetHeight),
      (this.eventHandler = debounce_1(this.handleScroll, this.debounceTime)),
      this.scrollParent.addEventListener('scroll', this.eventHandler),
      (this.stateChanger = {
        loaded: function() {
          e.$emit('$infiniteLoading:loaded')
        },
        complete: function() {
          e.$emit('$infiniteLoading:complete')
        },
        error: function() {
          e.$emit('$infiniteLoading:error')
        },
        empty: function() {
          e.$emit('$infiniteLoading:empty')
        }
      }),
      this.$on('$infiniteLoading:loaded', function() {
        e.$nextTick(function() {
          e.refresh()
        })
      }),
      this.$on('$infiniteLoading:complete', function() {
        e.$nextTick(function() {
          e.refresh(!0)
        })
      }),
      this.$on('$infiniteLoading:error', function() {
        e.$nextTick(function() {
          e.reset('error')
        })
      }),
      this.$on('$infiniteLoading:empty', function() {
        e.$nextTick(function() {
          e.reset('empty')
        })
      }),
      this.preload && this.execute()
  },
  beforeDestroy: function() {
    this.removeListener()
  },
  methods: {
    getScrollParent: function() {
      var e = this.$refs.ilWrapper
      return this.target === 'window' && (e = window), e
    },
    getScrollTop: function(e) {
      return e === window
        ? Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          )
        : e.scrollTop
    },
    getElementTop: function(e) {
      return e.getBoundingClientRect().top + this.getScrollTop(window)
    },
    getClientHeight: function(e) {
      return e === window
        ? document.documentElement.clientHeight
        : e.clientHeight
    },
    check: function() {
      return (
        (this.scrollParent === window
          ? this.getScrollTop(window) - this.getElementTop(this.$refs.ilWrapper)
          : this.getScrollTop(this.scrollParent)) +
          this.scrollParentClientHeight >=
        this.containerHeight - this.distance
      )
    },
    handleScroll: function() {
      this.complete || this.loading || (this.check() && this.execute())
    },
    execute: function() {
      ;(this.loading = !0), this.$emit('load', this.stateChanger)
    },
    refresh: function(e) {
      ;(this.containerHeight = this.container.offsetHeight),
        (this.loading = !1),
        e && (this.complete = !0)
    },
    reset: function(e) {
      e === 'empty' ? (this.empty = !0) : e === 'error' && (this.error = !0),
        (this.loading = !1),
        this.removeListener()
    },
    removeListener: function() {
      this.scrollParent.removeEventListener('scroll', this.eventHandler)
    }
  }
}
function normalizeComponent(e, t, n, i, o, r, a, s, l, c) {
  typeof a === 'function' && ((l = s), (s = a), (a = !1))
  var u

  var d = typeof n === 'function' ? n.options : n
  if (
    (e &&
      e.render &&
      ((d.render = e.render),
      (d.staticRenderFns = e.staticRenderFns),
      (d._compiled = !0),
      o && (d.functional = !0)),
    i && (d._scopeId = i),
    r
      ? ((u = function(e) {
          ;(e =
            e ||
            (this.$vnode && this.$vnode.ssrContext) ||
            (this.parent &&
              this.parent.$vnode &&
              this.parent.$vnode.ssrContext)) ||
            typeof __VUE_SSR_CONTEXT__ === 'undefined' ||
            (e = __VUE_SSR_CONTEXT__),
            t && t.call(this, l(e)),
            e && e._registeredComponents && e._registeredComponents.add(r)
        }),
        (d._ssrRegister = u))
      : t &&
        (u = a
          ? function() {
              t.call(this, c(this.$root.$options.shadowRoot))
            }
          : function(e) {
              t.call(this, s(e))
            }),
    u)
  )
    if (d.functional) {
      var f = d.render
      d.render = function(e, t) {
        return u.call(t), f(e, t)
      }
    } else {
      var _ = d.beforeCreate
      d.beforeCreate = _ ? [].concat(_, u) : [u]
    }
  return n
}
var isOldIE =
  typeof navigator !== 'undefined' &&
  /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase())
function createInjector(e) {
  return function(e, t) {
    return addStyle(e, t)
  }
}
var HEAD = document.head || document.getElementsByTagName('head')[0]

var styles = {}
function addStyle(e, t) {
  var n = isOldIE ? t.media || 'default' : e

  var i = styles[n] || (styles[n] = { ids: new Set(), styles: [] })
  if (!i.ids.has(e)) {
    i.ids.add(e)
    var o = t.source
    if (
      (t.map &&
        ((o += '\n/*# sourceURL=' + t.map.sources[0] + ' */'),
        (o +=
          '\n/*# sourceMappingURL=data:application/json;base64,' +
          btoa(unescape(encodeURIComponent(JSON.stringify(t.map)))) +
          ' */')),
      i.element ||
        ((i.element = document.createElement('style')),
        (i.element.type = 'text/css'),
        t.media && i.element.setAttribute('media', t.media),
        HEAD.appendChild(i.element)),
      'styleSheet' in i.element)
    )
      i.styles.push(o),
        (i.element.styleSheet.cssText = i.styles.filter(Boolean).join('\n'))
    else {
      var r = i.ids.size - 1

      var a = document.createTextNode(o)

      var s = i.element.childNodes
      s[r] && i.element.removeChild(s[r]),
        s.length ? i.element.insertBefore(a, s[r]) : i.element.appendChild(a)
    }
  }
}
var __vue_script__ = script

var __vue_render__ = function() {
  var e = this

  var t = e.$createElement

  var n = e._self._c || t
  return n(
    'div',
    {
      ref: 'ilWrapper',
      staticClass: 'mu-infinite-loading',
      class: { 'mu-infinite-loading-part': e.isPartialLoad }
    },
    [
      n(
        'div',
        { ref: 'ilContainer', staticClass: 'mu-infinite-loading-container' },
        [e._t('default')],
        2
      ),
      e._v(' '),
      n(
        'div',
        {
          directives: [
            {
              name: 'show',
              rawName: 'v-show',
              value: e.loading,
              expression: 'loading'
            }
          ],
          staticClass: 'mu-infinite-loading-tip'
        },
        [
          e._t('loading', [
            e._v('\n      ' + e._s(e.loadingText || 'loading...') + '\n    ')
          ])
        ],
        2
      ),
      e._v(' '),
      e.complete
        ? n(
            'div',
            { staticClass: 'mu-infinite-loading-tip' },
            [
              e._t('complete', [
                e._v(
                  '\n      ' + e._s(e.completeText || 'complete~') + '\n    '
                )
              ])
            ],
            2
          )
        : e._e(),
      e._v(' '),
      e.error
        ? n(
            'div',
            { staticClass: 'mu-infinite-loading-tip' },
            [
              e._t('error', [
                e._v('\n      ' + e._s(e.errorText || 'error~') + '\n    ')
              ])
            ],
            2
          )
        : e._e(),
      e._v(' '),
      e.empty
        ? n(
            'div',
            { staticClass: 'mu-infinite-loading-tip' },
            [
              e._t('empty', [
                e._v('\n      ' + e._s(e.emptyText || 'empty~') + '\n    ')
              ])
            ],
            2
          )
        : e._e()
    ]
  )
}

var __vue_staticRenderFns__ = []

var __vue_inject_styles__ = function(e) {
  e &&
    e('data-v-370d0f72_0', {
      source:
        '\n.mu-infinite-loading-part{width:100%;height:100%;overflow-y:auto\n}\n.mu-infinite-loading-tip{height:30px;line-height:30px;font-size:14px;text-align:center;color:#999\n}',
      map: void 0,
      media: void 0
    })
}

var __vue_scope_id__ = void 0

var __vue_module_identifier__ = void 0

var __vue_is_functional_template__ = !1

var infiniteLoading = normalizeComponent(
  { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
  __vue_inject_styles__,
  __vue_script__,
  __vue_scope_id__,
  __vue_is_functional_template__,
  __vue_module_identifier__,
  createInjector,
  void 0
)
module.exports = infiniteLoading
