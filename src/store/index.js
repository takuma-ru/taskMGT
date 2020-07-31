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
    complete: [],
    inProgress: [],
    task: [],
  },

  getters: {
    complete(state) {
      return state.complete
    },
    inProgress(state) {
      return state.inProgress
    },
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
    init_C(state){
      state.complete = []
    },
    init_P(state){
      state.inProgress = []
    },
    init_T(state){
      state.task = []
    },
    Muta_C(state, data) {
      state.complete.push(data)
    },
    Muta_P(state, data) {
      state.inProgress.push(data)
    },
    Muta_T(state, data) {
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
    add_task({ commit }, {end, start, text, title}){
      commit('addChange',true)
      var data = {
        date_end: firebase.firestore.Timestamp.fromDate(new Date(end)),
        date_start: firebase.firestore.Timestamp.fromDate(new Date(start)),
        text: text,
        title: title,
      }
      firebase.auth().onAuthStateChanged(user => {
        firestore.collection("tasks").doc(user.uid).collection("Task").add(data)
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          commit('addChange',false)
          firestore.collection("tasks").doc(user.uid).collection("Task").get()
          .then((querySnapshot) => {
            if(!querySnapshot.empty) {
              //console.log(querySnapshot.empty)
              commit('init_T')
              querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                commit('Muta_T', {
                  id: doc.id,
                  title: doc.data().title,
                  text: doc.data().text,
                  date_start: doc.data().date_start,
                  date_end: doc.data().date_end,
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
    del_task({ commit }, {coll, docid}){
      commit('delChange', true)
      firebase.auth().onAuthStateChanged(user => {
        firestore.collection("tasks").doc(user.uid).collection(coll).doc(docid).delete()
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
        console.log("dbGet... : " + user.uid)
        const coll = ["Complete", "InProgress", "Task"]
        const muta = ['Muta_C', 'Muta_P', 'Muta_T']
        for (let i = 0; i < 3; i++) {
          firestore.collection("tasks").doc(user.uid).collection(coll[i]).get()
          .then((querySnapshot) => {
            if(!querySnapshot.empty) {
              if(i == 0){
                commit('init_C')
              }else if(i == 1){
                commit('init_P')
              }else{
                commit('init_T')
              }
              //console.log(querySnapshot.empty)
              querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                commit(muta[i], {
                  id: doc.id,
                  title: doc.data().title,
                  text: doc.data().text,
                  date_start: doc.data().date_start,
                  date_end: doc.data().date_end,
                })
                console.log("GetSuccess")
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
