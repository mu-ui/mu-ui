'use strict'
var script = {
  name: 'MuPopup',
  props: {
    value: { type: Boolean, default: !1 },
    position: {
      type: String,
      default: 'center',
      validator: function(t) {
        return ~['top', 'bottom', 'left', 'right', 'center'].indexOf(t)
      }
    },
    transition: {
      type: String,
      default: 'fade',
      validator: function(t) {
        return t !== ''
      }
    },
    modal: { type: Boolean, default: !0 },
    clickable: { type: Boolean, default: !0 },
    opacity: {
      type: Number,
      default: 0.5,
      validator: function(t) {
        return t >= 0 && t <= 1
      }
    },
    duration: {
      type: Number,
      default: 0.5,
      validator: function(t) {
        return t >= 0
      }
    }
  },
  data: function() {
    return { show: !1 }
  },
  computed: {
    type: function() {
      return ~['fade', 'slide'].indexOf(this.transition)
        ? this.position === 'center'
          ? 'fade'
          : 'slide'
        : this.transition
    }
  },
  watch: {
    value: function(t) {
      ;(this.show = t), this.modal && this.toggleModal(t)
    }
  },
  created: function() {
    this.createModal()
  },
  methods: {
    createModal: function() {
      var t = this
      if (this.modal) {
        var e = document.querySelectorAll('.mu-popup-modal').length

        var n = document.createElement('div')
        ;(n.className = 'mu-popup-modal mu-popup-modal-'.concat(e)),
          (n.style.backgroundColor = 'rgba(0, 0, 0, '.concat(
            this.opacity,
            ')'
          )),
          (n.style.transitionDuration = ''.concat(this.duration, 's')),
          document.body.appendChild(n),
          this.clickable &&
            (n.addEventListener('click', function() {
              t.$emit('input', !1), t.toggleModal(!1)
            }),
            n.addEventListener('transitionend', function() {
              return !t.show && t.hideModal()
            })),
          (this.modalEl = n)
      }
      this.value &&
        this.$nextTick(function() {
          ;(t.show = !0), t.modal && t.toggleModal(!0)
        })
    },
    toggleModal: function(t) {
      var e = this
      t
        ? ((this.modalEl.style.display = 'block'),
          setTimeout(function() {
            return (e.modalEl.style.opacity = '1')
          }, 10))
        : (this.modalEl.style.opacity = '0')
    },
    hideModal: function() {
      this.modalEl.style.display = 'none'
    }
  }
}
function normalizeComponent(t, e, n, o, r, i, a, s, p, l) {
  typeof a === 'function' && ((p = s), (s = a), (a = !1))
  var u

  var d = typeof n === 'function' ? n.options : n
  if (
    (t &&
      t.render &&
      ((d.render = t.render),
      (d.staticRenderFns = t.staticRenderFns),
      (d._compiled = !0),
      r && (d.functional = !0)),
    o && (d._scopeId = o),
    i
      ? ((u = function(t) {
          ;(t =
            t ||
            (this.$vnode && this.$vnode.ssrContext) ||
            (this.parent &&
              this.parent.$vnode &&
              this.parent.$vnode.ssrContext)) ||
            typeof __VUE_SSR_CONTEXT__ === 'undefined' ||
            (t = __VUE_SSR_CONTEXT__),
            e && e.call(this, p(t)),
            t && t._registeredComponents && t._registeredComponents.add(i)
        }),
        (d._ssrRegister = u))
      : e &&
        (u = a
          ? function() {
              e.call(this, l(this.$root.$options.shadowRoot))
            }
          : function(t) {
              e.call(this, s(t))
            }),
    u)
  )
    if (d.functional) {
      var m = d.render
      d.render = function(t, e) {
        return u.call(e), m(t, e)
      }
    } else {
      var c = d.beforeCreate
      d.beforeCreate = c ? [].concat(c, u) : [u]
    }
  return n
}
var isOldIE =
  typeof navigator !== 'undefined' &&
  /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase())
function createInjector(t) {
  return function(t, e) {
    return addStyle(t, e)
  }
}
var HEAD = document.head || document.getElementsByTagName('head')[0]

