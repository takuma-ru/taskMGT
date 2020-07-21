import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import ja from 'vuetify/es5/locale/ja'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
  lang: {
    locales: { ja },
    current: 'ja',
  },
  theme: {
    dark: false,
  },
})