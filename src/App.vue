<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      :mini-variant.sync="mini"
      app
      style="background-color: #ffffffc8"
    >
      <v-list-item @click="mini = !mini" :ripple="false">
        <v-list-item-icon>
          <v-icon>{{mini ? 'mdi-chevron-right' : 'mdi-chevron-left'}}</v-icon>
        </v-list-item-icon>
        <v-list-item-content class="py-0">
          <v-list-item-title>閉じる</v-list-item-title>
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
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      elevation="1"
      app
      style="background-color: #ffffffc8"
    >
      <v-app-bar-nav-icon v-if="!drawer" @click="drawer = !drawer, mini= false" />
      <v-toolbar-title class="headline px-0"><v-icon color="black" class="mb-1 mr-2">mdi-format-list-checks</v-icon>Task</v-toolbar-title>
      <v-spacer/>
      <v-btn
        @click="Get()"
      >
        get
      </v-btn>
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
    </v-app-bar>
    
    <v-container class="mt-12 px-0 py-0">
      <router-view />
    </v-container>

  </v-app>
</template>

<style>
.v-application--wrap{
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 100%;
  position: relative;
  background-image: url("../src/assets/background.svg");
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
    drawer: true,
    items: [
      { title: 'ホーム', icon: 'mdi-home-variant-outline', link: '/' },
      { title: 'タスクボード', icon: 'mdi-view-dashboard-outline', link: '/dashboard' },
      { title: 'チーム', icon: 'mdi-account-multiple-outline', link: '/team' },
    ],
    isload: false,
    mini: true,
  }),

  components: {
  },

  created: function() {
    this.onAuth()
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
    /*Get() {
      this.$store.dispatch('dbGet', {uid: this.userdata.uid})
    },*/
  },

};
</script>
