<template>
  <div class="mu-flex" :class="customFlex">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'MuFlex',
  props: {
    inline: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: 'row',
      validator(value) {
        return ~['col', 'row'].indexOf(value)
      }
    },
    reverse: {
      type: Boolean,
      default: false
    },
    wrap: {
      type: Boolean,
      default: false
    },
    justify: {
      type: String,
      default: 'between',
      validator(value) {
        return ~['start', 'end', 'center', 'around', 'between'].indexOf(value)
      }
    },
    items: {
      type: String,
      default: 'center',
      validator(value) {
        return ~['start', 'end', 'center'].indexOf(value)
      }
    },
    align: {
      type: String,
      default: 'stretch',
      validator(value) {
        return ~[
          'start',
          'end',
          'center',
          'around',
          'between',
          'stretch'
        ].indexOf(value)
      }
    }
  },
  computed: {
    customFlex() {
      let customClass = []
      this.inline && customClass.push('mu-flex-inline')
      this.wrap && customClass.push('mu-flex-wrap')
      if (this.direction === 'col') {
        customClass.push(this.reverse ? 'mu-flex-col-reverse' : 'mu-flex-col')
      } else if (this.reverse) {
        customClass.push('mu-flex-row-reverse')
      }
      if (this.justify !== 'between') {
        customClass.push(`mu-flex-justify-${this.justify}`)
      }
      if (this.align !== 'stretch') {
        customClass.push(`mu-flex-align-${this.align}`)
      }
      if (this.items !== 'center') {
        customClass.push(`mu-flex-items-${this.items}`)
      }
      return customClass
    }
  }
}
</script>

<style lang="scss">
.mu-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &-inline {
    display: inline-flex;
    justify-content: flex-start;
  }
  &-wrap {
    flex-wrap: wrap;
  }
  &-row-reverse {
    flex-direction: row-reverse;
  }
  &-col {
    flex-direction: column;
  }
  &-col-reverse {
    flex-direction: column-reverse;
  }
  &-justify-start {
    justify-content: flex-start;
  }
  &-justify-end {
    justify-content: flex-end;
  }
  &-justify-center {
    justify-content: center;
  }
  &-justify-around {
    justify-content: space-around;
  }
  &-items-start {
    align-items: flex-start;
  }
  &-items-end {
    align-items: flex-end;
  }
  &-align-start {
    align-content: flex-start;
  }
  &-align-end {
    align-content: flex-end;
  }
  &-align-center {
    align-content: center;
  }
  &-align-between {
    align-content: space-between;
  }
  &-align-around {
    align-content: space-around;
  }
}
</style>
