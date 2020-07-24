import firestore from '../plugins/firestore'

export default {
  state: {
    dbdata: [],
  },
  getters: {
    dbdata(state) {
      return state.dbdata
    },
  },
  mutations: {
    dbMuta(state, data) {
      state.dbdata.push(data)
    }
  },
  actions: {
    dbGet({ commit }, {uid}) {
      console.log("dbGet... : " + uid)
      //firestore.collection("tasks").doc(uid).collection("Complete").get().then(function(querySnapshot) {
      firestore.collection("test").doc("test_user").collection("Complete").get().then(function(querySnapshot) {
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
    },
  }
}