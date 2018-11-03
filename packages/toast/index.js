import a from './src/a.vue'

console.log(a)

const aaa = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('ok')
    }, 1000)
  })
}

aaa().then(res => console.log(res))

class JRJR {
  constructor() {
    console.log(123)
  }
}

new JRJR() // eslint-disable-line
