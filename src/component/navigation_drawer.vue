<template>
  <v-navigation-drawer
    v-if="!isphone"
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
              <v-icon v-if="$route.path == item.link">{{ item.icon }}</v-icon>
              <v-icon v-else color="#FFFFFF99">{{ item.icon_outline }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>

      <v-footer
        v-show="!mini"
        class="footer"
        absolute
        padless
        color="transparent"
      >
        <v-col
          class="px-0 py-0 text-center white--text"
          cols="12"
        >
          <strong>takuma-ru</strong> - {{ new Date().getFullYear() }}
        </v-col>
      </v-footer>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    value: 'ホーム',
    mini: false,
    items: [
      { title: 'ホーム', icon: 'mdi-home-variant', icon_outline: 'mdi-home-variant-outline', link: '/' },
      { title: 'ボード', icon: 'mdi-view-dashboard', icon_outline: 'mdi-view-dashboard-outline', link: '/taskboard' },
      { title: '設定', icon: 'mdi-cog', icon_outline: 'mdi-cog-outline', link: '/setting' },
      { title: 'このアプリは？', icon: 'mdi-information', icon_outline: 'mdi-information-outline', link: '/about' },
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

  .footer {
    height: 5vh;
    bottom: 0%;
  }
</style>