'use strict'
var script = {
  name: 'MuLoading',
  props: {
    color: {
      type: String,
      default: '#272639',
      validator: function(e) {
        return e !== ''
      }
    },
    type: {
      type: String,
      default: 'ring',
      validator: function(e) {
        return ~['ring', 'dual-ring'].indexOf(e)
      }
    },
    size: {
      type: Number,
      default: 30,
      validator: function(e) {
        return function(e) {
          return 20
        }
      }
    },
    width: {
      type: Number,
      default: 3,
      validator: function(e) {
        return e > 0
      }
    }
  },
  computed: {
    iconStyle: function() {
      var e = {
        width: ''.concat(this.size, 'px'),
        height: ''.concat(this.size, 'px'),
        borderWidth: ''.concat(this.width, 'px'),
        borderColor: this.color,
        borderRightColor: 'transparent'
      }
      return this.type === 'dual-ring' && (e.borderLeftColor = 'transparent'), e
    }
  }
}
function normalizeComponent(e, t, n, i, r, o, a, s, d, l) {
  typeof a === 'function' && ((d = s), (s = a), (a = !1))
  var _

  var c = typeof n === 'function' ? n.options : n
  if (
    (e &&
      e.render &&
      ((c.render = e.render),
      (c.staticRenderFns = e.staticRenderFns),
      (c._compiled = !0),
      r && (c.functional = !0)),
    i && (c._scopeId = i),
    o
      ? ((_ = function(e) {
          ;(e =
            e ||
            (this.$vnode && this.$vnode.ssrContext) ||
            (this.parent &&
              this.parent.$vnode &&
              this.parent.$vnode.ssrContext)) ||
            typeof __VUE_SSR_CONTEXT__ === 'undefined' ||
            (e = __VUE_SSR_CONTEXT__),
            t && t.call(this, d(e)),
            e && e._registeredComponents && e._registeredComponents.add(o)
        }),
        (c._ssrRegister = _))
      : t &&
        (_ = a
          ? function() {
              t.call(this, l(this.$root.$options.shadowRoot))
            }
          : function(e) {
              t.call(this, s(e))
            }),
    _)
  )
    if (c.functional) {
      var u = c.render
      c.render = function(e, t) {
        return _.call(t), u(e, t)
      }
    } else {
      var m = c.beforeCreate
      c.beforeCreate = m ? [].concat(m, _) : [_]
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
    var r = t.source
    if (
      (t.map &&
        ((r += '\n/*# sourceURL=' + t.map.sources[0] + ' */'),
        (r +=
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
      i.styles.push(r),
        (i.element.styleSheet.cssText = i.styles.filter(Boolean).join('\n'))
    else {
      var o = i.ids.size - 1

      var a = document.createTextNode(r)

      var s = i.element.childNodes
      s[o] && i.element.removeChild(s[o]),
        s.length ? i.element.insertBefore(a, s[o]) : i.element.appendChild(a)
    }
  }
}
var __vue_script__ = script

var __vue_render__ = function() {
  var e = this.$createElement

  var t = this._self._c || e
  return t(
    'div',
    { staticClass: 'mu-loading' },
    [
      this._t('icon', [
        t('div', { staticClass: 'mu-loading-icon', style: this.iconStyle })
      ]),
      this._v(' '),
      t(
        'div',
        { staticClass: 'mu-loading-con' },
        [
          this._t('default', [
            t('span', { staticClass: 'mu-loading-tip' }, [
              this._v('loading...')
            ])
          ])
        ],
        2
      )
    ],
    2
  )
}

var __vue_staticRenderFns__ = []

var __vue_inject_styles__ = function(e) {
  e &&
    e('data-v-3caa2f4b_0', {
      source:
        '\n@-webkit-keyframes rotate{\n0%{-webkit-transform:rotate(0);transform:rotate(0)\n}\nto{-webkit-transform:rotate(1turn);transform:rotate(1turn)\n}\n}\n@keyframes rotate{\n0%{-webkit-transform:rotate(0);transform:rotate(0)\n}\nto{-webkit-transform:rotate(1turn);transform:rotate(1turn)\n}\n}\n.mu-loading{text-align:center\n}\n.mu-loading-icon{display:inline-block;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:50%;border-style:solid;-webkit-animation:rotate 1s linear infinite;animation:rotate 1s linear infinite\n}\n.mu-loading-con{padding-top:10px\n}\n.mu-loading-tip{font-size:14px;color:#666\n}',
      map: void 0,
      media: void 0
    })
}

var __vue_scope_id__ = void 0

var __vue_module_identifier__ = void 0

var __vue_is_functional_template__ = !1

var loading = normalizeComponent(
  { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
  __vue_inject_styles__,
  __vue_script__,
  __vue_scope_id__,
  __vue_is_functional_template__,
  __vue_module_identifier__,
  createInjector,
  void 0
)
module.exports = loading
