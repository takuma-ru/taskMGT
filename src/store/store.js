import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '../plugins/firebase'
import firestore from '../plugins/firestore'
//import auth from '../store_modules/auth'
//import db from '../store_modules/db'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isphone: false,
    adding: false,
    deleting: false,
    completing: false,
    isauth: false,
    userdata: {},
    progressdata: {},
    planetdata: {},
    check: false,
    task: [],
    namelist: ["目標", "完了"],
    first: false,
    onload: false,
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
    adding(state) {
      return state.adding
    },
    namelist(state) {
      return state.namelist
    },
    progressdata(state) {
      return state.progressdata
    },
    isphone(state) {
      return state.isphone
    },
    planetdata(state) {
      return state.planetdata
    },
    first(state) {
      return state.first
    },
    onload(state) {
      return state.onload
    }
  },

  mutations: {
    addChange(state, bool){
      state.adding = bool
    },
    delChange(state, bool){
      state.deleting = bool
    },
    completeChange(state, bool){
      state.completing = bool
    },
    onAuthStateChanged(state, user) {
      state.userdata = user
    },
    onUserStatusChanged(state, status) {
      state.isauth = status
    },
    init(state){
      state.task = []
    },
    Muta(state, data) {
      state.task.push(data)
    },
    ProgressData(state, data) {
      state.progressdata = data
    },
    isphoneChange(state, bool){
      state.isphone = bool
    },
    planetdataChange(state, data) {
      state.planetdata = data
    },
    firstChange(state, bool) {
      state.first = bool
    },
    onloadChange(state, bool){
      state.onload = bool
    }
  },

  actions: {
    async init({ commit }) {
      firebase.initializeApp(firebase.firebaseConfig);
    },

    async signIn({ commit }) {
      console.log("signin...")
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({
        //hd: 'g.ichinoseki.ac.jp' //特定のドメインのみアクセス可能
      })
      firebase.auth().signInWithPopup(provider)
      .then(() => {
        firebase.auth().onAuthStateChanged(user => {
          user = user ? user : {};
          commit('onAuthStateChanged', user);
          commit('onUserStatusChanged', user.uid ? true : false);

          dispatch('get_planet', user.uid)
        });
      })
    },

    async signOut({ commit }) {
      console.log("signout...")
      location.reload();
      firebase.auth().signOut()
    },

    async isphone({ commit }) {
      if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
        commit('isphoneChange', true)
        console.log("isphone: true")
      } else {
        commit('isphoneChange', false)
        console.log("isphone: false")
      }
    },

    get_task({ commit }, uid) {
      console.log("Now getting 'task' data... :", uid)
      firestore.collection("tasks").doc(uid).collection("Task").get()
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
              completed: doc.data().completed,
              tag: doc.data().tag
            })
          })
          console.log('Tasks data GetSuccess')
        }else{
          console.error("Not found :_(")
          firestore.collection('tasks').doc(uid).set({id: uid})
        }
      })
    },

    get_data({ commit }, uid) {
      console.log("Now getting 'user' data... :", uid)
      firestore.collection("tasks").doc(uid).collection("Data").doc("Progress").get()
      .then((doc) => {
        if(doc.data() != undefined)
        commit('ProgressData', doc.data())
        console.log('Progress data GetSuccess')
      }).catch((error) => {
        firestore.collection('tasks').doc(uid).collection("Data").doc("Progress").set({CompletedTask: 0})
        console.error("Error getting cached document:", error);
      });
    },

    get_planet({ commit }, uid) {
      console.log("Now getting 'planet' data... :", uid)
      firestore.collection("tasks").doc(uid).collection("Data").doc("Planet").get()
      .then((doc) => {
        if(doc.data() != undefined){
          commit('planetdataChange', doc.data())
          commit('firstChange', false)
          console.log('Planet data GetSuccess')
        }else{
          firestore.collection('tasks').doc(uid).collection("Data").doc("Planet").set({
            name: '地球',
            creatures: 0,
            elapsed: 0,
            created: firebase.firestore.Timestamp.fromDate(new Date())
          })
        }
      }).catch((error) => {
        console.error("Error getting cached document:", error);
        commit('firstChange', true)
      });
    },

    add_task({ dispatch, commit }, {end, start, text, title, group, completed, tag}){
      commit('addChange',true)
      var data = {
        date_end: firebase.firestore.Timestamp.fromDate(new Date(end)),
        date_start: firebase.firestore.Timestamp.fromDate(new Date(start)),
        text: text,
        title: title,
        group: group,
        completed: completed,
        tag: tag,
      }
      firebase.auth().onAuthStateChanged(user => {
        firestore.collection("tasks").doc(user.uid).collection("Task").add(data)
        .then(function(docRef) {
          console.log("Document written with ID:", docRef.id);
          commit('addChange',false)
          dispatch('get_task', user.uid)
          dispatch('get_data', user.uid)
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
            commit('addChange',false)
        });
      })
    },

    del_task({ dispatch, commit }, {docid}){
      commit('delChange', true)
      firebase.auth().onAuthStateChanged(user => {
        firestore.collection("tasks").doc(user.uid).collection("Task").doc(docid).delete()
        .then(function() {
          dispatch('get_task', user.uid)
          dispatch('get_data', user.uid)
          console.log("Document successfully deleted!");
          commit('delChange', false)
        }).catch(function(error) {
          console.error("Error removing document: ", error);
        });
      })
    },

    change_task({ dispatch, commit }, {data, type}){
      data.completed = firebase.firestore.Timestamp.fromDate(new Date(data.completed))
      console.log(data.completed)
      commit('completeChange',true)
      console.log("Now changing data...", data)
      firebase.auth().onAuthStateChanged(user => {
        firestore.collection("tasks").doc(user.uid).collection("Task").doc(data.id).update(data)
          .then(() => {
            switch(type){
              case 0: //タスクを未完了にした場合
                firestore.collection("tasks").doc(user.uid).collection("Data").doc("Progress").update({
                  CompletedTask: firebase.firestore.FieldValue.increment(-1)
                });
                firestore.collection("tasks").doc(user.uid).collection("Data").doc("Planet").update({
                  creatures: firebase.firestore.FieldValue.increment(-1)
                });
                break;

              case 1: //タスクを完了した場合
                firestore.collection("tasks").doc(user.uid).collection("Data").doc("Progress").update({
                  CompletedTask: firebase.firestore.FieldValue.increment(1)
                });
                firestore.collection("tasks").doc(user.uid).collection("Data").doc("Planet").update({
                  creatures: firebase.firestore.FieldValue.increment(1)
                });
                break;

              case 3: //
                break;

            }
            dispatch('get_task', user.uid)
            dispatch('get_data', user.uid)
            dispatch('get_planet', user.uid)
            console.log("Document successfully updated!");
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
            commit('addChange',false)
          });
      })
    },

    async onAuth({ dispatch, commit }) {
      commit('onloadChange', true)
      firebase.auth().onAuthStateChanged(user => {
        if(user){
          commit('onAuthStateChanged', user);
          commit('onUserStatusChanged', true);

          dispatch('get_task', user.uid)
          dispatch('get_data', user.uid)
          dispatch('get_planet', user.uid)
          .then(
            commit('onloadChange', false)
          )
        }else{
          commit('onAuthStateChanged', user);
          commit('onloadChange', false)
          console.error('Can not connect online')
        }
      });
    },
  },
})
