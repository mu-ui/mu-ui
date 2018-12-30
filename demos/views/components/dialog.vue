<template>
  <div class="dialog">
    <div @click="showNormal">show normal dialog</div>
    <div @click="showCustom">show custom dialog</div>
    <mu-dialog v-model="show" @confirm="confirm" @cancel="cancel">
      <div class="dialog-main">
        <p>1</p>
        <p>2</p>
        <p>3</p>
      </div>
    </mu-dialog>
  </div>
</template>

<script>
import dialog from '../../../packages/dialog/index'

export default {
  components: {
    MuDialog: dialog.Dialog
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    showNormal() {
      this.$dialog({
        title: 'Title',
        message: 'Message...',
        opacity: 0.5,
        single: true,
        highlight: '#fd0',
        btns: ['No', 'Yes'],
        confirm() {
          console.log('click confirm btn')
        },
        cancel() {
          console.log('click cancel btn')
        }
      })
    },
    showCustom() {
      this.show = true
    },
    confirm() {
      console.log('confirm')
    },
    cancel() {
      console.log('cancel')
    }
  }
}
</script>

<style lang="scss">
.dialog-main {
  width: 300px;
}
</style>
