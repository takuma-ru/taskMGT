<template>
  <v-app>
    <v-main>
      <v-container class="py-4 px-4 main_contents">

        <v-app-bar flat color="transparent">
          <v-btn
            icon
            large
            @click.stop="drawer = !drawer"
          >
            <v-icon large>mdi-menu</v-icon>
          </v-btn>

          <v-spacer />

          <v-chip :dark="false" @click="">
            <v-avatar size="38" class="mr-2">
              <v-img :src="userdata.photoURL"></v-img>
            </v-avatar>
            {{userdata.displayName}}
          </v-chip>
        </v-app-bar>

        <v-row v-if="!isauth" class="mt-2" justify="center" align="center">
          <h1>ログインすると利用できます</h1>
          <v-col cols="12" align="center">
            <v-btn
              outlined
              @click="signIn"
            >
              googleアカウントでログイン
            </v-btn>
          </v-col>
          <v-col align="center">
            <p>このアプリの説明・注意事項</p>
            <p><v-icon class="mb-1" color="black">mdi-alert-circle-outline</v-icon>現在"g.ichinoseki.ac.jp"のドメインのみログインが可能になっております。"gmail.com"などではログインできません。</p>
            <p>またこのサービスは現在「開発中」です。ログインしてタスクの追加や削除は行えますが、予告なく保存されたタスクデータを削除する場合がございます。ご了承の上利用してください。</p>
          </v-col>
        </v-row>

        <router-view />

        <v-footer
          id="footer"
          fixed
          padless
        >
          <v-col
            class="text-center white--text"
            cols="12"
          >
            <strong>takuma-ru</strong> - {{ new Date().getFullYear() }}
          </v-col>
        </v-footer>

      </v-container>
    </v-main>

  </v-app>
</template>
<script>
import firebase from './plugins/firebase'
import Drawer from './component/navigation_drawer'

export default {
  name: 'App',
  data: () => ({
    drawer: false,
    items: [
      { title: 'ホーム', icon: 'mdi-home-variant-outline', link: '/' },
      { title: 'タスクボード', icon: 'mdi-view-dashboard-outline', link: '/taskboard' },
      { title: 'チーム', icon: 'mdi-account-multiple-outline', link: '/team' },
      { title: 'test', icon: 'mdi-ab-testing', link: '/test' },
    ],
    isphone: false,
    isload: false,
    mini: false,
  }),

  components: {
    Drawer,
  },

  created: function() {
    this.onAuth()
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
      this.isphone = true
      this.drawer = false
      console.log("true")
    } else {
      this.isphone = false
      this.drawer = true
      console.log("false")
    }
  },

  computed: {
    isauth(){
      return this.$store.getters.isauth
    },
    userdata(){
      return this.$store.getters.userdata
    },
    check(){
      return this.$store.getters.check
    },
  },

  methods: {
    signIn() {
      this.$store.dispatch('signIn')
    },
    signOut() {
      this.$store.dispatch('signOut')
    },
    onAuth() {
      this.$store.dispatch('onAuth')
    },
  },

};
</script>

<style>
  ::-webkit-scrollbar {
    width: 0px;
  }

  .v-main__wrap {
    flex: 1 1 auto;
    max-width: 100%;
    position: relative;
    background-color: #f5f8f8;
    background-image: url("../src/assets/background.svg");
    background-position: center left;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    min-height: 100vh;
  }

  .main_contents {
    min-height: 95vh;
    min-width: 100vw;
  }

  #footer {
    height: 5vh;
    background-color: #795548;
  }
</style>