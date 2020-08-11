<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      :mini-variant.sync="mini"
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

      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img
            :src="userdata.photoURL"
          >
          </v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            <p class="mt-1 mb-0 body-1 black--text">
              {{userdata.displayName}}
            </p>
          </v-list-item-title>
        </v-list-item-content>
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

    <v-app-bar
      v-if="false"
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      elevation="0"
      :src="require('./assets/card-back.svg')"
      app
      style="background-color: #ffffff00"
    ><!--style="background-color: #ffffffc8"-->
      <template v-slot:img="{ props }">
        <v-img v-bind="props" position="left"></v-img>
      </template>
      <v-app-bar-nav-icon v-if="!drawer" @click="drawer = !drawer, mini= false" />
      <v-toolbar-title class="headline px-0"><v-icon color="black" class="mb-1 mr-2">mdi-format-list-checks</v-icon>Task</v-toolbar-title>
      <v-spacer/>
      <v-toolbar-title>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              text
              :ripple="false"
              v-bind="attrs"
              v-on="on"
            >
              <span>{{isauth ? userdata.displayName : 'ログインしていません'}}</span>
              <v-icon class="ml-1">mdi-chevron-down</v-icon>
            </v-btn>
          </template>

          <v-list class="px-0 py-0">
            <v-card width="300px">
              <v-card-title>
                  <span class="font-weight--bold">アカウント情報</span>
                </v-card-title>
              <v-card-text>
                <div v-if="isauth">
                  <v-avatar size="32" class="mr-2 mb-1">
                    <v-img
                      :src="userdata.photoURL"
                    >
                    </v-img>
                  </v-avatar>
                  <span class="body-1 black--text">
                    {{userdata.displayName}}
                  </span>
                  <v-btn
                    small
                    icon
                  >
                  <v-icon class="mb-1">mdi-cog-outline</v-icon>
                  </v-btn>
                  <br>
                  <span>{{userdata.email}}</span>
                </div>
                <div v-else>
                  <span>ログインしていません</span>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  v-if="!isauth"
                  :disabled="isload"
                  outlined
                  block
                  @click="signIn"
                >
                  Signin with google
                </v-btn>
                <v-btn
                  v-else
                  :disabled="isload"
                  outlined
                  block
                  @click="signOut"
                >
                  Logout
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-list>
        </v-menu>
      </v-toolbar-title>
      <v-divider style="position: absolute; bottom: 0px; left: 0px; width: 100vw;" />
    </v-app-bar>
    
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
