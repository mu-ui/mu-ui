<template>
  <div class="rotary">
    <rotary class="rotary-main" @handle="draw" @finish="showResult">
      <div slot="mu-rotary-canvas" class="rotary-canvas">
        <div class="rotary-lamp"></div>
      </div>
      <div slot="mu-rotary-handler" class="rotary-handler"></div>
    </rotary>
  </div>
</template>

<script>
import rotary from '../../../packages/rotary/index'

export default {
  components: {
    rotary
  },
  data() {
    return {
      lucky: -1,
      gifts: [
        { id: 1, name: '1' },
        { id: 2, name: '2' },
        { id: 3, name: '3' },
        { id: 4, name: '4' },
        { id: 5, name: '5' },
        { id: 6, name: '6' },
        { id: 7, name: '7' },
        { id: 8, name: '8' }
      ]
    }
  },
  methods: {
    draw($result) {
      setTimeout(() => {
        this.lucky = Math.floor(Math.random() * 8)
        $result.set(this.lucky)
      }, 500)
    },
    showResult() {
      console.log(`恭喜抽中: ${this.gifts[this.lucky].name}`)
    }
  }
}
</script>

<style lang="scss">
@keyframes rotary-flash {
  0%,
  49% {
    background-image: url('~assets/rotary_light_1.png');
  }
  50%,
  100% {
    background-image: url('~assets/rotary_light_2.png');
  }
}
.rotary {
  &-main {
    width: 300px;
    height: 300px;
    margin: 0 auto;
  }
  &-canvas {
    width: 100%;
    height: 100%;
    background: url('~assets/rotary_body_2.png') no-repeat center center;
    background-size: cover;
  }
  &-lamp {
    width: 100%;
    height: 100%;
    background: url('~assets/rotary_light_1.png') no-repeat center center;
    background-size: 305px 305px;
    animation: rotary-flash 1s linear infinite;
  }
  &-handler {
    width: 91px;
    height: 106px;
    background: url('~assets/rotary_btn.png') no-repeat center center;
    background-size: cover;
    transform: translateY(-7px);
  }
}
</style>
