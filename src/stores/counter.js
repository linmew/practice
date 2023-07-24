import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  getters: {
    double: (state) => state.count * 2
  },
  actions: {
    increment () {
      this.count++
    },
    // 减少
    decrement () {
      if (this.count > 0) {
        this.count--
      }
    }
  },
  persist: {
    paths: ['count']
  }
})
