<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      :mini-variant.sync="mini"
      app
    >
      <v-btn
        @click.stop="mini = !mini"
        icon
        class="ml-2"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
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
      color="white"
    >
      <v-toolbar-title class="headline"><v-icon color="black" class="mb-1 mr-2">mdi-format-list-checks</v-icon>タスク管理アプリ</v-toolbar-title>
      <v-spacer/>
      <v-toolbar-title>
        <span>/yourname/</span>
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
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  min-height: 100vh;
}
</style>

<script>
export default {
  name: 'App',

  components: {
  },

  data: () => ({
    drawer: true,
    mini: true,
    items: [
      { title: 'Home', icon: 'mdi-dashboard' },
      { title: 'About', icon: 'mdi-question_answer' },
    ],
  }),
};
</script>
