import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import ja from 'vuetify/es5/locale/ja'
import en from 'vuetify/es5/locale/en'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  lang: {
    locales: { ja },
    current: 'ja',
  },
  theme: {
    themes: {
      light: {
        MY_success: '#79D9EF',
        My_error: '#EF6786',
        MY_blue: '#7786FF',
        MY_red: '#FF77CA',
        MY_green: '#77FFAC',
        MY_yellow: '#FFF077',
        MY_green_dark: '#51D585',
        MY_yellow_dark: '#F7D130'
      },
      dark: {
        MY_success: '#79D9EF',
        My_error: '#EF6786',
        MY_blue: '#7786FF',
        MY_red: '#FF77CA',
        MY_green: '#77FFAC',
        MY_yellow: '#FFF077',
        MY_green_dark: '#51D585',
        MY_yellow_dark: '#F7D130'
      }
    },
    dark: true,
  },
})