var styles = {}
function addStyle(t, e) {
  var n = isOldIE ? e.media || 'default' : t

  var o = styles[n] || (styles[n] = { ids: new Set(), styles: [] })
  if (!o.ids.has(t)) {
    o.ids.add(t)
    var r = e.source
    if (
      (e.map &&
        ((r += '\n/*# sourceURL=' + e.map.sources[0] + ' */'),
        (r +=
          '\n/*# sourceMappingURL=data:application/json;base64,' +
          btoa(unescape(encodeURIComponent(JSON.stringify(e.map)))) +
          ' */')),
      o.element ||
        ((o.element = document.createElement('style')),
        (o.element.type = 'text/css'),
        e.media && o.element.setAttribute('media', e.media),
        HEAD.appendChild(o.element)),
      'styleSheet' in o.element)
    )
      o.styles.push(r),
        (o.element.styleSheet.cssText = o.styles.filter(Boolean).join('\n'))
    else {
      var i = o.ids.size - 1

      var a = document.createTextNode(r)

      var s = o.element.childNodes
      s[i] && o.element.removeChild(s[i]),
        s.length ? o.element.insertBefore(a, s[i]) : o.element.appendChild(a)
    }
  }
}
var __vue_script__ = script

var __vue_render__ = function() {
  var t = this.$createElement

  var e = this._self._c || t
  return e('transition', { attrs: { name: this.type } }, [
    e(
      'div',
      {
        directives: [
          {
            name: 'show',
            rawName: 'v-show',
            value: this.show,
            expression: 'show'
          }
        ],
        staticClass: 'mu-popup',
        class: 'mu-popup-' + this.position,
        style: { 'transition-duration': this.duration + 's' }
      },
      [this._t('default')],
      2
    )
  ])
}

var __vue_staticRenderFns__ = []

var __vue_inject_styles__ = function(t) {
  t &&
    t('data-v-44e883e9_0', {
      source:
        '\n.mu-popup{z-index:3001;position:fixed\n}\n.mu-popup-center{top:50%;left:50%;-webkit-transform:translate3d(-50%,-50%,0) scale(1);transform:translate3d(-50%,-50%,0) scale(1)\n}\n.mu-popup-center.fade-enter,.mu-popup-center.fade-leave-active{opacity:0;-webkit-transform:translate3d(-50%,-50%,0) scale(.5);transform:translate3d(-50%,-50%,0) scale(.5)\n}\n.mu-popup-center.fade-enter-active,.mu-popup-center.fade-leave-active{-webkit-transition-property:opacity,-webkit-transform;transition-property:opacity,-webkit-transform;transition-property:opacity,transform;transition-property:opacity,transform,-webkit-transform\n}\n.mu-popup-top{top:0;left:0;right:0;-webkit-transform:translate(0);transform:translate(0)\n}\n.mu-popup-top.slide-enter,.mu-popup-top.slide-leave-active{-webkit-transform:translateY(-100%);transform:translateY(-100%)\n}\n.mu-popup-top.slide-enter-active,.mu-popup-top.slide-leave-active{-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform\n}\n.mu-popup-bottom{bottom:0;left:0;right:0;-webkit-transform:translate(0);transform:translate(0)\n}\n.mu-popup-bottom.slide-enter,.mu-popup-bottom.slide-leave-active{-webkit-transform:translateY(100%);transform:translateY(100%)\n}\n.mu-popup-bottom.slide-enter-active,.mu-popup-bottom.slide-leave-active{-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform\n}\n.mu-popup-left{top:0;left:0;bottom:0;-webkit-transform:translate(0);transform:translate(0)\n}\n.mu-popup-left.slide-enter,.mu-popup-left.slide-leave-active{-webkit-transform:translate(-100%);transform:translate(-100%)\n}\n.mu-popup-left.slide-enter-active,.mu-popup-left.slide-leave-active{-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform\n}\n.mu-popup-right{top:0;bottom:0;right:0;-webkit-transform:translate(0);transform:translate(0)\n}\n.mu-popup-right.slide-enter,.mu-popup-right.slide-leave-active{-webkit-transform:translate(100%);transform:translate(100%)\n}\n.mu-popup-right.slide-enter-active,.mu-popup-right.slide-leave-active{-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform\n}\n.mu-popup-modal{display:none;z-index:3000;position:fixed;top:0;left:0;bottom:0;right:0;opacity:0;-webkit-transition-property:opacity;transition-property:opacity\n}',
      map: void 0,
      media: void 0
    })
}

var __vue_scope_id__ = void 0

var __vue_module_identifier__ = void 0

var __vue_is_functional_template__ = !1

var popup = normalizeComponent(
  { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
  __vue_inject_styles__,
  __vue_script__,
  __vue_scope_id__,
  __vue_is_functional_template__,
  __vue_module_identifier__,
  createInjector,
  void 0
)
module.exports = popup
