<template>
<v-container class="px-0 py-0">
  <h1 class="pb-3">設定</h1>
  <v-subheader>アプリバージョン： ver.{{ this.$version }}</v-subheader>

  <v-row>
    <v-col cols="12">
      <v-card-title>
        <v-icon class="mr-2">
          mdi-account
        </v-icon>
        <strong class="text-h5">アカウント情報</strong>
        <v-spacer />
      </v-card-title>

      <v-divider />

      <v-card
        flat
        color="transparent"
        class="rounded-lg"
      >
        <div class="px-4 py-4">
          <h3 class="mb-2">
            ログインしているアカウント
          </h3>

          <v-list-item>
            <v-list-item-avatar>
              <v-img :src="userdata.photoURL" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{userdata.providerData[0].displayName}}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{userdata.providerData[0].email}}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
            </v-list-item-action>
          </v-list-item>

          <h3 class="mt-8 mb-2">
            アカウント情報を編集
          </h3>
          <div class="px-4">
            <p>アカウント情報はGoogleアカウントと紐づけられています。名前や画像はGoogleの個人情報ページで変更してください。</p>
            <v-btn
              depressed
              color="MY_success"
              href="https://myaccount.google.com/personal-info"
              target="_blank"
            >
              <v-icon class="mr-2">mdi-google</v-icon>
              <span style="text-transform: none">
                Googleアカウントの個人情報
              </span>
            </v-btn>
          </div>

          <h3 class="mt-8 mb-1">
            アカウントの操作
          </h3>
          <div class="px-4">
            <v-btn
              dark
              depressed
              color="MY_red"
              @click="signOut"
              class="mr-2 my-1"
            >
            <v-icon class="mr-2">mdi-logout</v-icon>ログアウト
            </v-btn>

            <v-btn
              dark
              depressed
              color="MY_red"
              @click="signIn"
              class="my-1"
            >
            <v-icon class="mr-2">mdi-logout</v-icon>別のアカウントでログイン
            </v-btn>

            <br>

            <v-btn
              disabled
              dark
              outlined
              color="MY_red"
              @click="null"
              class="mt-4 my-1"
            >
            <v-icon class="mr-2">mdi-logout</v-icon>アカウントを削除
            </v-btn>
            <p class="mt-1">アカウントを削除してしまうと、
              <ul>
                <li>
                  すべてのタスクデータ
                </li>
                <li>
                  すべての惑星データ
                </li>
                <li>
                  あなたの今までの努力
                </li>
              </ul>
              が完全に削除されます。削除したデータは一生帰ってくることはありません。ご注意ください。
            </p>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {

  computed: {
    isauth() {
      return this.$store.getters.isauth
    },
    userdata() {
      return this.$store.getters.userdata
    },
  },

  methods: {
    signIn() {
      this.$store.dispatch('signIn')
    },
    signOut() {
      this.$store.dispatch('signOut')
    },
  },

}
</script>

<style>

</style>