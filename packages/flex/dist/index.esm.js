var script = {
  name: 'MuFlex',
  props: {
    inline: { type: Boolean, default: !1 },
    direction: {
      type: String,
      default: 'row',
      validator: function(e) {
        return ~['col', 'row'].indexOf(e)
      }
    },
    reverse: { type: Boolean, default: !1 },
    wrap: { type: Boolean, default: !1 },
    justify: {
      type: String,
      default: 'between',
      validator: function(e) {
        return ~['start', 'end', 'center', 'around', 'between'].indexOf(e)
      }
    },
    items: {
      type: String,
      default: 'center',
      validator: function(e) {
        return ~['start', 'end', 'center'].indexOf(e)
      }
    },
    align: {
      type: String,
      default: 'stretch',
      validator: function(e) {
        return ~[
          'start',
          'end',
          'center',
          'around',
          'between',
          'stretch'
        ].indexOf(e)
      }
    }
  },
  computed: {
    customFlex: function() {
      var e = []
      return (
        this.inline && e.push('mu-flex-inline'),
        this.wrap && e.push('mu-flex-wrap'),
        this.direction === 'col'
          ? e.push(this.reverse ? 'mu-flex-col-reverse' : 'mu-flex-col')
          : this.reverse && e.push('mu-flex-row-reverse'),
        this.justify !== 'between' &&
          e.push('mu-flex-justify-'.concat(this.justify)),
        this.align !== 'stretch' && e.push('mu-flex-align-'.concat(this.align)),
        this.items !== 'center' && e.push('mu-flex-items-'.concat(this.items)),
        e
      )
    }
  }
}
function normalizeComponent(e, t, n, i, s, r, l, a, o, c) {
  typeof l === 'function' && ((o = a), (a = l), (l = !1))
  var _

  var u = typeof n === 'function' ? n.options : n
  if (
    (e &&
      e.render &&
      ((u.render = e.render),
      (u.staticRenderFns = e.staticRenderFns),
      (u._compiled = !0),
      s && (u.functional = !0)),
    i && (u._scopeId = i),
    r
      ? ((_ = function(e) {
          ;(e =
            e ||
            (this.$vnode && this.$vnode.ssrContext) ||
            (this.parent &&
              this.parent.$vnode &&
              this.parent.$vnode.ssrContext)) ||
            typeof __VUE_SSR_CONTEXT__ === 'undefined' ||
            (e = __VUE_SSR_CONTEXT__),
            t && t.call(this, o(e)),
            e && e._registeredComponents && e._registeredComponents.add(r)
        }),
        (u._ssrRegister = _))
      : t &&
        (_ = l
          ? function() {
              t.call(this, c(this.$root.$options.shadowRoot))
            }
          : function(e) {
              t.call(this, a(e))
            }),
    _)
  )
    if (u.functional) {
      var f = u.render
      u.render = function(e, t) {
        return _.call(t), f(e, t)
      }
    } else {
      var d = u.beforeCreate
      u.beforeCreate = d ? [].concat(d, _) : [_]
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
    var s = t.source
    if (
      (t.map &&
        ((s += '\n/*# sourceURL=' + t.map.sources[0] + ' */'),
        (s +=
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
      i.styles.push(s),
        (i.element.styleSheet.cssText = i.styles.filter(Boolean).join('\n'))
    else {
      var r = i.ids.size - 1

      var l = document.createTextNode(s)

      var a = i.element.childNodes
      a[r] && i.element.removeChild(a[r]),
        a.length ? i.element.insertBefore(l, a[r]) : i.element.appendChild(l)
    }
  }
}
var __vue_script__ = script

var __vue_render__ = function() {
  var e = this.$createElement
  return (this._self._c || e)(
    'div',
    { staticClass: 'mu-flex', class: this.customFlex },
    [this._t('default')],
    2
  )
}

var __vue_staticRenderFns__ = []

var __vue_inject_styles__ = function(e) {
  e &&
    e('data-v-d8661120_0', {
      source:
        '\n.mu-flex{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-ms-flex-align:center;align-items:center\n}\n.mu-flex-inline{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start\n}\n.mu-flex-wrap{-ms-flex-wrap:wrap;flex-wrap:wrap\n}\n.mu-flex-row-reverse{-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-ms-flex-direction:row-reverse;flex-direction:row-reverse\n}\n.mu-flex-col{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column\n}\n.mu-flex-col-reverse{-webkit-box-orient:vertical;-webkit-box-direction:reverse;-ms-flex-direction:column-reverse;flex-direction:column-reverse\n}\n.mu-flex-justify-start{-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start\n}\n.mu-flex-justify-end{-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end\n}\n.mu-flex-justify-center{-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center\n}\n.mu-flex-justify-around{-ms-flex-pack:distribute;justify-content:space-around\n}\n.mu-flex-items-start{-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start\n}\n.mu-flex-items-end{-webkit-box-align:end;-ms-flex-align:end;align-items:flex-end\n}\n.mu-flex-align-start{-ms-flex-line-pack:start;align-content:flex-start\n}\n.mu-flex-align-end{-ms-flex-line-pack:end;align-content:flex-end\n}\n.mu-flex-align-center{-ms-flex-line-pack:center;align-content:center\n}\n.mu-flex-align-between{-ms-flex-line-pack:justify;align-content:space-between\n}\n.mu-flex-align-around{-ms-flex-line-pack:distribute;align-content:space-around\n}',
      map: void 0,
      media: void 0
    })
}

var __vue_scope_id__ = void 0

var __vue_module_identifier__ = void 0

var __vue_is_functional_template__ = !1

var flex = normalizeComponent(
  { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
  __vue_inject_styles__,
  __vue_script__,
  __vue_scope_id__,
  __vue_is_functional_template__,
  __vue_module_identifier__,
  createInjector,
  void 0
)

var script$1 = {
  name: 'MuFlexItem',
  props: {
    flex: { type: Number, default: 0 },
    align: {
      type: String,
      default: 'auto',
      validator: function(e) {
        return ~['start', 'end', 'center', 'auto'].indexOf(e)
      }
    }
  },
  computed: {
    customAlign: function() {
      var e = []
      return (
        this.align !== 'auto' && e.push('mu-flex-item-'.concat(this.align)), e
      )
    },
    customStyle: function() {
      var e = {}
      return (
        this.flex > 0 &&
          ((e['-webkit-box-flex'] = this.flex), (e.flex = this.flex)),
        e
      )
    }
  }
}

var __vue_script__$1 = script$1

var __vue_render__$1 = function() {
  var e = this.$createElement
  return (this._self._c || e)(
    'div',
    {
      staticClass: 'mu-flex-item',
      class: this.customAlign,
      style: this.customStyle
    },
    [this._t('default')],
    2
  )
}

var __vue_staticRenderFns__$1 = []

var __vue_inject_styles__$1 = function(e) {
  e &&
    e('data-v-0c038b10_0', {
      source:
        '\n.mu-flex-item-start{-ms-flex-item-align:start;align-self:flex-start\n}\n.mu-flex-item-end{-ms-flex-item-align:end;align-self:flex-end\n}\n.mu-flex-item-center{-ms-flex-item-align:center;align-self:center\n}',
      map: void 0,
      media: void 0
    })
}

var __vue_scope_id__$1 = void 0

var __vue_module_identifier__$1 = void 0

var __vue_is_functional_template__$1 = !1

var flexItem = normalizeComponent(
  { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
  __vue_inject_styles__$1,
  __vue_script__$1,
  __vue_scope_id__$1,
  __vue_is_functional_template__$1,
  __vue_module_identifier__$1,
  createInjector,
  void 0
)
export { flex as Flex, flexItem as FlexItem }
