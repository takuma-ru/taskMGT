import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '../plugins/firebase'

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
    onAuthStateChanged(state, user) {
      state.userdata = user; //firebaseが返したユーザー情報
    },
    onUserStatusChanged(state, status) {
      state.isauth = status; //ログインしてるかどうか true or false
    }
  },
  actions: {
    async init({ commit }) {
      firebase.initializeApp(firebase.firebaseConfig);
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    },
    async signIn({ commit }) {
      console.log("signin...")
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({
        hd: 'g.ichinoseki.ac.jp' //特定のドメインのみアクセス可能
      })
      firebase.auth().signInWithPopup(provider)
    },
    async signOut({ commit }) {
      console.log("signout...")
      firebase.auth().signOut()
    },
    async onAuth({ commit }) {
      firebase.auth().onAuthStateChanged(user => {
        user = user ? user : {};
        commit('onAuthStateChanged', user);
        commit('onUserStatusChanged', user.uid ? true : false);
      });
    },
  },
  modules: {
  }
})
