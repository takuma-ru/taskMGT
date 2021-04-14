<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    dark
    class="drawer_back"
  >
      <v-list rounded>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
          class="mx-2 my-3"
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
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: 'Home', icon: 'mdi-home-variant-outline', link: '/' },
      { title: 'TasksBoard', icon: 'mdi-view-dashboard-outline', link: '/taskboard' },
      //{ title: 'Team', icon: 'mdi-account-multiple-outline', link: '/team' },
    ],
  }),

  props:[
    'drawer',
  ]
}
</script>

<style>
  .drawer_back {
    background-image: url("../assets/drawer_background.svg");
    background-size: cover;
    background-position: top left;
  }
</style>