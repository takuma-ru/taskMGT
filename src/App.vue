<template>
  <v-app>
    <v-main>
      <v-container class="py-0 px-3" :style="`${isphone ? 'margin-bottom: 56px' : null });`">

        <Bar />

        <v-container :style="`margin-top: 64px`">
          <v-row v-if="!isauth" class="mt-2" justify="center" align="center" style="color: white">
            <h1>ログインすることで利用できます</h1>
            <v-col cols="12" align="center">
              <v-btn depressed dark color="indigo" @click="signIn">
                <v-icon small class="mr-2">mdi-google</v-icon>googleアカウントでログイン
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
import Drawer from './component/navigation_drawer'
import Drawer2 from './component/bottom_navigation'
import Bar from './component/app_bar'

export default {
  name: 'App',
  data: () => ({
    drawer: false,
  }),

  components: {
    Drawer,
    Drawer2,
    Bar
  },

  mounted() {
    this.onAuth()
    this.$store.dispatch('isphone')
  },

  computed: {
    isauth() {
      return this.$store.getters.isauth
    },
    isphone() {
      return this.$store.getters.isphone
    }
  },

  methods: {
    signIn() {
      this.$store.dispatch('signIn')
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
</style>