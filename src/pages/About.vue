<template>
  <v-container fluid class="pt-4 px-0">
    <div>
      <h1 class="pb-5">このアプリは何？</h1>
      <h3 class="py-2">概要</h3>
      <p class="px-4">このアプリはタスク管理（やることリスト）アプリです。毎日タスクをこなすことで地球にたくさんの生き物たちが住んでくれます。<br>
        たくさんタスクをこなせばたくさんの生き物たちが住んでくれます。</p>
    </div>

    <div class="pb-4">
      <h3 class="py-2">始め方</h3>
      <div class="px-4">
        こちらのチュートリアルから使い方を確認できます。<br>
        <Tutorial></Tutorial>
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
  </v-container>
</template>

<script>
import Tutorial from '../component/tutorial.vue'

export default {

  components: {
    Tutorial
  },

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