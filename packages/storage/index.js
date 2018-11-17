import Storage from './src/storage'

const install = Vue => {
  if (Storage.isSupport) {
    Vue.storage = Vue.prototype.$storage = Storage.local
    Vue.session = Vue.prototype.$session = Storage.session
  } else {
    console.error(
      "Error from @mu-ui/mu-storage: Sorry, The current browser doesn't support Web Storage."
    )
  }
}

export default install
