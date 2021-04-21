<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant="mini"
    :permanent="!isphone"
    app
    dark
    class="drawer_back"
  >
      <v-list rounded>
        <div
          @mouseover="mini = false"
          @mouseleave="mini = true"
        >
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.link"
            class="px-2"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    mini: true,
    items: [
      { title: 'ホーム', icon: 'mdi-home-variant-outline', link: '/' },
      { title: 'ボード', icon: 'mdi-view-dashboard-outline', link: '/taskboard' },
      { title: 'このアプリは何？', icon: 'mdi-information-outline', link: '/about' },
      //{ title: 'Team', icon: 'mdi-account-multiple-outline', link: '/team' },
    ],
  }),

  props:[
    'drawer',
  ],

  mounted() {
    if(this.isphone == true){
      this.mini = false
    }else{
      this.mini = true
    }
  },

  computed: {
    isphone() {
      return this.$store.getters.isphone
    },
  },
  methods: {
  }
}
</script>

<style>
  .drawer_back {
    background-image: url("../assets/drawer_background.svg");
    background-size: cover;
    background-position: top right;
  }
</style>