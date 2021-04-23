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

          <!--<v-toolbar-title class="text-h5">タスク管理</v-toolbar-title>-->

          <v-spacer />

          <v-menu
            bottom
            left
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-translate</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-divider dark vertical inset class="mx-4"></v-divider>

          <div>
            <v-list-item dark v-if="isauth" class="px-0">
              <v-list-item-avatar>
                <v-img :src="userdata.photoURL" />
              </v-list-item-avatar>
              <v-list-item-content class="py-0">
                <v-list-item-title>
                  <v-list-item-subtitle class="text-caption gray--text">
                    ログイン済み
                  </v-list-item-subtitle>
                  <p class="mb-0 white--text">
                    {{userdata.providerData[0].displayName}}
                  </p>
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon class="">
                <v-btn
                  dark
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
                  <v-list-item-subtitle class=" white--text">
                    未ログイン
                  </v-list-item-subtitle>
                  <p class="mb-0 white--text">
                    -
                  </p>
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon class="mr-2">
                <v-btn
                  dark
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

        <Drawer :drawer="drawer" />

      </v-container>
    </v-main>
    <Drawer2></Drawer2>
  </v-app>
</template>

<script>
import Drawer from './component/navigation_drawer'
import Drawer2 from './component/bottom_navigation'

export default {
  name: 'App',
  data: () => ({
    drawer: false,
    isload: false,
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' },
    ],
  }),

  components: {
    Drawer,
    Drawer2
  },

  mounted() {
    this.onAuth()
    this.$store.dispatch('isphone')
  },

  computed: {
    isauth() {
      return this.$store.getters.isauth
    },
    userdata() {
      return this.$store.getters.userdata
    },
    check() {
      return this.$store.getters.check
    },
    isphone() {
      return this.$store.getters.isphone
    }
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