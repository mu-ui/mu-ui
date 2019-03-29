import Clipboard from 'clipboard/dist/clipboard.min.js'
import promise from 'es6-promise'
const Promise = promise.Promise

const install = Vue => {
  Vue.copyText = Vue.prototype.$copyText = (
    text,
    action = 'copy',
    container = document.body
  ) =>
    new Promise(resolve => {
      if (!text) {
        resolve({ result: 'empty' })
        return
      }
      const fakeElem = document.createElement('button')
      const clipboard = new Clipboard(fakeElem, {
        text() {
          return text
        },
        action() {
          return action
        },
        container
      })
      clipboard.on('success', e => {
        clipboard.destroy()
        resolve({ result: 'success', ...e })
      })
      clipboard.on('error', e => {
        clipboard.destroy()
        resolve({ result: 'error', ...e })
      })
      fakeElem.click()
    })
}

export default install
