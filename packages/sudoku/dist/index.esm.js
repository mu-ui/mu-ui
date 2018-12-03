import { Flex } from '@mu-ui/mu-flex'
var script = {
  name: 'MuSudoku',
  components: { 'mu-flex': Flex },
  props: {
    turnsCount: {
      type: Number,
      default: 3,
      validate: function(e) {
        return e > 0
      }
    },
    initialRate: {
      type: Number,
      default: 100,
      validate: function(e) {
        return e >= 50 && e <= 200
      }
    },
    slowestRate: {
      type: Number,
      default: 800,
      validate: function(e) {
        return e >= 500 && e <= 1e3
      }
    }
  },
  data: function() {
    return {
      cur: -1,
      prev: -1,
      lucky: -1,
      count: 0,
      rate: 0,
      free: !0,
      step: 0,
      inc: 0,
      timer: null
    }
  },
  mounted: function() {
    var e = this
    ;(this.resultHandler = {
      set: function(t) {
        e.$emit('$sudokuResult:set', t)
      },
      free: function() {
        e.$emit('$sudokuResult:free')
      }
    }),
      this.$on('$sudokuResult:set', function(t) {
        if (!(typeof t === 'number' && t >= 0 && t <= 7))
          throw new Error(
            'sudoku: the param '.concat(t, ' is out of range[0,7]')
          )
        e.set(t)
      }),
      this.$on('$sudokuResult:free', function() {
        e.free = !0
      })
  },
  methods: {
    set: function(e) {
      ;(this.lucky = e),
        (this.rate = this.initialRate),
        (this.count = 0),
        (this.prev = ~[-1, 0].indexOf(this.cur) ? 7 : this.cur - 1)
      var t = this.lucky - this.prev
      this.step = t > 3 ? t : t <= -4 ? 16 + t : 8 + t
      var i = this.step >= 8 ? 2 : 4
      ;(this.inc = (this.initialRate / 5) * i), this.search()
    },
    sudokuHandler: function() {
      this.free && ((this.free = !1), this.$emit('handle', this.resultHandler))
    },
    search: function() {
      var e = this
      if (
        (this.timer && clearTimeout(this.timer),
        this.cur < 7 ? this.cur++ : (this.cur = 0),
        this.count < this.turnsCount)
      )
        this.cur === this.prev && this.count++
      else {
        if (--this.step == 0) return this.$emit('finish'), void (this.free = !0)
        this.rate + this.inc <= this.slowestRate && (this.rate += this.inc)
      }
      this.timer = setTimeout(function() {
        e.search()
      }, this.rate)
    }
  }
}
function normalizeComponent(e, t, i, s, n, u, r, o, a, c) {
  typeof r === 'function' && ((a = o), (o = r), (r = !1))
  var d

  var _ = typeof i === 'function' ? i.options : i
  if (
    (e &&
      e.render &&
      ((_.render = e.render),
      (_.staticRenderFns = e.staticRenderFns),
      (_._compiled = !0),
      n && (_.functional = !0)),
    s && (_._scopeId = s),
    u
      ? ((d = function(e) {
          ;(e =
            e ||
            (this.$vnode && this.$vnode.ssrContext) ||
            (this.parent &&
              this.parent.$vnode &&
              this.parent.$vnode.ssrContext)) ||
            typeof __VUE_SSR_CONTEXT__ === 'undefined' ||
            (e = __VUE_SSR_CONTEXT__),
            t && t.call(this, a(e)),
            e && e._registeredComponents && e._registeredComponents.add(u)
        }),
        (_._ssrRegister = d))
      : t &&
        (d = r
          ? function() {
              t.call(this, c(this.$root.$options.shadowRoot))
            }
          : function(e) {
              t.call(this, o(e))
            }),
    d)
  )
    if (_.functional) {
      var l = _.render
      _.render = function(e, t) {
        return d.call(t), l(e, t)
      }
    } else {
      var m = _.beforeCreate
      _.beforeCreate = m ? [].concat(m, d) : [d]
    }
  return i
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
  var i = isOldIE ? t.media || 'default' : e

  var s = styles[i] || (styles[i] = { ids: new Set(), styles: [] })
  if (!s.ids.has(e)) {
    s.ids.add(e)
    var n = t.source
    if (
      (t.map &&
        ((n += '\n/*# sourceURL=' + t.map.sources[0] + ' */'),
        (n +=
          '\n/*# sourceMappingURL=data:application/json;base64,' +
          btoa(unescape(encodeURIComponent(JSON.stringify(t.map)))) +
          ' */')),
      s.element ||
        ((s.element = document.createElement('style')),
        (s.element.type = 'text/css'),
        t.media && s.element.setAttribute('media', t.media),
        HEAD.appendChild(s.element)),
      'styleSheet' in s.element)
    )
      s.styles.push(n),
        (s.element.styleSheet.cssText = s.styles.filter(Boolean).join('\n'))
    else {
      var u = s.ids.size - 1

      var r = document.createTextNode(n)

      var o = s.element.childNodes
      o[u] && s.element.removeChild(o[u]),
        o.length ? s.element.insertBefore(r, o[u]) : s.element.appendChild(r)
    }
  }
}
var __vue_script__ = script

var __vue_render__ = function() {
  var e = this

  var t = e.$createElement

  var i = e._self._c || t
  return i(
    'div',
    { staticClass: 'mu-sudoku' },
    [
      i(
        'mu-flex',
        { staticClass: 'mu-sudoku-col', attrs: { direction: 'col' } },
        [
          i(
            'mu-flex',
            { staticClass: 'mu-sudoku-row' },
            [
              e._l([0, 1, 2], function(t) {
                return e._t('mu-sudoku-item-' + t, [e._v('Gift.' + e._s(t))], {
                  active: e.cur === t
                })
              })
            ],
            2
          ),
          e._v(' '),
          i(
            'mu-flex',
            { staticClass: 'mu-sudoku-row' },
            [
              e._t('mu-sudoku-item-7', [e._v('Gift.7')], {
                active: e.cur === 7
              }),
              e._v(' '),
              i(
                'div',
                {
                  staticClass: 'mu-sudoku-click-handler',
                  on: { click: e.sudokuHandler }
                },
                [e._t('mu-sudoku-click-btn', [e._v('Click')])],
                2
              ),
              e._v(' '),
              e._t('mu-sudoku-item-3', [e._v('Gift.3')], {
                active: e.cur === 3
              })
            ],
            2
          ),
          e._v(' '),
          i(
            'mu-flex',
            { staticClass: 'mu-sudoku-row' },
            [
              e._l([6, 5, 4], function(t) {
                return e._t('mu-sudoku-item-' + t, [e._v('Gift.' + e._s(t))], {
                  active: e.cur === t
                })
              })
            ],
            2
          )
        ],
        1
      )
    ],
    1
  )
}

var __vue_staticRenderFns__ = []

var __vue_inject_styles__ = function(e) {
  e &&
    e('data-v-20471b9c_0', {
      source:
        '\n.mu-sudoku,.mu-sudoku-col,.mu-sudoku-row{width:100%;height:100%\n}',
      map: void 0,
      media: void 0
    })
}

var __vue_scope_id__ = void 0

var __vue_module_identifier__ = void 0

var __vue_is_functional_template__ = !1

var sudoku = normalizeComponent(
  { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
  __vue_inject_styles__,
  __vue_script__,
  __vue_scope_id__,
  __vue_is_functional_template__,
  __vue_module_identifier__,
  createInjector,
  void 0
)
export default sudoku
