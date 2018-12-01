import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'

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
  actions,
  mutations,
  strict: process.env.NODE_ENV !== 'production'
})
