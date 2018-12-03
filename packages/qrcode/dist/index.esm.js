function commonjsRequire() {
  throw new Error(
    'Dynamic requires are not currently supported by rollup-plugin-commonjs'
  )
}
function createCommonjsModule(t, e) {
  return t((e = { exports: {} }), e.exports), e.exports
}
var qrcode = createCommonjsModule(function(t, e) {
  t.exports = (function t(e, r, n) {
    function o(a, u) {
      if (!r[a]) {
        if (!e[a]) {
          var s = typeof commonjsRequire === 'function' && commonjsRequire
          if (!u && s) return s(a, !0)
          if (i) return i(a, !0)
          var f = new Error("Cannot find module '" + a + "'")
          throw ((f.code = 'MODULE_NOT_FOUND'), f)
        }
        var c = (r[a] = { exports: {} })
        e[a][0].call(
          c.exports,
          function(t) {
            var r = e[a][1][t]
            return o(r || t)
          },
          c,
          c.exports,
          t,
          e,
          r,
          n
        )
      }
      return r[a].exports
    }
    for (
      var i = typeof commonjsRequire === 'function' && commonjsRequire, a = 0;
      a < n.length;
      a++
    )
      o(n[a])
    return o
  })(
    {
      1: [
        function(t, e, r) {
          e.exports = function() {
            return (
              typeof Promise === 'function' &&
              Promise.prototype &&
              Promise.prototype.then
            )
          }
        },
        {}
      ],
      2: [
        function(t, e, r) {
          var n = t('./utils').getSymbolSize
          ;(r.getRowColCoords = function(t) {
            if (t === 1) return []
            for (
              var e = Math.floor(t / 7) + 2,
                r = n(t),
                o = r === 145 ? 26 : 2 * Math.ceil((r - 13) / (2 * e - 2)),
                i = [r - 7],
                a = 1;
              a < e - 1;
              a++
            )
              i[a] = i[a - 1] - o
            return i.push(6), i.reverse()
          }),
            (r.getPositions = function(t) {
              for (
                var e = [], n = r.getRowColCoords(t), o = n.length, i = 0;
                i < o;
                i++
              )
                for (var a = 0; a < o; a++)
                  (i === 0 && a === 0) ||
                    (i === 0 && a === o - 1) ||
                    (i === o - 1 && a === 0) ||
                    e.push([n[i], n[a]])
              return e
            })
        },
        { './utils': 21 }
      ],
      3: [
        function(t, e, r) {
          var n = t('./mode')

          var o = [
            '0',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
            'G',
            'H',
            'I',
            'J',
            'K',
            'L',
            'M',
            'N',
            'O',
            'P',
            'Q',
            'R',
            'S',
            'T',
            'U',
            'V',
            'W',
            'X',
            'Y',
            'Z',
            ' ',
            '$',
            '%',
            '*',
            '+',
            '-',
            '.',
            '/',
            ':'
          ]
          function i(t) {
            ;(this.mode = n.ALPHANUMERIC), (this.data = t)
          }
          ;(i.getBitsLength = function(t) {
            return 11 * Math.floor(t / 2) + (t % 2) * 6
          }),
            (i.prototype.getLength = function() {
              return this.data.length
            }),
            (i.prototype.getBitsLength = function() {
              return i.getBitsLength(this.data.length)
            }),
            (i.prototype.write = function(t) {
              var e
              for (e = 0; e + 2 <= this.data.length; e += 2) {
                var r = 45 * o.indexOf(this.data[e])
                ;(r += o.indexOf(this.data[e + 1])), t.put(r, 11)
              }
              this.data.length % 2 && t.put(o.indexOf(this.data[e]), 6)
            }),
            (e.exports = i)
        },
        { './mode': 14 }
      ],
      4: [
        function(t, e, r) {
          function n() {
            ;(this.buffer = []), (this.length = 0)
          }
          ;(n.prototype = {
            get: function(t) {
              var e = Math.floor(t / 8)
              return ((this.buffer[e] >>> (7 - (t % 8))) & 1) == 1
            },
            put: function(t, e) {
              for (var r = 0; r < e; r++)
                this.putBit(((t >>> (e - r - 1)) & 1) == 1)
            },
            getLengthInBits: function() {
              return this.length
            },
            putBit: function(t) {
              var e = Math.floor(this.length / 8)
              this.buffer.length <= e && this.buffer.push(0),
                t && (this.buffer[e] |= 128 >>> this.length % 8),
                this.length++
            }
          }),
            (e.exports = n)
        },
        {}
      ],
      5: [
        function(t, e, r) {
          var n = t('../utils/buffer')
          function o(t) {
            if (!t || t < 1)
              throw new Error(
                'BitMatrix size must be defined and greater than 0'
              )
            ;(this.size = t),
              (this.data = new n(t * t)),
              this.data.fill(0),
              (this.reservedBit = new n(t * t)),
              this.reservedBit.fill(0)
          }
          ;(o.prototype.set = function(t, e, r, n) {
            var o = t * this.size + e
            ;(this.data[o] = r), n && (this.reservedBit[o] = !0)
          }),
            (o.prototype.get = function(t, e) {
              return this.data[t * this.size + e]
            }),
            (o.prototype.xor = function(t, e, r) {
              this.data[t * this.size + e] ^= r
            }),
            (o.prototype.isReserved = function(t, e) {
              return this.reservedBit[t * this.size + e]
            }),
            (e.exports = o)
        },
        { '../utils/buffer': 28 }
      ],
      6: [
        function(t, e, r) {
          var n = t('../utils/buffer')

          var o = t('./mode')
          function i(t) {
            ;(this.mode = o.BYTE), (this.data = new n(t))
          }
          ;(i.getBitsLength = function(t) {
            return 8 * t
          }),
            (i.prototype.getLength = function() {
              return this.data.length
            }),
            (i.prototype.getBitsLength = function() {
              return i.getBitsLength(this.data.length)
            }),
            (i.prototype.write = function(t) {
              for (var e = 0, r = this.data.length; e < r; e++)
                t.put(this.data[e], 8)
            }),
            (e.exports = i)
        },
        { '../utils/buffer': 28, './mode': 14 }
      ],
      7: [
        function(t, e, r) {
          var n = t('./error-correction-level')

          var o = [
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            2,
            2,
            1,
            2,
            2,
            4,
            1,
            2,
            4,
            4,
            2,
            4,
            4,
            4,
            2,
            4,
            6,
            5,
            2,
            4,
            6,
            6,
            2,
            5,
            8,
            8,
            4,
            5,
            8,
            8,
            4,
            5,
            8,
            11,
            4,
            8,
            10,
            11,
            4,
            9,
            12,
            16,
            4,
            9,
            16,
            16,
            6,
            10,
            12,
            18,
            6,
            10,
            17,
            16,
            6,
            11,
            16,
            19,
            6,
            13,
            18,
            21,
            7,
            14,
            21,
            25,
            8,
            16,
            20,
            25,
            8,
            17,
            23,
            25,
            9,
            17,
            23,
            34,
            9,
            18,
            25,
            30,
            10,
            20,
            27,
            32,
            12,
            21,
            29,
            35,
            12,
            23,
            34,
            37,
            12,
            25,
            34,
            40,
            13,
            26,
            35,
            42,
            14,
            28,
            38,
            45,
            15,
            29,
            40,
            48,
            16,
            31,
            43,
            51,
            17,
            33,
            45,
            54,
            18,
            35,
            48,
            57,
            19,
            37,
            51,
            60,
            19,
            38,
            53,
            63,
            20,
            40,
            56,
            66,
            21,
            43,
            59,
            70,
            22,
            45,
            62,
            74,
            24,
            47,
            65,
            77,
            25,
            49,
            68,
            81
          ]

          var i = [
            7,
            10,
            13,
            17,
            10,
            16,
            22,
            28,
            15,
            26,
            36,
            44,
            20,
            36,
            52,
            64,
            26,
            48,
            72,
            88,
            36,
            64,
            96,
            112,
            40,
            72,
            108,
            130,
            48,
            88,
            132,
            156,
            60,
            110,
            160,
            192,
            72,
            130,
            192,
            224,
            80,
            150,
            224,
            264,
            96,
            176,
            260,
            308,
            104,
            198,
            288,
            352,
            120,
            216,
            320,
            384,
            132,
            240,
            360,
            432,
            144,
            280,
            408,
            480,
            168,
            308,
            448,
            532,
            180,
            338,
            504,
            588,
            196,
            364,
            546,
            650,
            224,
            416,
            600,
            700,
            224,
            442,
            644,
            750,
            252,
            476,
            690,
            816,
            270,
            504,
            750,
            900,
            300,
            560,
            810,
            960,
            312,
            588,
            870,
            1050,
            336,
            644,
            952,
            1110,
            360,
            700,
            1020,
            1200,
            390,
            728,
            1050,
            1260,
            420,
            784,
            1140,
            1350,
            450,
            812,
            1200,
            1440,
            480,
            868,
            1290,
            1530,
            510,
            924,
            1350,
            1620,
            540,
            980,
            1440,
            1710,
            570,
            1036,
            1530,
            1800,
            570,
            1064,
            1590,
            1890,
            600,
            1120,
            1680,
            1980,
            630,
            1204,
            1770,
            2100,
            660,
            1260,
            1860,
            2220,
            720,
            1316,
            1950,
            2310,
            750,
            1372,
            2040,
            2430
          ]
          ;(r.getBlocksCount = function(t, e) {
            switch (e) {
              case n.L:
                return o[4 * (t - 1) + 0]
              case n.M:
                return o[4 * (t - 1) + 1]
              case n.Q:
                return o[4 * (t - 1) + 2]
              case n.H:
                return o[4 * (t - 1) + 3]
              default:
            }
          }),
            (r.getTotalCodewordsCount = function(t, e) {
              switch (e) {
                case n.L:
                  return i[4 * (t - 1) + 0]
                case n.M:
                  return i[4 * (t - 1) + 1]
                case n.Q:
                  return i[4 * (t - 1) + 2]
                case n.H:
                  return i[4 * (t - 1) + 3]
                default:
              }
            })
        },
        { './error-correction-level': 8 }
      ],
      8: [
        function(t, e, r) {
          ;(r.L = { bit: 1 }),
            (r.M = { bit: 0 }),
            (r.Q = { bit: 3 }),
            (r.H = { bit: 2 }),
            (r.isValid = function(t) {
              return t && void 0 !== t.bit && t.bit >= 0 && t.bit < 4
            }),
            (r.from = function(t, e) {
              if (r.isValid(t)) return t
              try {
                return (function(t) {
                  if (typeof t !== 'string')
                    throw new Error('Param is not a string')
                  switch (t.toLowerCase()) {
                    case 'l':
                    case 'low':
                      return r.L
                    case 'm':
                    case 'medium':
                      return r.M
                    case 'q':
                    case 'quartile':
                      return r.Q
                    case 'h':
                    case 'high':
                      return r.H
                    default:
                      throw new Error('Unknown EC Level: ' + t)
                  }
                })(t)
              } catch (t) {
                return e
              }
            })
        },
        {}
      ],
      9: [
        function(t, e, r) {
          var n = t('./utils').getSymbolSize
          r.getPositions = function(t) {
            var e = n(t)
            return [[0, 0], [e - 7, 0], [0, e - 7]]
          }
        },
        { './utils': 21 }
      ],
      10: [
        function(t, e, r) {
          var n = t('./utils')

          var o = n.getBCHDigit(1335)
          r.getEncodedBits = function(t, e) {
            for (
              var r = (t.bit << 3) | e, i = r << 10;
              n.getBCHDigit(i) - o >= 0;

            )
              i ^= 1335 << (n.getBCHDigit(i) - o)
            return 21522 ^ ((r << 10) | i)
          }
        },
        { './utils': 21 }
      ],
      11: [
        function(t, e, r) {
          var n = t('../utils/buffer')

          var o = new n(512)

          var i = new n(256)
          !(function() {
            for (var t = 1, e = 0; e < 255; e++)
              (o[e] = t), (i[t] = e), 256 & (t <<= 1) && (t ^= 285)
            for (e = 255; e < 512; e++) o[e] = o[e - 255]
          })(),
            (r.log = function(t) {
              if (t < 1) throw new Error('log(' + t + ')')
              return i[t]
            }),
            (r.exp = function(t) {
              return o[t]
            }),
            (r.mul = function(t, e) {
              return t === 0 || e === 0 ? 0 : o[i[t] + i[e]]
            })
        },
        { '../utils/buffer': 28 }
      ],
      12: [
        function(t, e, r) {
          var n = t('./mode')

          var o = t('./utils')
          function i(t) {
            ;(this.mode = n.KANJI), (this.data = t)
          }
          ;(i.getBitsLength = function(t) {
            return 13 * t
          }),
            (i.prototype.getLength = function() {
              return this.data.length
            }),
            (i.prototype.getBitsLength = function() {
              return i.getBitsLength(this.data.length)
            }),
            (i.prototype.write = function(t) {
              var e
              for (e = 0; e < this.data.length; e++) {
                var r = o.toSJIS(this.data[e])
                if (r >= 33088 && r <= 40956) r -= 33088
                else {
                  if (!(r >= 57408 && r <= 60351))
                    throw new Error(
                      'Invalid SJIS character: ' +
                        this.data[e] +
                        '\nMake sure your charset is UTF-8'
                    )
                  r -= 49472
                }
                ;(r = 192 * ((r >>> 8) & 255) + (255 & r)), t.put(r, 13)
              }
            }),
            (e.exports = i)
        },
        { './mode': 14, './utils': 21 }
      ],
      13: [
        function(t, e, r) {
          r.Patterns = {
            PATTERN000: 0,
            PATTERN001: 1,
            PATTERN010: 2,
            PATTERN011: 3,
            PATTERN100: 4,
            PATTERN101: 5,
            PATTERN110: 6,
            PATTERN111: 7
          }
          var n = { N1: 3, N2: 3, N3: 40, N4: 10 }
          function o(t, e, n) {
            switch (t) {
              case r.Patterns.PATTERN000:
                return (e + n) % 2 == 0
              case r.Patterns.PATTERN001:
                return e % 2 == 0
              case r.Patterns.PATTERN010:
                return n % 3 == 0
              case r.Patterns.PATTERN011:
                return (e + n) % 3 == 0
              case r.Patterns.PATTERN100:
                return (Math.floor(e / 2) + Math.floor(n / 3)) % 2 == 0
              case r.Patterns.PATTERN101:
                return ((e * n) % 2) + ((e * n) % 3) == 0
              case r.Patterns.PATTERN110:
                return (((e * n) % 2) + ((e * n) % 3)) % 2 == 0
              case r.Patterns.PATTERN111:
                return (((e * n) % 3) + ((e + n) % 2)) % 2 == 0
              default:
                throw new Error('bad maskPattern:' + t)
            }
          }
          ;(r.isValid = function(t) {
            return t != null && t !== '' && !isNaN(t) && t >= 0 && t <= 7
          }),
            (r.from = function(t) {
              return r.isValid(t) ? parseInt(t, 10) : void 0
            }),
            (r.getPenaltyN1 = function(t) {
              for (
                var e = t.size, r = 0, o = 0, i = 0, a = null, u = null, s = 0;
                s < e;
                s++
              ) {
                ;(o = i = 0), (a = u = null)
                for (var f = 0; f < e; f++) {
                  var c = t.get(s, f)
                  c === a
                    ? o++
                    : (o >= 5 && (r += n.N1 + (o - 5)), (a = c), (o = 1)),
                    (c = t.get(f, s)) === u
                      ? i++
                      : (i >= 5 && (r += n.N1 + (i - 5)), (u = c), (i = 1))
                }
                o >= 5 && (r += n.N1 + (o - 5)), i >= 5 && (r += n.N1 + (i - 5))
              }
              return r
            }),
            (r.getPenaltyN2 = function(t) {
              for (var e = t.size, r = 0, o = 0; o < e - 1; o++)
                for (var i = 0; i < e - 1; i++) {
                  var a =
                    t.get(o, i) +
                    t.get(o, i + 1) +
                    t.get(o + 1, i) +
                    t.get(o + 1, i + 1)
                  ;(a !== 4 && a !== 0) || r++
                }
              return r * n.N2
            }),
            (r.getPenaltyN3 = function(t) {
              for (var e = t.size, r = 0, o = 0, i = 0, a = 0; a < e; a++) {
                o = i = 0
                for (var u = 0; u < e; u++)
                  (o = ((o << 1) & 2047) | t.get(a, u)),
                    u >= 10 && (o === 1488 || o === 93) && r++,
                    (i = ((i << 1) & 2047) | t.get(u, a)),
                    u >= 10 && (i === 1488 || i === 93) && r++
              }
              return r * n.N3
            }),
            (r.getPenaltyN4 = function(t) {
              for (var e = 0, r = t.data.length, o = 0; o < r; o++)
                e += t.data[o]
              var i = Math.abs(Math.ceil((100 * e) / r / 5) - 10)
              return i * n.N4
            }),
            (r.applyMask = function(t, e) {
              for (var r = e.size, n = 0; n < r; n++)
                for (var i = 0; i < r; i++)
                  e.isReserved(i, n) || e.xor(i, n, o(t, i, n))
            }),
            (r.getBestMask = function(t, e) {
              for (
                var n = Object.keys(r.Patterns).length, o = 0, i = 1 / 0, a = 0;
                a < n;
                a++
              ) {
                e(a), r.applyMask(a, t)
                var u =
                  r.getPenaltyN1(t) +
                  r.getPenaltyN2(t) +
                  r.getPenaltyN3(t) +
                  r.getPenaltyN4(t)
                r.applyMask(a, t), u < i && ((i = u), (o = a))
              }
              return o
            })
        },
        {}
      ],
      14: [
        function(t, e, r) {
          var n = t('./version-check')

          var o = t('./regex')
          ;(r.NUMERIC = { id: 'Numeric', bit: 1, ccBits: [10, 12, 14] }),
            (r.ALPHANUMERIC = {
              id: 'Alphanumeric',
              bit: 2,
              ccBits: [9, 11, 13]
            }),
            (r.BYTE = { id: 'Byte', bit: 4, ccBits: [8, 16, 16] }),
            (r.KANJI = { id: 'Kanji', bit: 8, ccBits: [8, 10, 12] }),
            (r.MIXED = { bit: -1 }),
            (r.getCharCountIndicator = function(t, e) {
              if (!t.ccBits) throw new Error('Invalid mode: ' + t)
              if (!n.isValid(e)) throw new Error('Invalid version: ' + e)
              return e >= 1 && e < 10
                ? t.ccBits[0]
                : e < 27
                  ? t.ccBits[1]
                  : t.ccBits[2]
            }),
            (r.getBestModeForData = function(t) {
              return o.testNumeric(t)
                ? r.NUMERIC
                : o.testAlphanumeric(t)
                  ? r.ALPHANUMERIC
                  : o.testKanji(t)
                    ? r.KANJI
                    : r.BYTE
            }),
            (r.toString = function(t) {
              if (t && t.id) return t.id
              throw new Error('Invalid mode')
            }),
            (r.isValid = function(t) {
              return t && t.bit && t.ccBits
            }),
            (r.from = function(t, e) {
              if (r.isValid(t)) return t
              try {
                return (function(t) {
                  if (typeof t !== 'string')
                    throw new Error('Param is not a string')
                  switch (t.toLowerCase()) {
                    case 'numeric':
                      return r.NUMERIC
                    case 'alphanumeric':
                      return r.ALPHANUMERIC
                    case 'kanji':
                      return r.KANJI
                    case 'byte':
                      return r.BYTE
                    default:
                      throw new Error('Unknown mode: ' + t)
                  }
                })(t)
              } catch (t) {
                return e
              }
            })
        },
        { './regex': 19, './version-check': 22 }
      ],
      15: [
        function(t, e, r) {
          var n = t('./mode')
          function o(t) {
            ;(this.mode = n.NUMERIC), (this.data = t.toString())
          }
          ;(o.getBitsLength = function(t) {
            return 10 * Math.floor(t / 3) + (t % 3 ? (t % 3) * 3 + 1 : 0)
          }),
            (o.prototype.getLength = function() {
              return this.data.length
            }),
            (o.prototype.getBitsLength = function() {
              return o.getBitsLength(this.data.length)
            }),
            (o.prototype.write = function(t) {
              var e, r, n
              for (e = 0; e + 3 <= this.data.length; e += 3)
                (r = this.data.substr(e, 3)),
                  (n = parseInt(r, 10)),
                  t.put(n, 10)
              var o = this.data.length - e
              o > 0 &&
                ((r = this.data.substr(e)),
                (n = parseInt(r, 10)),
                t.put(n, 3 * o + 1))
            }),
            (e.exports = o)
        },
        { './mode': 14 }
      ],
      16: [
        function(t, e, r) {
          var n = t('../utils/buffer')

          var o = t('./galois-field')
          ;(r.mul = function(t, e) {
            var r = new n(t.length + e.length - 1)
            r.fill(0)
            for (var i = 0; i < t.length; i++)
              for (var a = 0; a < e.length; a++) r[i + a] ^= o.mul(t[i], e[a])
            return r
          }),
            (r.mod = function(t, e) {
              for (var r = new n(t); r.length - e.length >= 0; ) {
                for (var i = r[0], a = 0; a < e.length; a++)
                  r[a] ^= o.mul(e[a], i)
                for (var u = 0; u < r.length && r[u] === 0; ) u++
                r = r.slice(u)
              }
              return r
            }),
            (r.generateECPolynomial = function(t) {
              for (var e = new n([1]), i = 0; i < t; i++)
                e = r.mul(e, [1, o.exp(i)])
              return e
            })
        },
        { '../utils/buffer': 28, './galois-field': 11 }
      ],
      17: [
        function(t, e, r) {
          var n = t('../utils/buffer')

          var o = t('./utils')

          var i = t('./error-correction-level')

          var a = t('./bit-buffer')

          var u = t('./bit-matrix')

          var s = t('./alignment-pattern')

          var f = t('./finder-pattern')

          var c = t('./mask-pattern')

          var l = t('./error-correction-code')

          var d = t('./reed-solomon-encoder')

          var h = t('./version')

          var g = t('./format-info')

          var p = t('./mode')

          var v = t('./segments')

          var m = t('isarray')
          function y(t, e, r) {
            var n

            var o

            var i = t.size

            var a = g.getEncodedBits(e, r)
            for (n = 0; n < 15; n++)
              (o = ((a >> n) & 1) == 1),
                n < 6
                  ? t.set(n, 8, o, !0)
                  : n < 8
                    ? t.set(n + 1, 8, o, !0)
                    : t.set(i - 15 + n, 8, o, !0),
                n < 8
                  ? t.set(8, i - n - 1, o, !0)
                  : n < 9
                    ? t.set(8, 15 - n - 1 + 1, o, !0)
                    : t.set(8, 15 - n - 1, o, !0)
            t.set(i - 8, 8, 1, !0)
          }
          function w(t, e, r) {
            var i = new a()
            r.forEach(function(e) {
              i.put(e.mode.bit, 4),
                i.put(e.getLength(), p.getCharCountIndicator(e.mode, t)),
                e.write(i)
            })
            var u = o.getSymbolTotalCodewords(t)

            var s = l.getTotalCodewordsCount(t, e)

            var f = 8 * (u - s)
            for (
              i.getLengthInBits() + 4 <= f && i.put(0, 4);
              i.getLengthInBits() % 8 != 0;

            )
              i.putBit(0)
            for (var c = (f - i.getLengthInBits()) / 8, h = 0; h < c; h++)
              i.put(h % 2 ? 17 : 236, 8)
            return (function(t, e, r) {
              for (
                var i = o.getSymbolTotalCodewords(e),
                  a = l.getTotalCodewordsCount(e, r),
                  u = i - a,
                  s = l.getBlocksCount(e, r),
                  f = s - (i % s),
                  c = Math.floor(i / s),
                  h = Math.floor(u / s),
                  g = h + 1,
                  p = c - h,
                  v = new d(p),
                  m = 0,
                  y = new Array(s),
                  w = new Array(s),
                  _ = 0,
                  E = new n(t.buffer),
                  b = 0;
                b < s;
                b++
              ) {
                var A = b < f ? h : g
                ;(y[b] = E.slice(m, m + A)),
                  (w[b] = v.encode(y[b])),
                  (m += A),
                  (_ = Math.max(_, A))
              }
              var R

              var C

              var B = new n(i)

              var T = 0
              for (R = 0; R < _; R++)
                for (C = 0; C < s; C++) R < y[C].length && (B[T++] = y[C][R])
              for (R = 0; R < p; R++) for (C = 0; C < s; C++) B[T++] = w[C][R]
              return B
            })(i, t, e)
          }
          function _(t, e, r, n) {
            var i
            if (m(t)) i = v.fromArray(t)
            else {
              if (typeof t !== 'string') throw new Error('Invalid data')
              var a = e
              if (!a) {
                var l = v.rawSplit(t)
                a = h.getBestVersionForData(l, r)
              }
              i = v.fromString(t, a || 40)
            }
            var d = h.getBestVersionForData(i, r)
            if (!d)
              throw new Error(
                'The amount of data is too big to be stored in a QR Code'
              )
            if (e) {
              if (e < d)
                throw new Error(
                  '\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: ' +
                    d +
                    '.\n'
                )
            } else e = d
            var g = w(e, r, i)

            var p = o.getSymbolSize(e)

            var _ = new u(p)
            return (
              (function(t, e) {
                for (
                  var r = t.size, n = f.getPositions(e), o = 0;
                  o < n.length;
                  o++
                )
                  for (var i = n[o][0], a = n[o][1], u = -1; u <= 7; u++)
                    if (!(i + u <= -1 || r <= i + u))
                      for (var s = -1; s <= 7; s++)
                        a + s <= -1 ||
                          r <= a + s ||
                          ((u >= 0 && u <= 6 && (s === 0 || s === 6)) ||
                          (s >= 0 && s <= 6 && (u === 0 || u === 6)) ||
                          (u >= 2 && u <= 4 && s >= 2 && s <= 4)
                            ? t.set(i + u, a + s, !0, !0)
                            : t.set(i + u, a + s, !1, !0))
              })(_, e),
              (function(t) {
                for (var e = t.size, r = 8; r < e - 8; r++) {
                  var n = r % 2 == 0
                  t.set(r, 6, n, !0), t.set(6, r, n, !0)
                }
              })(_),
              (function(t, e) {
                for (var r = s.getPositions(e), n = 0; n < r.length; n++)
                  for (var o = r[n][0], i = r[n][1], a = -2; a <= 2; a++)
                    for (var u = -2; u <= 2; u++)
                      a === -2 ||
                      a === 2 ||
                      u === -2 ||
                      u === 2 ||
                      (a === 0 && u === 0)
                        ? t.set(o + a, i + u, !0, !0)
                        : t.set(o + a, i + u, !1, !0)
              })(_, e),
              y(_, r, 0),
              e >= 7 &&
                (function(t, e) {
                  for (
                    var r, n, o, i = t.size, a = h.getEncodedBits(e), u = 0;
                    u < 18;
                    u++
                  )
                    (r = Math.floor(u / 3)),
                      (n = (u % 3) + i - 8 - 3),
                      (o = ((a >> u) & 1) == 1),
                      t.set(r, n, o, !0),
                      t.set(n, r, o, !0)
                })(_, e),
              (function(t, e) {
                for (
                  var r = t.size, n = -1, o = r - 1, i = 7, a = 0, u = r - 1;
                  u > 0;
                  u -= 2
                )
                  for (u === 6 && u--; ; ) {
                    for (var s = 0; s < 2; s++)
                      if (!t.isReserved(o, u - s)) {
                        var f = !1
                        a < e.length && (f = ((e[a] >>> i) & 1) == 1),
                          t.set(o, u - s, f),
                          --i == -1 && (a++, (i = 7))
                      }
                    if ((o += n) < 0 || r <= o) {
                      ;(o -= n), (n = -n)
                      break
                    }
                  }
              })(_, g),
              isNaN(n) && (n = c.getBestMask(_, y.bind(null, _, r))),
              c.applyMask(n, _),
              y(_, r, n),
              {
                modules: _,
                version: e,
                errorCorrectionLevel: r,
                maskPattern: n,
                segments: i
              }
            )
          }
          r.create = function(t, e) {
            if (void 0 === t || t === '') throw new Error('No input text')
            var r

            var n

            var a = i.M
            return (
              void 0 !== e &&
                ((a = i.from(e.errorCorrectionLevel, i.M)),
                (r = h.from(e.version)),
                (n = c.from(e.maskPattern)),
                e.toSJISFunc && o.setToSJISFunction(e.toSJISFunc)),
              _(t, r, a, n)
            )
          }
        },
        {
          '../utils/buffer': 28,
          './alignment-pattern': 2,
          './bit-buffer': 4,
          './bit-matrix': 5,
          './error-correction-code': 7,
          './error-correction-level': 8,
          './finder-pattern': 9,
          './format-info': 10,
          './mask-pattern': 13,
          './mode': 14,
          './reed-solomon-encoder': 18,
          './segments': 20,
          './utils': 21,
          './version': 23,
          isarray: 30
        }
      ],
      18: [
        function(t, e, r) {
          var n = t('../utils/buffer')

          var o = t('./polynomial')
          function i(t) {
            ;(this.genPoly = void 0),
              (this.degree = t),
              this.degree && this.initialize(this.degree)
          }
          ;(i.prototype.initialize = function(t) {
            ;(this.degree = t),
              (this.genPoly = o.generateECPolynomial(this.degree))
          }),
            (i.prototype.encode = function(t) {
              if (!this.genPoly) throw new Error('Encoder not initialized')
              var e = new n(this.degree)
              e.fill(0)
              var r = n.concat([t, e], t.length + this.degree)

              var i = o.mod(r, this.genPoly)

              var a = this.degree - i.length
              if (a > 0) {
                var u = new n(this.degree)
                return u.fill(0), i.copy(u, a), u
              }
              return i
            }),
            (e.exports = i)
        },
        { '../utils/buffer': 28, './polynomial': 16 }
      ],
      19: [
        function(t, e, r) {
          var n =
            '(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+'

          var o =
            '(?:(?![A-Z0-9 $%*+\\-./:]|' +
            (n = n.replace(/u/g, '\\u')) +
            ')(?:.|[\r\n]))+'
          ;(r.KANJI = new RegExp(n, 'g')),
            (r.BYTE_KANJI = new RegExp('[^A-Z0-9 $%*+\\-./:]+', 'g')),
            (r.BYTE = new RegExp(o, 'g')),
            (r.NUMERIC = new RegExp('[0-9]+', 'g')),
            (r.ALPHANUMERIC = new RegExp('[A-Z $%*+\\-./:]+', 'g'))
          var i = new RegExp('^' + n + '$')

          var a = new RegExp('^[0-9]+$')

          var u = new RegExp('^[A-Z0-9 $%*+\\-./:]+$')
          ;(r.testKanji = function(t) {
            return i.test(t)
          }),
            (r.testNumeric = function(t) {
              return a.test(t)
            }),
            (r.testAlphanumeric = function(t) {
              return u.test(t)
            })
        },
        {}
      ],
      20: [
        function(t, e, r) {
          var n = t('./mode')

          var o = t('./numeric-data')

          var i = t('./alphanumeric-data')

          var a = t('./byte-data')

          var u = t('./kanji-data')

          var s = t('./regex')

          var f = t('./utils')

          var c = t('dijkstrajs')
          function l(t) {
            return unescape(encodeURIComponent(t)).length
          }
          function d(t, e, r) {
            for (var n, o = []; (n = t.exec(r)) !== null; )
              o.push({
                data: n[0],
                index: n.index,
                mode: e,
                length: n[0].length
              })
            return o
          }
          function h(t) {
            var e

            var r

            var o = d(s.NUMERIC, n.NUMERIC, t)

            var i = d(s.ALPHANUMERIC, n.ALPHANUMERIC, t)
            f.isKanjiModeEnabled()
              ? ((e = d(s.BYTE, n.BYTE, t)), (r = d(s.KANJI, n.KANJI, t)))
              : ((e = d(s.BYTE_KANJI, n.BYTE, t)), (r = []))
            var a = o.concat(i, e, r)
            return a
              .sort(function(t, e) {
                return t.index - e.index
              })
              .map(function(t) {
                return { data: t.data, mode: t.mode, length: t.length }
              })
          }
          function g(t, e) {
            switch (e) {
              case n.NUMERIC:
                return o.getBitsLength(t)
              case n.ALPHANUMERIC:
                return i.getBitsLength(t)
              case n.KANJI:
                return u.getBitsLength(t)
              case n.BYTE:
                return a.getBitsLength(t)
            }
          }
          function p(t, e) {
            var r

            var s = n.getBestModeForData(t)
            if ((r = n.from(e, s)) !== n.BYTE && r.bit < s.bit)
              throw new Error(
                '"' +
                  t +
                  '" cannot be encoded with mode ' +
                  n.toString(r) +
                  '.\n Suggested mode is: ' +
                  n.toString(s)
              )
            switch (
              (r !== n.KANJI || f.isKanjiModeEnabled() || (r = n.BYTE), r)
            ) {
              case n.NUMERIC:
                return new o(t)
              case n.ALPHANUMERIC:
                return new i(t)
              case n.KANJI:
                return new u(t)
              case n.BYTE:
                return new a(t)
            }
          }
          ;(r.fromArray = function(t) {
            return t.reduce(function(t, e) {
              return (
                typeof e === 'string'
                  ? t.push(p(e, null))
                  : e.data && t.push(p(e.data, e.mode)),
                t
              )
            }, [])
          }),
            (r.fromString = function(t, e) {
              for (
                var o = h(t, f.isKanjiModeEnabled()),
                  i = (function(t) {
                    for (var e = [], r = 0; r < t.length; r++) {
                      var o = t[r]
                      switch (o.mode) {
                        case n.NUMERIC:
                          e.push([
                            o,
                            {
                              data: o.data,
                              mode: n.ALPHANUMERIC,
                              length: o.length
                            },
                            { data: o.data, mode: n.BYTE, length: o.length }
                          ])
                          break
                        case n.ALPHANUMERIC:
                          e.push([
                            o,
                            { data: o.data, mode: n.BYTE, length: o.length }
                          ])
                          break
                        case n.KANJI:
                          e.push([
                            o,
                            { data: o.data, mode: n.BYTE, length: l(o.data) }
                          ])
                          break
                        case n.BYTE:
                          e.push([
                            { data: o.data, mode: n.BYTE, length: l(o.data) }
                          ])
                      }
                    }
                    return e
                  })(o),
                  a = (function(t, e) {
                    for (
                      var r = {}, o = { start: {} }, i = ['start'], a = 0;
                      a < t.length;
                      a++
                    ) {
                      for (var u = t[a], s = [], f = 0; f < u.length; f++) {
                        var c = u[f]

                        var l = '' + a + f
                        s.push(l),
                          (r[l] = { node: c, lastCount: 0 }),
                          (o[l] = {})
                        for (var d = 0; d < i.length; d++) {
                          var h = i[d]
                          r[h] && r[h].node.mode === c.mode
                            ? ((o[h][l] =
                                g(r[h].lastCount + c.length, c.mode) -
                                g(r[h].lastCount, c.mode)),
                              (r[h].lastCount += c.length))
                            : (r[h] && (r[h].lastCount = c.length),
                              (o[h][l] =
                                g(c.length, c.mode) +
                                4 +
                                n.getCharCountIndicator(c.mode, e)))
                        }
                      }
                      i = s
                    }
                    for (d = 0; d < i.length; d++) o[i[d]].end = 0
                    return { map: o, table: r }
                  })(i, e),
                  u = c.find_path(a.map, 'start', 'end'),
                  s = [],
                  d = 1;
                d < u.length - 1;
                d++
              )
                s.push(a.table[u[d]].node)
              return r.fromArray(
                (function(t) {
                  return t.reduce(function(t, e) {
                    var r = t.length - 1 >= 0 ? t[t.length - 1] : null
                    return r && r.mode === e.mode
                      ? ((t[t.length - 1].data += e.data), t)
                      : (t.push(e), t)
                  }, [])
                })(s)
              )
            }),
            (r.rawSplit = function(t) {
              return r.fromArray(h(t, f.isKanjiModeEnabled()))
            })
        },
        {
          './alphanumeric-data': 3,
          './byte-data': 6,
          './kanji-data': 12,
          './mode': 14,
          './numeric-data': 15,
          './regex': 19,
          './utils': 21,
          dijkstrajs: 29
        }
      ],
      21: [
        function(t, e, r) {
          var n

          var o = [
            0,
            26,
            44,
            70,
            100,
            134,
            172,
            196,
            242,
            292,
            346,
            404,
            466,
            532,
            581,
            655,
            733,
            815,
            901,
            991,
            1085,
            1156,
            1258,
            1364,
            1474,
            1588,
            1706,
            1828,
            1921,
            2051,
            2185,
            2323,
            2465,
            2611,
            2761,
            2876,
            3034,
            3196,
            3362,
            3532,
            3706
          ]
          ;(r.getSymbolSize = function(t) {
            if (!t) throw new Error('"version" cannot be null or undefined')
            if (t < 1 || t > 40)
              throw new Error('"version" should be in range from 1 to 40')
            return 4 * t + 17
          }),
            (r.getSymbolTotalCodewords = function(t) {
              return o[t]
            }),
            (r.getBCHDigit = function(t) {
              for (var e = 0; t !== 0; ) e++, (t >>>= 1)
              return e
            }),
            (r.setToSJISFunction = function(t) {
              if (typeof t !== 'function')
                throw new Error('"toSJISFunc" is not a valid function.')
              n = t
            }),
            (r.isKanjiModeEnabled = function() {
              return void 0 !== n
            }),
            (r.toSJIS = function(t) {
              return n(t)
            })
        },
        {}
      ],
      22: [
        function(t, e, r) {
          r.isValid = function(t) {
            return !isNaN(t) && t >= 1 && t <= 40
          }
        },
        {}
      ],
      23: [
        function(t, e, r) {
          var n = t('./utils')

          var o = t('./error-correction-code')

          var i = t('./error-correction-level')

          var a = t('./mode')

          var u = t('./version-check')

          var s = t('isarray')

          var f = n.getBCHDigit(7973)
          function c(t, e) {
            return a.getCharCountIndicator(t, e) + 4
          }
          function l(t, e) {
            var r = 0
            return (
              t.forEach(function(t) {
                var n = c(t.mode, e)
                r += n + t.getBitsLength()
              }),
              r
            )
          }
          ;(r.from = function(t, e) {
            return u.isValid(t) ? parseInt(t, 10) : e
          }),
            (r.getCapacity = function(t, e, r) {
              if (!u.isValid(t)) throw new Error('Invalid QR Code version')
              void 0 === r && (r = a.BYTE)
              var i = n.getSymbolTotalCodewords(t)

              var s = o.getTotalCodewordsCount(t, e)

              var f = 8 * (i - s)
              if (r === a.MIXED) return f
              var l = f - c(r, t)
              switch (r) {
                case a.NUMERIC:
                  return Math.floor((l / 10) * 3)
                case a.ALPHANUMERIC:
                  return Math.floor((l / 11) * 2)
                case a.KANJI:
                  return Math.floor(l / 13)
                case a.BYTE:
                default:
                  return Math.floor(l / 8)
              }
            }),
            (r.getBestVersionForData = function(t, e) {
              var n

              var o = i.from(e, i.M)
              if (s(t)) {
                if (t.length > 1)
                  return (function(t, e) {
                    for (var n = 1; n <= 40; n++) {
                      var o = l(t, n)
                      if (o <= r.getCapacity(n, e, a.MIXED)) return n
                    }
                  })(t, o)
                if (t.length === 0) return 1
                n = t[0]
              } else n = t
              return (function(t, e, n) {
                for (var o = 1; o <= 40; o++)
                  if (e <= r.getCapacity(o, n, t)) return o
              })(n.mode, n.getLength(), o)
            }),
            (r.getEncodedBits = function(t) {
              if (!u.isValid(t) || t < 7)
                throw new Error('Invalid QR Code version')
              for (var e = t << 12; n.getBCHDigit(e) - f >= 0; )
                e ^= 7973 << (n.getBCHDigit(e) - f)
              return (t << 12) | e
            })
        },
        {
          './error-correction-code': 7,
          './error-correction-level': 8,
          './mode': 14,
          './utils': 21,
          './version-check': 22,
          isarray: 30
        }
      ],
      24: [
        function(t, e, r) {
          var n = t('./can-promise')

          var o = t('./core/qrcode')

          var i = t('./renderer/canvas')

          var a = t('./renderer/svg-tag.js')
          function u(t, e, r, i, a) {
            var u = [].slice.call(arguments, 1)

            var s = u.length

            var f = typeof u[s - 1] === 'function'
            if (!f && !n())
              throw new Error('Callback required as last argument')
            if (!f) {
              if (s < 1) throw new Error('Too few arguments provided')
              return (
                s === 1
                  ? ((r = e), (e = i = void 0))
                  : s !== 2 || e.getContext || ((i = r), (r = e), (e = void 0)),
                new Promise(function(n, a) {
                  try {
                    var u = o.create(r, i)
                    n(t(u, e, i))
                  } catch (t) {
                    a(t)
                  }
                })
              )
            }
            if (s < 2) throw new Error('Too few arguments provided')
            s === 2
              ? ((a = r), (r = e), (e = i = void 0))
              : s === 3 &&
                (e.getContext && void 0 === a
                  ? ((a = i), (i = void 0))
                  : ((a = i), (i = r), (r = e), (e = void 0)))
            try {
              var c = o.create(r, i)
              a(null, t(c, e, i))
            } catch (t) {
              a(t)
            }
          }
          ;(r.create = o.create),
            (r.toCanvas = u.bind(null, i.render)),
            (r.toDataURL = u.bind(null, i.renderToDataURL)),
            (r.toString = u.bind(null, function(t, e, r) {
              return a.render(t, r)
            }))
        },
        {
          './can-promise': 1,
          './core/qrcode': 17,
          './renderer/canvas': 25,
          './renderer/svg-tag.js': 26
        }
      ],
      25: [
        function(t, e, r) {
          var n = t('./utils')
          ;(r.render = function(t, e, r) {
            var o = r

            var i = e
            void 0 !== o || (e && e.getContext) || ((o = e), (e = void 0)),
              e ||
                (i = (function() {
                  try {
                    return document.createElement('canvas')
                  } catch (t) {
                    throw new Error('You need to specify a canvas element')
                  }
                })()),
              (o = n.getOptions(o))
            var a = n.getImageWidth(t.modules.size, o)

            var u = i.getContext('2d')

            var s = u.createImageData(a, a)
            return (
              n.qrToImageData(s.data, t, o),
              (function(t, e, r) {
                t.clearRect(0, 0, e.width, e.height),
                  e.style || (e.style = {}),
                  (e.height = r),
                  (e.width = r),
                  (e.style.height = r + 'px'),
                  (e.style.width = r + 'px')
              })(u, i, a),
              u.putImageData(s, 0, 0),
              i
            )
          }),
            (r.renderToDataURL = function(t, e, n) {
              var o = n
              void 0 !== o || (e && e.getContext) || ((o = e), (e = void 0)),
                o || (o = {})
              var i = r.render(t, e, o)

              var a = o.type || 'image/png'

              var u = o.rendererOpts || {}
              return i.toDataURL(a, u.quality)
            })
        },
        { './utils': 27 }
      ],
      26: [
        function(t, e, r) {
          var n = t('./utils')
          function o(t, e) {
            var r = t.a / 255

            var n = e + '="' + t.hex + '"'
            return r < 1
              ? n + ' ' + e + '-opacity="' + r.toFixed(2).slice(1) + '"'
              : n
          }
          function i(t, e, r) {
            var n = t + e
            return void 0 !== r && (n += ' ' + r), n
          }
          r.render = function(t, e, r) {
            var a = n.getOptions(e)

            var u = t.modules.size

            var s = t.modules.data

            var f = u + 2 * a.margin

            var c = a.color.light.a
              ? '<path ' +
                o(a.color.light, 'fill') +
                ' d="M0 0h' +
                f +
                'v' +
                f +
                'H0z"/>'
              : ''

            var l =
              '<path ' +
              o(a.color.dark, 'stroke') +
              ' d="' +
              (function(t, e, r) {
                for (
                  var n = '', o = 0, a = !1, u = 0, s = 0;
                  s < t.length;
                  s++
                ) {
                  var f = Math.floor(s % e)

                  var c = Math.floor(s / e)
                  f || a || (a = !0),
                    t[s]
                      ? (u++,
                        (s > 0 && f > 0 && t[s - 1]) ||
                          ((n += a ? i('M', f + r, 0.5 + c + r) : i('m', o, 0)),
                          (o = 0),
                          (a = !1)),
                        (f + 1 < e && t[s + 1]) || ((n += i('h', u)), (u = 0)))
                      : o++
                }
                return n
              })(s, u, a.margin) +
              '"/>'

            var d = 'viewBox="0 0 ' + f + ' ' + f + '"'

            var h = a.width
              ? 'width="' + a.width + '" height="' + a.width + '" '
              : ''

            var g =
              '<svg xmlns="http://www.w3.org/2000/svg" ' +
              h +
              d +
              ' shape-rendering="crispEdges">' +
              c +
              l +
              '</svg>\n'
            return typeof r === 'function' && r(null, g), g
          }
        },
        { './utils': 27 }
      ],
      27: [
        function(t, e, r) {
          function n(t) {
            if (typeof t !== 'string')
              throw new Error('Color should be defined as hex string')
            var e = t
              .slice()
              .replace('#', '')
              .split('')
            if (e.length < 3 || e.length === 5 || e.length > 8)
              throw new Error('Invalid hex color: ' + t)
            ;(e.length !== 3 && e.length !== 4) ||
              (e = Array.prototype.concat.apply(
                [],
                e.map(function(t) {
                  return [t, t]
                })
              )),
              e.length === 6 && e.push('F', 'F')
            var r = parseInt(e.join(''), 16)
            return {
              r: (r >> 24) & 255,
              g: (r >> 16) & 255,
              b: (r >> 8) & 255,
              a: 255 & r,
              hex: '#' + e.slice(0, 6).join('')
            }
          }
          ;(r.getOptions = function(t) {
            t || (t = {}), t.color || (t.color = {})
            var e =
              void 0 === t.margin || t.margin === null || t.margin < 0
                ? 4
                : t.margin

            var r = t.width && t.width >= 21 ? t.width : void 0

            var o = t.scale || 4
            return {
              width: r,
              scale: r ? 4 : o,
              margin: e,
              color: {
                dark: n(t.color.dark || '#000000ff'),
                light: n(t.color.light || '#ffffffff')
              },
              type: t.type,
              rendererOpts: t.rendererOpts || {}
            }
          }),
            (r.getScale = function(t, e) {
              return e.width && e.width >= t + 2 * e.margin
                ? e.width / (t + 2 * e.margin)
                : e.scale
            }),
            (r.getImageWidth = function(t, e) {
              var n = r.getScale(t, e)
              return Math.floor((t + 2 * e.margin) * n)
            }),
            (r.qrToImageData = function(t, e, n) {
              for (
                var o = e.modules.size,
                  i = e.modules.data,
                  a = r.getScale(o, n),
                  u = Math.floor((o + 2 * n.margin) * a),
                  s = n.margin * a,
                  f = [n.color.light, n.color.dark],
                  c = 0;
                c < u;
                c++
              )
                for (var l = 0; l < u; l++) {
                  var d = 4 * (c * u + l)

                  var h = n.color.light
                  if (c >= s && l >= s && c < u - s && l < u - s) {
                    var g = Math.floor((c - s) / a)

                    var p = Math.floor((l - s) / a)
                    h = f[i[g * o + p] ? 1 : 0]
                  }
                  ;(t[d++] = h.r), (t[d++] = h.g), (t[d++] = h.b), (t[d] = h.a)
                }
            })
        },
        {}
      ],
      28: [
        function(t, e, r) {
          var n = t('isarray')
          i.TYPED_ARRAY_SUPPORT = (function() {
            try {
              var t = new Uint8Array(1)
              return (
                (t.__proto__ = {
                  __proto__: Uint8Array.prototype,
                  foo: function() {
                    return 42
                  }
                }),
                t.foo() === 42
              )
            } catch (t) {
              return !1
            }
          })()
          var o = i.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
          function i(t, e, r) {
            return i.TYPED_ARRAY_SUPPORT || this instanceof i
              ? typeof t === 'number'
                ? s(this, t)
                : (function(t, e, r, n) {
                    if (typeof e === 'number')
                      throw new TypeError(
                        '"value" argument must not be a number'
                      )
                    return typeof ArrayBuffer !== 'undefined' &&
                      e instanceof ArrayBuffer
                      ? (function(t, e, r, n) {
                          if (r < 0 || e.byteLength < r)
                            throw new RangeError("'offset' is out of bounds")
                          if (e.byteLength < r + (n || 0))
                            throw new RangeError("'length' is out of bounds")
                          var o
                          return (
                            (o =
                              void 0 === r && void 0 === n
                                ? new Uint8Array(e)
                                : void 0 === n
                                  ? new Uint8Array(e, r)
                                  : new Uint8Array(e, r, n)),
                            i.TYPED_ARRAY_SUPPORT
                              ? (o.__proto__ = i.prototype)
                              : (o = f(t, o)),
                            o
                          )
                        })(t, e, r, n)
                      : typeof e === 'string'
                        ? (function(t, e) {
                            var r = 0 | l(e)

                            var n = u(t, r)

                            var o = n.write(e)
                            return o !== r && (n = n.slice(0, o)), n
                          })(t, e)
                        : (function(t, e) {
                            if (i.isBuffer(e)) {
                              var r = 0 | a(e.length)

                              var n = u(t, r)
                              return n.length === 0
                                ? n
                                : (e.copy(n, 0, 0, r), n)
                            }
                            if (e) {
                              if (
                                (typeof ArrayBuffer !== 'undefined' &&
                                  e.buffer instanceof ArrayBuffer) ||
                                'length' in e
                              )
                                return typeof e.length !== 'number' ||
                                  (o = e.length) != o
                                  ? u(t, 0)
                                  : f(t, e)
                              if (e.type === 'Buffer' && Array.isArray(e.data))
                                return f(t, e.data)
                            }
                            var o
                            throw new TypeError(
                              'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.'
                            )
                          })(t, e)
                  })(this, t, e, r)
              : new i(t, e, r)
          }
          function a(t) {
            if (t >= o)
              throw new RangeError(
                'Attempt to allocate Buffer larger than maximum size: 0x' +
                  o.toString(16) +
                  ' bytes'
              )
            return 0 | t
          }
          function u(t, e) {
            var r
            return (
              i.TYPED_ARRAY_SUPPORT
                ? ((r = new Uint8Array(e)).__proto__ = i.prototype)
                : ((r = t) === null && (r = new i(e)), (r.length = e)),
              r
            )
          }
          function s(t, e) {
            var r = u(t, e < 0 ? 0 : 0 | a(e))
            if (!i.TYPED_ARRAY_SUPPORT) for (var n = 0; n < e; ++n) r[n] = 0
            return r
          }
          function f(t, e) {
            for (
              var r = e.length < 0 ? 0 : 0 | a(e.length), n = u(t, r), o = 0;
              o < r;
              o += 1
            )
              n[o] = 255 & e[o]
            return n
          }
          function c(t, e) {
            var r
            e = e || 1 / 0
            for (var n = t.length, o = null, i = [], a = 0; a < n; ++a) {
              if ((r = t.charCodeAt(a)) > 55295 && r < 57344) {
                if (!o) {
                  if (r > 56319) {
                    ;(e -= 3) > -1 && i.push(239, 191, 189)
                    continue
                  }
                  if (a + 1 === n) {
                    ;(e -= 3) > -1 && i.push(239, 191, 189)
                    continue
                  }
                  o = r
                  continue
                }
                if (r < 56320) {
                  ;(e -= 3) > -1 && i.push(239, 191, 189), (o = r)
                  continue
                }
                r = 65536 + (((o - 55296) << 10) | (r - 56320))
              } else o && (e -= 3) > -1 && i.push(239, 191, 189)
              if (((o = null), r < 128)) {
                if ((e -= 1) < 0) break
                i.push(r)
              } else if (r < 2048) {
                if ((e -= 2) < 0) break
                i.push((r >> 6) | 192, (63 & r) | 128)
              } else if (r < 65536) {
                if ((e -= 3) < 0) break
                i.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (63 & r) | 128)
              } else {
                if (!(r < 1114112)) throw new Error('Invalid code point')
                if ((e -= 4) < 0) break
                i.push(
                  (r >> 18) | 240,
                  ((r >> 12) & 63) | 128,
                  ((r >> 6) & 63) | 128,
                  (63 & r) | 128
                )
              }
            }
            return i
          }
          function l(t) {
            if (i.isBuffer(t)) return t.length
            if (
              typeof ArrayBuffer !== 'undefined' &&
              typeof ArrayBuffer.isView === 'function' &&
              (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)
            )
              return t.byteLength
            typeof t !== 'string' && (t = '' + t)
            var e = t.length
            return e === 0 ? 0 : c(t).length
          }
          i.TYPED_ARRAY_SUPPORT &&
            ((i.prototype.__proto__ = Uint8Array.prototype),
            (i.__proto__ = Uint8Array),
            typeof Symbol !== 'undefined' &&
              Symbol.species &&
              i[Symbol.species] === i &&
              Object.defineProperty(i, Symbol.species, {
                value: null,
                configurable: !0,
                enumerable: !1,
                writable: !1
              })),
            (i.prototype.write = function(t, e, r) {
              void 0 === e
                ? ((r = this.length), (e = 0))
                : void 0 === r && typeof e === 'string'
                  ? ((r = this.length), (e = 0))
                  : isFinite(e) &&
                    ((e |= 0), isFinite(r) ? (r |= 0) : (r = void 0))
              var n = this.length - e
              if (
                ((void 0 === r || r > n) && (r = n),
                (t.length > 0 && (r < 0 || e < 0)) || e > this.length)
              )
                throw new RangeError('Attempt to write outside buffer bounds')
              return (function(t, e, r, n) {
                return (function(t, e, r, n) {
                  for (
                    var o = 0;
                    o < n && !(o + r >= e.length || o >= t.length);
                    ++o
                  )
                    e[o + r] = t[o]
                  return o
                })(c(e, t.length - r), t, r, n)
              })(this, t, e, r)
            }),
            (i.prototype.slice = function(t, e) {
              var r

              var n = this.length
              if (
                ((t = ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n),
                (e = void 0 === e ? n : ~~e) < 0
                  ? (e += n) < 0 && (e = 0)
                  : e > n && (e = n),
                e < t && (e = t),
                i.TYPED_ARRAY_SUPPORT)
              )
                (r = this.subarray(t, e)).__proto__ = i.prototype
              else {
                var o = e - t
                r = new i(o, void 0)
                for (var a = 0; a < o; ++a) r[a] = this[a + t]
              }
              return r
            }),
            (i.prototype.copy = function(t, e, r, n) {
              if (
                (r || (r = 0),
                n || n === 0 || (n = this.length),
                e >= t.length && (e = t.length),
                e || (e = 0),
                n > 0 && n < r && (n = r),
                n === r)
              )
                return 0
              if (t.length === 0 || this.length === 0) return 0
              if (e < 0) throw new RangeError('targetStart out of bounds')
              if (r < 0 || r >= this.length)
                throw new RangeError('sourceStart out of bounds')
              if (n < 0) throw new RangeError('sourceEnd out of bounds')
              n > this.length && (n = this.length),
                t.length - e < n - r && (n = t.length - e + r)
              var o

              var a = n - r
              if (this === t && r < e && e < n)
                for (o = a - 1; o >= 0; --o) t[o + e] = this[o + r]
              else if (a < 1e3 || !i.TYPED_ARRAY_SUPPORT)
                for (o = 0; o < a; ++o) t[o + e] = this[o + r]
              else Uint8Array.prototype.set.call(t, this.subarray(r, r + a), e)
              return a
            }),
            (i.prototype.fill = function(t, e, r) {
              if (typeof t === 'string') {
                if (
                  (typeof e === 'string'
                    ? ((e = 0), (r = this.length))
                    : typeof r === 'string' && (r = this.length),
                  t.length === 1)
                ) {
                  var n = t.charCodeAt(0)
                  n < 256 && (t = n)
                }
              } else typeof t === 'number' && (t &= 255)
              if (e < 0 || this.length < e || this.length < r)
                throw new RangeError('Out of range index')
              if (r <= e) return this
              var o
              if (
                ((e >>>= 0),
                (r = void 0 === r ? this.length : r >>> 0),
                t || (t = 0),
                typeof t === 'number')
              )
                for (o = e; o < r; ++o) this[o] = t
              else {
                var a = i.isBuffer(t) ? t : new i(t)

                var u = a.length
                for (o = 0; o < r - e; ++o) this[o + e] = a[o % u]
              }
              return this
            }),
            (i.concat = function(t, e) {
              if (!n(t))
                throw new TypeError(
                  '"list" argument must be an Array of Buffers'
                )
              if (t.length === 0) return u(null, 0)
              var r
              if (void 0 === e)
                for (e = 0, r = 0; r < t.length; ++r) e += t[r].length
              var o = s(null, e)

              var a = 0
              for (r = 0; r < t.length; ++r) {
                var f = t[r]
                if (!i.isBuffer(f))
                  throw new TypeError(
                    '"list" argument must be an Array of Buffers'
                  )
                f.copy(o, a), (a += f.length)
              }
              return o
            }),
            (i.byteLength = l),
            (i.prototype._isBuffer = !0),
            (i.isBuffer = function(t) {
              return !(t == null || !t._isBuffer)
            }),
            (e.exports = i)
        },
        { isarray: 30 }
      ],
      29: [
        function(t, e, r) {
          var n = {
            single_source_shortest_paths: function(t, e, r) {
              var o = {}

              var i = {}
              i[e] = 0
              var a

              var u

              var s

              var f

              var c

              var l

              var d

              var h

              var g = n.PriorityQueue.make()
              for (g.push(e, 0); !g.empty(); )
                for (s in ((a = g.pop()),
                (u = a.value),
                (f = a.cost),
                (c = t[u] || {})))
                  c.hasOwnProperty(s) &&
                    ((l = c[s]),
                    (d = f + l),
                    (h = i[s]),
                    (void 0 === i[s] || h > d) &&
                      ((i[s] = d), g.push(s, d), (o[s] = u)))
              if (void 0 !== r && void 0 === i[r]) {
                var p = ['Could not find a path from ', e, ' to ', r, '.'].join(
                  ''
                )
                throw new Error(p)
              }
              return o
            },
            extract_shortest_path_from_predecessor_list: function(t, e) {
              for (var r = [], n = e; n; ) r.push(n), t[n], (n = t[n])
              return r.reverse(), r
            },
            find_path: function(t, e, r) {
              var o = n.single_source_shortest_paths(t, e, r)
              return n.extract_shortest_path_from_predecessor_list(o, r)
            },
            PriorityQueue: {
              make: function(t) {
                var e

                var r = n.PriorityQueue

                var o = {}
                for (e in ((t = t || {}), r))
                  r.hasOwnProperty(e) && (o[e] = r[e])
                return (
                  (o.queue = []), (o.sorter = t.sorter || r.default_sorter), o
                )
              },
              default_sorter: function(t, e) {
                return t.cost - e.cost
              },
              push: function(t, e) {
                var r = { value: t, cost: e }
                this.queue.push(r), this.queue.sort(this.sorter)
              },
              pop: function() {
                return this.queue.shift()
              },
              empty: function() {
                return this.queue.length === 0
              }
            }
          }
          void 0 !== e && (e.exports = n)
        },
        {}
      ],
      30: [
        function(t, e, r) {
          var n = {}.toString
          e.exports =
            Array.isArray ||
            function(t) {
              return n.call(t) == '[object Array]'
            }
        },
        {}
      ]
    },
    {},
    [24]
  )(24)
})

