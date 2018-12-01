import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  auth: {
    token: null,
    userId: null
  },
  boards: {
    lists: []
  }
}

export default new Vuex.Store({
  state,
  mutations: {},
  actions: {},
  strict: process.env.NODE_ENV !== 'production'
})
