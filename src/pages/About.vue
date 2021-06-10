<template>
<v-container class="px-0">
  <div>
    <div>
      <h1 class="pb-5">このアプリは何？</h1>
      <h3 class="py-2">概要</h3>
      <p class="px-4">このアプリはタスク管理（やることリスト）アプリです。毎日タスクをこなすことで地球にたくさんの生き物たちが住んでくれます。<br>
        たくさんタスクをこなせばたくさんの生き物たちが住んでくれます。</p>
    </div>

    <div class="pb-4">
      <h3 class="py-2">始め方</h3>
      <div class="px-4">
        <ol>
          <li>googleアカウントを使ってログインします。<br>
            <v-btn
              depressed
              :disabled="isauth"
              dark
              color="MY_success"
              class="my-2"
              @click="signIn"
            >
              <v-icon small class="mx-2 my-2">mdi-google</v-icon>Googleアカウントでログイン
            </v-btn>
          </li>
          <li>

          </li>
        </ol>
      </div>
    </div>

    <div class="pb-4">
      <h3 class="py-2">その他</h3>
      <v-btn
        text
        href="https://github.com/takuma-ru/taskMGT"
        target="_blank"
      >ソースコード（GitHub）</v-btn><br>
      <v-btn
        text
        href="https://nekoo-homepage.vercel.app/"
        target="_blank"
      >制作者のホームページ</v-btn><br>
      <v-btn
        text
        href="https://play.google.com/store/apps/details?id=takumaru.nekoo.taskmgt"
        target="_blank"
      >アプリをダウンロードする（Android）</v-btn><br>
    </div>
  </div>
</v-container>
</template>

<script>
export default {
  computed: {
    isauth() {
      return this.$store.getters.isauth
    },
  },

  methods: {
    signIn() {
      this.$store.dispatch('signIn')
    },
    onAuth() {
      this.$store.dispatch('onAuth')
    }
  },
}
</script>

<style>
  .v-btn {
    text-transform: none
  }
</style>