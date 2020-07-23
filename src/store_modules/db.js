import firestore from '../plugins/firestore'
import auth from '../store_modules/auth'

export default {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    dbGet({ commit }) {
      console.log("dbGet..."+ auth)
      firestore.collection("test").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    });
    }
  },
}