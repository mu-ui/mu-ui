<template>
  <div class="qrcode">
    <qrcode val="https://github.com/mu-ui/mu-ui/" :size="160" dark="#add8e6"></qrcode>
  </div>
</template>

<script>
import qrcode from '../../../packages/qrcode/index'

export default {
  components: {
    qrcode
  },
  data() {
    return {}
  }
}
</script>
