<template>
  <v-app>
    <v-main>
      <v-container class="py-0 px-3 main_contents">
        <v-app-bar
          flat
          color="transparent"
          height="64"
          class="px-0 py-0"
        >
          <v-btn
            icon
            large
            @click.stop="drawer = !drawer"
          >
            <v-icon large>mdi-menu</v-icon>
          </v-btn>

          <v-spacer />

          <div>
            <v-list-item v-if="isauth" class="px-0">
              <v-list-item-avatar>
                <v-img :src="userdata.photoURL" />
              </v-list-item-avatar>
              <v-list-item-content class="py-0">
                <v-list-item-title>
                  <v-list-item-subtitle>
                    ログイン済み
                  </v-list-item-subtitle>
                  <p class="mb-0 black--text">
                    {{userdata.providerData[0].displayName}}
                  </p>
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon class="">
                <v-btn
                  icon
                  @click="signOut"
                >
                  <v-icon>mdi-logout</v-icon>
                </v-btn>
              </v-list-item-icon>
            </v-list-item>

            <v-list-item v-else class="px-0">
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
          </div>
        </v-app-bar>

        <router-view>
        </router-view>

        <v-footer
          id="footer"
          absolute
          padless
        >
          <v-col
            class="px-0 py-0 text-center white--text"
            cols="12"
          >
            <strong>takuma-ru</strong> - {{ new Date().getFullYear() }}
          </v-col>
        </v-footer>

        <Drawer :drawer="drawer" />

      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Drawer from './component/navigation_drawer'

export default {
  name: 'App',
  data: () => ({
    drawer: false,
    isphone: false,
    isload: false,
    mini: false,
  }),

  components: {
    Drawer,
  },

  created: function() {
    this.onAuth()
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
      this.isphone = true
      console.log("true")
    } else {
      this.isphone = false
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

<style>
  ::-webkit-scrollbar {
    width: 0px;
  }

  .v-main__wrap {
    flex: 1 1 auto;
    max-width: 100%;
    position: relative;
    background-color: #f5f8f8;
    background-image: url("../src/assets/background.svg");
    background-position: center left;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    min-height: 100vh;
  }

  .main_contents {
    min-height: 95vh;
    min-width: 100%;
  }

  #footer {
    height: 5vh;
    background-color: #3B8056;
    bottom: 0%;
  }
</style>