import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isauth: false,
    userdata: {},
  },
  getters:{
    isauth(state) {
      return state.isauth
    },
    userdata(state) {
      return state.userdata
    }
  },
  mutations: {
    setSignInState(state, user) {
      state.isauth = !!user
      state.userdata = user
      console.log("setSignInState...");
    },
    onAuthStateChanged(state, user){
      firebase.auth().onAuthStateChanged((user) => {
        state.isAuth = !!user;
        state.user = user;
        console.log("sucsses!")
      })
    },
  },
  actions: {
    async signIn({ commit }) {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({
        hd: 'g.ichinoseki.ac.jp' //特定のドメインのみアクセス可能
      });
      await firebase
        .auth()
        .signInWithPopup(provider)
        .then(res => commit('setSignInState', res.user))
        .catch(error => {
          if (error.code === 'auth/popup-closed-by-user') {
            // Do nothing.
          } else {
            // any
          }
        })
    },
    async signOut({ commit }) {
      await firebase
        .auth()
        .signOut()
        .then(res => {
          commit('setSignInState', false)
        })
    },
    async checkAuth({ commit }) {
      await auth().then(user => commit('setSignInState', user))
    },
  },
  modules: {
  }
})
