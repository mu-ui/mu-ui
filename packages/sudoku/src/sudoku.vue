<template>
  <div class="mu-sudoku">
    <mu-flex class="mu-sudoku-col" direction="col">
      <mu-flex class="mu-sudoku-row">
        <slot v-for="n in [0,1,2]" :name="`mu-sudoku-item-${n}`" :active="cur === n">Gift.{{ n }}</slot>
      </mu-flex>
      <mu-flex class="mu-sudoku-row">
        <slot name="mu-sudoku-item-7" :active="cur === 7">Gift.7</slot>
        <div class="mu-sudoku-click-handler" @click="sudokuHandler">
          <slot name="mu-sudoku-click-btn">Click</slot>
        </div>
        <slot name="mu-sudoku-item-3" :active="cur === 3">Gift.3</slot>
      </mu-flex>
      <mu-flex class="mu-sudoku-row">
        <slot v-for="n in [6,5,4]" :name="`mu-sudoku-item-${n}`" :active="cur === n">Gift.{{ n }}</slot>
      </mu-flex>
    </mu-flex>
  </div>
</template>

<script>
import { Flex } from '@mu-ui/mu-flex'

export default {
  name: 'MuSudoku',
  components: {
    'mu-flex': Flex
  },
  props: {
    turnsCount: {
      type: Number,
      default: 3,
      validate(val) {
        return val > 0
      }
    },
    initialRate: {
      type: Number,
      default: 100,
      validate(val) {
        return val >= 50 && val <= 200
      }
    },
    slowestRate: {
      type: Number,
      default: 800,
      validate(val) {
        return val >= 500 && val <= 1000
      }
    }
  },
  data() {
    return {
      cur: -1,
      prev: -1,
      lucky: -1,
      count: 0,
      rate: 0,
      free: true,
      step: 0,
      inc: 0,
      timer: null
    }
  },
  mounted() {
    this.resultHandler = {
      set: num => {
        this.$emit('$sudokuResult:set', num)
      },
      free: () => {
        this.$emit('$sudokuResult:free')
      }
    }
    this.$on('$sudokuResult:set', num => {
      if (typeof num === 'number' && num >= 0 && num <= 7) {
        this.set(num)
      } else {
        throw new Error(`sudoku: the param ${num} is out of range[0,7]`)
      }
    })
    this.$on('$sudokuResult:free', () => {
      this.free = true
    })
  },
  methods: {
    set(num) {
      this.lucky = num
      this.rate = this.initialRate
      this.count = 0
      this.prev = ~[-1, 0].indexOf(this.cur) ? 7 : this.cur - 1
      const dis = this.lucky - this.prev
      this.step = dis > 3 ? dis : dis <= -4 ? 16 + dis : 8 + dis
      const inc = this.step >= 8 ? 2 : 4
      this.inc = (this.initialRate / 5) * inc
      this.search()
    },
    sudokuHandler() {
      if (this.free) {
        this.free = false
        this.$emit('handle', this.resultHandler)
      }
    },
    search() {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.cur < 7 ? this.cur++ : (this.cur = 0)
      if (this.count < this.turnsCount) {
        if (this.cur === this.prev) {
          this.count++
        }
      } else {
        if (--this.step === 0) {
          this.$emit('finish')
          this.free = true
          return
        }
        if (this.rate + this.inc <= this.slowestRate) {
          this.rate += this.inc
        }
      }
      this.timer = setTimeout(() => {
        this.search()
      }, this.rate)
    }
  }
}
</script>

<style lang="scss">
.mu-sudoku {
  width: 100%;
  height: 100%;
  &-row,
  &-col {
    width: 100%;
    height: 100%;
  }
}
</style>
