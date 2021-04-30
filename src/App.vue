<template>
  <v-app>
    <v-main>
      <v-container class="py-0 px-3" :style="`${isphone ? 'margin-bottom: 56px' : null });`">
        <v-app-bar
          flat
          color="transparent"
          height="64"
          class="px-0 py-0"
          fixed
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
                <v-badge
                  color="#FF77CA"
                  content="1"
                  overlap
                >
                  <v-icon>mdi-bell</v-icon>
                </v-badge>
              </v-btn>
            </template>

            <v-card light>
              <v-card-title>
                通知<v-spacer />1
              </v-card-title>

              <v-divider />

              <v-card-text>
                <v-list>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="#7786FF">mdi-plus</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>「test_task_01」が追加されました</v-list-item-title>
                      <v-list-item-subtitle>2021/04/01</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider />

                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon color="#FF77CA">mdi-minus</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>「test_task_00」が削除されました</v-list-item-title>
                      <v-list-item-subtitle>2021/04/05</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider />
                </v-list>
              </v-card-text>
            </v-card>
          </v-menu>

          <v-divider dark vertical inset class="mx-4"></v-divider>

          <div>
            <v-list-item dark v-if="isauth" class="px-0">
              <v-list-item-avatar>
                <v-img :src="userdata.photoURL" />
              </v-list-item-avatar>
              <v-list-item-content class="py-0">
                <v-list-item-title v-if="!isphone">
                  <v-list-item-subtitle class="text-caption gray--text">
                    ログイン済み
                  </v-list-item-subtitle>
                  <p class="mb-0 white--text">
                    {{userdata.providerData[0].displayName}}
                  </p>
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon v-if="!isphone">
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