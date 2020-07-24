import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '../plugins/firebase'
import firestore from '../plugins/firestore'
//import auth from '../store_modules/auth'
//import db from '../store_modules/db'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isauth: false,
    userdata: {},
    check: false,
    dbdata: [],
  },

  getters: {
    dbdata(state) {
      return state.dbdata
    },
    isauth(state) {
      return state.isauth
    },
    userdata(state) {
      return state.userdata
    },
    check(state) {
      return state.check
    }
  },

  mutations: {
    onAuthStateChanged(state, user) {
      state.userdata = user; //firebaseが返したユーザー情報
    },
    onUserStatusChanged(state, status) {
      state.isauth = status; //ログインしてるかどうか true or false
    },
    dbMuta(state, data) {
      state.dbdata.push(data)
    },
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
        console.log("dbGet... : " + user.uid)
        //firestore.collection("tasks").doc(uid).collection("Complete").get().then(function(querySnapshot) {
        firestore.collection("tasks").doc(user.uid).collection("Complete").get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
              console.log(doc.id, " => ", doc.data());
              commit('dbMuta', {
                id: doc.id,
                title: doc.data().title,
                text: doc.data().text,
                date_start: doc.data().date_start,
                date_end: doc.data().date_end,
              });
          });
        })
      });
    },
  },
  /*modules: {
    auth,
    db,
  },*/
})
