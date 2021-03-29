import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '../plugins/firebase'
import firestore from '../plugins/firestore'
//import auth from '../store_modules/auth'
//import db from '../store_modules/db'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    adding: false,
    deleting: false,
    isauth: false,
    userdata: {},
    check: false,
    task: [],
    namelist: ["目標", /*"進行中", "完了済み", "バグ修正中", "確認中"*/],
  },

  getters: {
    task(state) {
      return state.task
    },
    isauth(state) {
      return state.isauth
    },
    userdata(state) {
      return state.userdata
    },
    check(state) {
      return state.check
    },
    adding(state){
      return state.adding
    },
    namelist(state){
      return state.namelist
    }
  },

  mutations: {
    addChange(state, bool){
      state.adding = bool
    },
    delChange(state, bool){
      state.deleting = bool
    },
    onAuthStateChanged(state, user) {
      state.userdata = user; //firebaseが返したユーザー情報
    },
    onUserStatusChanged(state, status) {
      state.isauth = status; //ログインしてるかどうか true or false
    },
    init(state){
      state.task = []
    },
    Muta(state, data) {
      state.task.push(data)
    },
    GetData(){}
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

    add_task({ commit }, {end, start, text, title, group}){
      commit('addChange',true)
      var data = {
        date_end: firebase.firestore.Timestamp.fromDate(new Date(end)),
        date_start: firebase.firestore.Timestamp.fromDate(new Date(start)),
        text: text,
        title: title,
        group: group,
      }
      firebase.auth().onAuthStateChanged(user => {
        firestore.collection("tasks").doc(user.uid).collection("Task").add(data)
        .then(function(docRef) {
          console.log("Document written with ID:", docRef.id);
          commit('addChange',false)
          firestore.collection("tasks").doc(user.uid).collection("Task").get()
          .then((querySnapshot) => {
            if(!querySnapshot.empty) {
              //console.log(querySnapshot.empty)
              commit('init')
              querySnapshot.forEach((doc) => {
                //console.log(doc.id, "=>", doc.data());
                commit('Muta', {
                  id: doc.id,
                  title: doc.data().title,
                  text: doc.data().text,
                  date_start: doc.data().date_start,
                  date_end: doc.data().date_end,
                  group: doc.data().group,
                })
                console.log("GetSuccess")
              })
            }else{
              console.log("Not found :_(")
              firestore.collection('tasks').doc(user.uid).set({id: user.uid})
            }
          })
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
            commit('addChange',false)
        });
      })
    },

    del_task({ commit }, {docid}){
      commit('delChange', true)
      firebase.auth().onAuthStateChanged(user => {
        firestore.collection("tasks").doc(user.uid).collection("Task").doc(docid).delete()
        .then(function() {
            console.log("Document successfully deleted!");
            commit('delChange', false)
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
      })
    },

    async onAuth({ commit }) {
      firebase.auth().onAuthStateChanged(user => {
        user = user ? user : {};
        commit('onAuthStateChanged', user);
        commit('onUserStatusChanged', user.uid ? true : false);
        for (let i = 0; i < 3; i++) {
          console.log("Getting data... :", user.uid)
          firestore.collection("tasks").doc(user.uid).collection("Task").get()
          .then((querySnapshot) => {
            if(!querySnapshot.empty) {
                commit('init')
              //console.log(querySnapshot.empty)
              querySnapshot.forEach((doc) => {
                //console.log(doc.id, " => ", doc.data());
                commit('Muta', {
                  id: doc.id,
                  title: doc.data().title,
                  text: doc.data().text,
                  date_start: doc.data().date_start,
                  date_end: doc.data().date_end,
                  group: doc.data().group,
                })
                console.log("GetSuccess :", "Task")
              })
            }else{
              console.log("Not found :_(")
              firestore.collection('tasks').doc(user.uid).set({id: user.uid})
            }
          })
        }
      });
    },
  },
  /*modules: {
    auth,
    db,
  },*/
})
