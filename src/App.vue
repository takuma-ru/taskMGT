<template>
  <v-app>
    <v-main>
      <v-container class="py-0 px-3" :style="`${isphone ? 'margin-bottom: 56px;' : null }`" style="margin-top: 64px;">


        <Bar />

        <v-container v-if="onload">
          <div class="onload">
            <vue-loading type="bubbles" color="#54BFD7" :size="{ width: '7vmax', height: '7vmax' }"></vue-loading>
            <p class="px-4">タスク情報を取得中...</p>
          </div>
        </v-container>

        <v-container v-else class="mt-2">
          <v-row v-if="$route.path == '/about'">
          </v-row>

          <v-row v-else-if="!isauth" justify="center" align="center" style="color: white">
            <h1>ログインすることで利用できます</h1>
            <v-col cols="12" align="center">
              <v-btn depressed dark color="MY_success" @click="signIn">
                <v-icon small class="mr-2">mdi-google</v-icon>googleアカウントでログイン
              </v-btn>
            </v-col>
            <v-col cols="12" align="center">
              <v-btn depressed dark color="MY_success" to="/about">
                <v-icon small class="mr-2">mdi-information</v-icon>このアプリは何？
              </v-btn>
            </v-col>
            <v-col align="center">
              <p>
                <v-icon dark class="mb-1 mr-1">mdi-alert-circle-outline</v-icon
                >このアプリを利用する際の注意事項
              </p>
              <p class="gray--text">
                このサービスは現在<strong class="white--text">ベータテスト中</strong>です。
              </p>
              <p>
                ログインしてタスクの追加や削除は行えますが、予告なく保存されたタスクデータ、ユーザーデータを削除する場合がございます。
              </p>
            </v-col>
          </v-row>

          <router-view />

        </v-container>

        <Drawer />

      </v-container>

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
        class="rounded-lg"
        transition="slide-x-transition"
        style="transform-origin: center right;"
      >
        <v-row align="center">
          <v-col class="grow">
            新しいバージョンが配信されました！更新してください。
          </v-col>
          <v-col class="shrink">
            <v-btn
              dark
              outlined
              @click="reload"
            >
              更新する
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

export default {
  name: 'App',
  data: () => ({
    alert: true,
  }),

  components: {
    VueLoading,
    Drawer,
    Drawer2,
    Bar
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
    }
  },

  methods: {
    signIn() {
      this.$store.dispatch('signIn')
    },
    onAuth() {
      this.$store.dispatch('onAuth')
    },
    reload() {
      window.navigator.serviceWorker.register("service-worker.js")
      .then(success => console.log("Success: Service worker is registered.", success))
      .catch(error => console.log("Error: Service worker is not registered.", error));

      window.navigator.serviceWorker.getRegistrations()
      .then(registrations => {
        for(let registration of registrations) {
          registration.unregister();
          registration.update();
        }
      });
      window.location.reload(true);
    }
  },

};
</script>

<style>
  #app {
    font-family: Arial, Helvetica, sans-serif, 'Noto Sans JP';
  }

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