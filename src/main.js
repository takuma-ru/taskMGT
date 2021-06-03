import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './router/router'
import vuetify from './plugins/vuetify';
import Firebase from './plugins/firebase'
import Firestore from './plugins/firestore'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.prototype.$version = '0.1.12'
/*version: A.B.C
  A: 0 - alpha,beta. 1> - product
  B: major update
  C: minor update
*/

Firebase;
Firestore

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
