export const deletables = {
  data () {
    return {
      deletables: [],
      deletablesProcessing: false,
      deletablesParallelRequests: 4,
      deletablesSleepTime: 100,
      deletablesProgress: 0,
      deletablesStatus: ''
    }
  },
  methods: {
    chunk (arr, chunkSize) {
      let R = []
      for (let i = 0, len = arr.length; i < len; i += chunkSize) {
        R.push(arr.slice(i, i + chunkSize))
      }
      return R
    },
    sleep (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  }
}
