import Vue from 'vue'
import App from './App.vue'
import store from './store/'
import router from './router'
import vuetify from './plugins/vuetify';
import Firebase from './plugins/firebase'

Vue.config.productionTip = false

Firebase;

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
