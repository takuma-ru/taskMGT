<template>
  <v-app>
    <v-main v-resize="onResize">
      <div class="main_container" :style="`${isphone ? 'margin-bottom: 56px;' : null }`">

        <Bar />

        <v-container v-if="onload">
          <div class="onload">
            <vue-loading type="bubbles" color="#54BFD7" :size="{ width: '7vmax', height: '7vmax' }"></vue-loading>
            <!--<Logo :active="true"></Logo>-->
            <p class="px-4">タスク情報を取得中...</p>
          </div>
        </v-container>

        <div v-else class="mt-2 main_container">
          <v-row v-if="$route.path == '/about'">
          </v-row>

          <v-row v-else-if="!isauth" justify="center" align="center" style="color: white">
            <h1>ログインすることで利用できます</h1>
            <v-col cols="12" align="center" class="mt-4">
              <h4>初めての方はこちらのチュートリアルをおすすめします</h4>
              <Tutorial></Tutorial>
            </v-col>

            <v-col cols="12" align="center">
              <h4>既に使い方が分かっている方</h4>
              <v-btn
                dark
                depressed
                color="MY_success"
                class="my-2"
                @click="signIn"
              >
                <v-icon class="mr-2">mdi-google</v-icon>Googleアカウントでログイン
              </v-btn>
            </v-col>
            <v-col align="center" class="mt-2">
              <h4 class="pb-2">このアプリを利用する際の注意事項</h4>
              <p>このアプリを使用する際に使うGoogleアカウントの情報はこのアプリ内だけで利用します。それ以外の目的で使用することは一切ありません。</p>
              <p>今後のアップデートにより過去のタスク内容が変更・削除される恐れがあります。ご了承の上ご利用ください。</p>
            </v-col>
          </v-row>

          <router-view />

        </div>

        <Drawer />

      </div>

    <Drawer2 />

    </v-main>

    <div
      style="position: fixed; right: 4vw; bottom: calc(64px + 0.5%)"
    >
      <v-alert
        light
        :value="update"
        dense
        dark
        elevation="4"
        border="left"
        color="MY_success"
        class="rounded-lg ml-4"
        transition="slide-x-transition"
        style="transform-origin: center right;"
      >
        <v-row align="center">
          <v-col class="grow">
            新しいバージョンに更新されました！アプリを開きなおしてください。
          </v-col>
          <v-col class="shrink">
            <v-btn
              dark
              depressed
              rounded
              color="white"
              @click="reload"
            >
              <span class="MY_success--text font-weight-bold">OK</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-alert>
      <v-alert
        light
        :value="app"
        timemout="5000"
        dense
        dark
        elevation="4"
        border="left"
        color="MY_yellow_dark"
        class="rounded-lg ml-4"
        transition="slide-x-transition"
        style="transform-origin: center right;"
      >
        <v-row align="center">
          <v-col class="grow">
            Android用アプリが配信されました！
          </v-col>
          <v-col class="shrink">
            <v-btn
              dark
              depressed
              rounded
              color="white"
              @click="app = false"
              href="https://play.google.com/store/apps/details?id=takumaru.nekoo.taskmgt"
              target="_blank"
            >
              <span class="MY_yellow_dark--text">Playストアで入手</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-alert>
      <!--<v-alert
        light
        :value="alert"
        elevation="4"
        dismissible
        border="left"
        type="success"
        color="MY_success"
        class="rounded-lg"
        transition="slide-x-transition"
        style="transform-origin: center right;"
      >
        <v-row align="center">
          <v-col class="grow">
            通知（インフォサンプル）
          </v-col>
        </v-row>
      </v-alert>-->
    </div>
  </v-app>
</template>

<script>
import { VueLoading } from 'vue-loading-template'
import Drawer from './component/navigation_drawer'
import Drawer2 from './component/bottom_navigation'
import Bar from './component/app_bar'
import Logo from './component/logo'
import Tutorial from './component/tutorial.vue'

export default {
  name: 'App',
  data: () => ({
    app :true
  }),

  components: {
    VueLoading,
    Drawer,
    Drawer2,
    Bar,
    Logo,
    Tutorial
  },

  mounted() {
    this.$store.commit('updateChange', false)
    this.onAuth()
    this.$store.dispatch('isphone')
    this.$router.push({ name: 'Home' })
  },

  computed: {
    isauth() {
      return this.$store.getters.isauth
    },
    isphone() {
      return this.$store.getters.isphone
    },
    onload() {
      return this.$store.getters.onload
    },
    update() {
      return this.$store.getters.update
    },
    tutorial() {
      return this.$store.getters.tutorial
    }
  },

  methods: {
    onResize() {
      this.$store.dispatch("isphone");
    },
    signIn() {
      this.$store.dispatch('signIn')
    },
    onAuth() {
      this.$store.dispatch('onAuth')
    },
    reload() {
      this.$store.commit('updateChange', false)
    },
    tutorialChange(bool) {
      this.$store.commit('tutorialChange', bool)
    }
  },

};
</script>

<style>
  #app {
    font-family: 'Noto Sans JP', sans-serif;
    -ms-overflow-style: none;
    overflow-scrolling: touch;
    scrollbar-width: none;
  }

  #app::-webkit-scrollbar {
    display:none;
    width: 0%;
  }


  .v-main__wrap {
    flex: 1 1 auto;
    max-width: 100%;
    position: relative;
    background-color: #f5f8f8;
    background-image: url('../src/assets/background_speace.svg');
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    min-height: 100vh;
  }

  .main_container {
    position: relative;
    margin-top: 64px;
    margin-left: 1vw;
    margin-right: 1vw;
  }

  .main_contents {
    height: 95vh;
    min-width: 100%;
  }

  .onload {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
</style>