var script = {
  name: 'MuQrcode',
  props: {
    val: {
      type: String,
      required: !0,
      validator: function(t) {
        return t !== ''
      }
    },
    size: {
      type: Number,
      default: 128,
      validator: function(t) {
        return t >= 80
      }
    },
    margin: {
      type: Number,
      default: 2,
      validator: function(t) {
        return t >= 0
      }
    },
    type: {
      type: String,
      default: 'canvas',
      validator: function(t) {
        return ~['canvas', 'img'].indexOf(t)
      }
    },
    dark: { type: String, default: '#000' },
    light: { type: String, default: '#fff' }
  },
  mounted: function() {
    var t = {
      width: this.size,
      margin: this.margin,
      color: { dark: this.dark, light: this.light }
    }
    this.type === 'img' ? this.generateImg(t) : this.generateCanvas(t)
  },
  methods: {
    generateImg: function(t) {
      var e = this
      qrcode.toDataURL(this.val, t, function(t, r) {
        if (t) throw new Error('Failed to generate qrcode: '.concat(t))
        var n = document.createElement('img')
        ;(n.src = r), e.$el.appendChild(n)
      })
    },
    generateCanvas: function(t) {
      var e = this
      qrcode.toCanvas(this.val, t, function(t, r) {
        if (t) throw new Error('Failed to generate qrcode: '.concat(t))
        e.$el.appendChild(r)
      })
    }
  }
}
function normalizeComponent(t, e, r, n, o, i, a, u, s, f) {
  typeof a === 'function' && ((s = u), (u = a), (a = !1))
  var c

  var l = typeof r === 'function' ? r.options : r
  if (
    (t &&
      t.render &&
      ((l.render = t.render),
      (l.staticRenderFns = t.staticRenderFns),
      (l._compiled = !0),
      o && (l.functional = !0)),
    n && (l._scopeId = n),
    i
      ? ((c = function(t) {
          ;(t =
            t ||
            (this.$vnode && this.$vnode.ssrContext) ||
            (this.parent &&
              this.parent.$vnode &&
              this.parent.$vnode.ssrContext)) ||
            typeof __VUE_SSR_CONTEXT__ === 'undefined' ||
            (t = __VUE_SSR_CONTEXT__),
            e && e.call(this, s(t)),
            t && t._registeredComponents && t._registeredComponents.add(i)
        }),
        (l._ssrRegister = c))
      : e &&
        (c = a
          ? function() {
              e.call(this, f(this.$root.$options.shadowRoot))
            }
          : function(t) {
              e.call(this, u(t))
            }),
    c)
  )
    if (l.functional) {
      var d = l.render
      l.render = function(t, e) {
        return c.call(e), d(t, e)
      }
    } else {
      var h = l.beforeCreate
      l.beforeCreate = h ? [].concat(h, c) : [c]
    }
  return r
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
  var r = isOldIE ? e.media || 'default' : t

  var n = styles[r] || (styles[r] = { ids: new Set(), styles: [] })
  if (!n.ids.has(t)) {
    n.ids.add(t)
    var o = e.source
    if (
      (e.map &&
        ((o += '\n/*# sourceURL=' + e.map.sources[0] + ' */'),
        (o +=
          '\n/*# sourceMappingURL=data:application/json;base64,' +
          btoa(unescape(encodeURIComponent(JSON.stringify(e.map)))) +
          ' */')),
      n.element ||
        ((n.element = document.createElement('style')),
        (n.element.type = 'text/css'),
        e.media && n.element.setAttribute('media', e.media),
        HEAD.appendChild(n.element)),
      'styleSheet' in n.element)
    )
      n.styles.push(o),
        (n.element.styleSheet.cssText = n.styles.filter(Boolean).join('\n'))
    else {
      var i = n.ids.size - 1

      var a = document.createTextNode(o)

      var u = n.element.childNodes
      u[i] && n.element.removeChild(u[i]),
        u.length ? n.element.insertBefore(a, u[i]) : n.element.appendChild(a)
    }
  }
}
var __vue_script__ = script

var __vue_render__ = function() {
  var t = this.$createElement
  return (this._self._c || t)('div', { staticClass: 'mu-qrcode' })
}

var __vue_staticRenderFns__ = []

var __vue_inject_styles__ = function(t) {
  t &&
    t('data-v-5d0712f6_0', {
      source: '\n.mu-qrcode{text-align:center\n}',
      map: void 0,
      media: void 0
    })
}

var __vue_scope_id__ = void 0

var __vue_module_identifier__ = void 0

var __vue_is_functional_template__ = !1

var qrcode$1 = normalizeComponent(
  { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
  __vue_inject_styles__,
  __vue_script__,
  __vue_scope_id__,
  __vue_is_functional_template__,
  __vue_module_identifier__,
  createInjector,
  void 0
)
export default qrcode$1