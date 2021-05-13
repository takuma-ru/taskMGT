<template>
<v-container class="px-0 py-0">
  <h1 class="pb-5">このアプリは何？</h1>
  <h3 class="py-2">概要</h3>
  <p>このアプリはタスク管理（やることリスト）アプリです。毎日タスクをこなすことで地球が成長します。<br>
  たくさんタスクをこなせばその分地球は成長しますし、逆に全然タスクをやらないと地球は滅んでしまいます。</p>

  <h3 class="py-2">始め方</h3>
  <ol>
    <li>googleアカウントを使ってログインします。
      <v-btn depressed dark color="MY_blue" @click="signIn">
        <v-icon small class="mx-2 my-2">mdi-google</v-icon>googleアカウントでログイン
      </v-btn>
    </li>
  </ol>
</v-container>
</template>

<script>
export default {
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

</style>