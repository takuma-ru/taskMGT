<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      :mini-variant="mini"
      app
      :src="require('./assets/drawer-back.svg')"
    >
    <!--
      :src="require('./assets/card-back.svg')"
      style="background-color: #ffffffc8"
    -->
      <v-list-item  @click="isphone ? drawer = false : mini = !mini" :ripple="false">
        <v-list-item-icon>
          <v-icon>{{mini ? 'mdi-chevron-right' : 'mdi-chevron-left'}}</v-icon>
        </v-list-item-icon>
        <v-list-item-content class="py-0">
          <v-list-item-title>閉じる</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="ml-3 mr-3"></v-divider>

      <v-list-item v-if="isauth" class="px-2">
        <v-list-item-avatar>
          <v-img :src="userdata.photoURL" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            <v-list-item-subtitle>
              ログイン済み
            </v-list-item-subtitle>
            <p class="mb-0 black--text">
              {{userdata.displayName}}
            </p>
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon class="mr-2">
          <v-btn
            icon
            @click="signOut"
          >
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </v-list-item-icon>
      </v-list-item>
      <v-list-item v-else class="px-2">
        <v-list-item-avatar>
          <v-img style="background-color: grey" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            <v-list-item-subtitle>
              未ログイン
            </v-list-item-subtitle>
            <p class="mb-0 black--text">
              -
            </p>
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon class="mr-2">
          <v-btn
            icon
            @click="signIn"
          >
            <v-icon>mdi-login</v-icon>
          </v-btn>
        </v-list-item-icon>
      </v-list-item>

      <v-divider class="ml-3 mr-3"></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    
    <v-main>
      <v-container class="mt-0 px-0 py-0">
        <router-view />
      </v-container>
    </v-main>

  </v-app>
</template>

<style>
.v-main__wrap {
  flex: 1 1 auto;
  max-width: 100%;
  position: relative;
  background-image: url("../src/assets/background-2.svg");
  background-position: center left;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  min-height: 100vh;
}
</style>

<script>
import firebase from './plugins/firebase'

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
