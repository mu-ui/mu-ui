var script = {
  name: 'MuRotary',
  props: {
    turnsCount: {
      type: Number,
      default: 3,
      validate: function(e) {
        return e > 0
      }
    },
    duration: {
      type: Number,
      default: 6,
      validate: function(e) {
        return e > 1
      }
    },
    number: {
      type: Number,
      default: 8,
      validate: function(e) {
        return e > 1
      }
    }
  },
  data: function() {
    return { rotate: 0, free: !0, prev: 0, cur: 0, deg: 0, preDeg: 0 }
  },
  mounted: function() {
    var e = this
    ;(this.deg = 360 / this.number),
      (this.preDeg = 360 * this.turnsCount),
      (this.resultHandler = {
        set: function(t) {
          e.$emit('$rotaryResult:set', t)
        },
        free: function() {
          e.$emit('$rotaryResult:free')
        }
      }),
      this.$on('$rotaryResult:set', function(t) {
        typeof t === 'number' && t >= 0 && e.set(t)
      }),
      this.$on('$rotaryResult:free', function() {
        e.free = !0
      }),
      this.$refs['mu-rotary-canvas'].addEventListener(
        'transitionend',
        function() {
          ;(e.free = !0), (e.prev = e.cur), e.$emit('finish')
        }
      )
  },
  methods: {
    set: function(e) {
      this.cur = e
      var t = 0
      ;(t =
        e < this.prev
          ? (this.prev - e) * this.deg
          : (this.number + this.prev - e) * this.deg),
        (this.rotate += this.preDeg + t)
    },
    rotaryHandler: function() {
      this.free && ((this.free = !1), this.$emit('handle', this.resultHandler))
    }
  }
}
function normalizeComponent(e, t, r, n, i, s, a, o, u, d) {
  typeof a === 'function' && ((u = o), (o = a), (a = !1))
  var c

  var _ = typeof r === 'function' ? r.options : r
  if (
    (e &&
      e.render &&
      ((_.render = e.render),
      (_.staticRenderFns = e.staticRenderFns),
      (_._compiled = !0),
      i && (_.functional = !0)),
    n && (_._scopeId = n),
    s
      ? ((c = function(e) {
          ;(e =
            e ||
            (this.$vnode && this.$vnode.ssrContext) ||
            (this.parent &&
              this.parent.$vnode &&
              this.parent.$vnode.ssrContext)) ||
            typeof __VUE_SSR_CONTEXT__ === 'undefined' ||
            (e = __VUE_SSR_CONTEXT__),
            t && t.call(this, u(e)),
            e && e._registeredComponents && e._registeredComponents.add(s)
        }),
        (_._ssrRegister = c))
      : t &&
        (c = a
          ? function() {
              t.call(this, d(this.$root.$options.shadowRoot))
            }
          : function(e) {
              t.call(this, o(e))
            }),
    c)
  )
    if (_.functional) {
      var l = _.render
      _.render = function(e, t) {
        return c.call(t), l(e, t)
      }
    } else {
      var f = _.beforeCreate
      _.beforeCreate = f ? [].concat(f, c) : [c]
    }
  return r
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
  var r = isOldIE ? t.media || 'default' : e

  var n = styles[r] || (styles[r] = { ids: new Set(), styles: [] })
  if (!n.ids.has(e)) {
    n.ids.add(e)
    var i = t.source
    if (
      (t.map &&
        ((i += '\n/*# sourceURL=' + t.map.sources[0] + ' */'),
        (i +=
          '\n/*# sourceMappingURL=data:application/json;base64,' +
          btoa(unescape(encodeURIComponent(JSON.stringify(t.map)))) +
          ' */')),
      n.element ||
        ((n.element = document.createElement('style')),
        (n.element.type = 'text/css'),
        t.media && n.element.setAttribute('media', t.media),
        HEAD.appendChild(n.element)),
      'styleSheet' in n.element)
    )
      n.styles.push(i),
        (n.element.styleSheet.cssText = n.styles.filter(Boolean).join('\n'))
    else {
      var s = n.ids.size - 1

      var a = document.createTextNode(i)

      var o = n.element.childNodes
      o[s] && n.element.removeChild(o[s]),
        o.length ? n.element.insertBefore(a, o[s]) : n.element.appendChild(a)
    }
  }
}
var __vue_script__ = script

var __vue_render__ = function() {
  var e = this.$createElement

  var t = this._self._c || e
  return t('div', { staticClass: 'mu-rotary' }, [
    t(
      'div',
      {
        ref: 'mu-rotary-canvas',
        staticClass: 'mu-rotary-canvas-wrapper',
        style: {
          transform: 'rotate(' + this.rotate + 'deg)',
          'transition-duration': this.duration + 's'
        }
      },
      [this._t('mu-rotary-canvas')],
      2
    ),
    this._v(' '),
    t(
      'div',
      {
        staticClass: 'mu-rotary-click-handler',
        on: { click: this.rotaryHandler }
      },
      [this._t('mu-rotary-handler')],
      2
    )
  ])
}

var __vue_staticRenderFns__ = []

var __vue_inject_styles__ = function(e) {
  e &&
    e('data-v-4f48c2ab_0', {
      source:
        '\n.mu-rotary{position:relative;width:100%;height:100%;border-radius:50%;overflow:hidden\n}\n.mu-rotary-canvas-wrapper{width:100%;height:100%;-webkit-transform-origin:center center;transform-origin:center center;-webkit-transition:-webkit-transform cubic-bezier(.2,0,0,1);transition:-webkit-transform cubic-bezier(.2,0,0,1);transition:transform cubic-bezier(.2,0,0,1);transition:transform cubic-bezier(.2,0,0,1),-webkit-transform cubic-bezier(.2,0,0,1)\n}\n.mu-rotary-click-handler{position:absolute;top:50%;left:50%;-webkit-transform:translate3d(-50%,-50%,0);transform:translate3d(-50%,-50%,0)\n}',
      map: void 0,
      media: void 0
    })
}

var __vue_scope_id__ = void 0

var __vue_module_identifier__ = void 0

var __vue_is_functional_template__ = !1

var rotary = normalizeComponent(
  { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
  __vue_inject_styles__,
  __vue_script__,
  __vue_scope_id__,
  __vue_is_functional_template__,
  __vue_module_identifier__,
  createInjector,
  void 0
)
export default rotary
