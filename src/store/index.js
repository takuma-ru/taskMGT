import Vue from 'vue'
import Vuex from 'vuex'
import auth from '../store_modules/auth'
import db from '../store_modules/db'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    db,
  },
})
