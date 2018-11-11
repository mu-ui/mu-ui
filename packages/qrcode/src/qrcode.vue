<template>
  <div class="mu-qrcode"></div>
</template>

<script>
import QRCode from 'qrcode/build/qrcode.js'

export default {
  props: {
    val: {
      type: String,
      required: true,
      validator(value) {
        return value !== ''
      }
    },
    size: {
      type: Number,
      default: 128,
      validator(value) {
        return value >= 80
      }
    },
    margin: {
      type: Number,
      default: 4,
      validator(value) {
        return value >= 0
      }
    },
    type: {
      type: String,
      default: 'canvas',
      validator(value) {
        return ~['canvas', 'img'].indexOf(value)
      }
    },
    dark: {
      type: String,
      default: '#000'
    },
    light: {
      type: String,
      default: '#fff'
    }
  },
  mounted() {
    const options = {
      width: this.size,
      margin: this.margin,
      color: {
        dark: this.dark,
        light: this.light
      }
    }
    this.type === 'img'
      ? this.generateImg(options)
      : this.generateCanvas(options)
  },
  methods: {
    generateImg(options) {
      QRCode.toDataURL(this.val, options, (err, url) => {
        if (err) throw new Error(`Failed to generate qrcode: ${err}`)
        let img = document.createElement('img')
        img.src = url
        this.$el.appendChild(img)
      })
    },
    generateCanvas(options) {
      QRCode.toCanvas(this.val, options, (err, canvas) => {
        if (err) throw new Error(`Failed to generate qrcode: ${err}`)
        this.$el.appendChild(canvas)
      })
    }
  }
}
</script>

<style lang="scss">
.mu-qrcode {
  text-align: center;
}
</style>
