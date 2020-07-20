import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: {
      isAuth: false,
      userData: null,
    },
  },
  getters:{
    user(state) {
      return state.login
    }
  },
  mutations: {
    setSignInState(state, user) {
      state.isAuth = !!user
      state.email = user && user.email || ''
      state.displayName = user && user.displayName || ''
      state.photoURL = user && user.photoURL || ''
    }
  },
  actions: {
  },
  modules: {
  }
})
