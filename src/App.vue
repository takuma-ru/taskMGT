<template>
  <v-app>
    <v-main>
      <v-container class="py-0 px-3" :style="`${isphone ? 'margin-bottom: 56px;' : null }`" style="margin-top: 64px;">
        <Bar />

        <v-container v-if="onload">
          <div class="onload">
            <vue-loading type="beat" color="#77FFAC" :size="{ width: '7vmax', height: '7vmax' }"></vue-loading>
            <p class="px-4">タスク情報を取得中...</p>
          </div>
        </v-container>

        <v-container v-else>
          <v-row v-if="$route.path == '/about'">
          </v-row>

          <v-row v-else-if="!isauth" class="mt-2" justify="center" align="center" style="color: white">
            <h1>ログインすることで利用できます</h1>
            <v-col cols="12" align="center">
              <v-btn depressed dark color="MY_blue" @click="signIn">
                <v-icon small class="mr-2">mdi-google</v-icon>googleアカウントでログイン
              </v-btn>
            </v-col>
            <v-col cols="12" align="center">
              <v-btn depressed dark color="MY_blue" to="/about">
                <v-icon small class="mr-2">mdi-information</v-icon>このアプリは何？
              </v-btn>
            </v-col>
            <v-col align="center">
              <p>
                <v-icon dark class="mb-1 mr-1">mdi-alert-circle-outline</v-icon
                >このアプリを利用する際の注意事項
              </p>
              <p class="gray--text">
                このサービスは現在<strong class="white--text">開発中</strong>です。
              </p>
              <p>
                ログインしてタスクの追加や削除は行えますが、予告なく保存されたタスクデータ、ユーザーデータを削除する場合がございます。
              </p>
            </v-col>
          </v-row>

          <router-view />

        </v-container>

        <Drawer :drawer="drawer" />

      </v-container>

    <Drawer2 />

    </v-main>
  </v-app>
</template>

<script>
import { VueLoading } from 'vue-loading-template'
import Drawer from './component/navigation_drawer'
import Drawer2 from './component/bottom_navigation'
import Bar from './component/app_bar'

export default {
  name: 'App',
  data: () => ({
    drawer: false,
  }),

  components: {
    VueLoading,
    Drawer,
    Drawer2,
    Bar
  },

  created() {
    this.onAuth()
    this.$store.dispatch('isphone')
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
    }
  },

  methods: {
    signIn() {
      this.$store.dispatch('signIn')
    },
    onAuth() {
      this.$store.dispatch('onAuth')
    }
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
    background-image: url('../src/assets/background_speace.svg');
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    min-height: 100vh;
  }

  .main_contents {
    height: 95vh;
    min-width: 100%;
  }

  .onload {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>