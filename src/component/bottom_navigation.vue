<template>
  <v-bottom-navigation
    v-if="isphone"
    v-model="value"
    fixed
    grow
    shift
    class="bottom-navigation"
  >
    <v-btn
      dark
      v-for="item in items"
      :key="item.title"
      :to="item.link"
      :value="item.title"
      icon
      style="height: 100%"
    >
      <span>{{ item.title }}</span>

      <v-icon v-if="$route.path == item.link">{{ item.icon }}</v-icon>
      <v-icon v-else color="#FFFFFF99">{{ item.icon_outline }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: 'ホーム', icon: 'mdi-home-variant', icon_outline: 'mdi-home-variant-outline', link: '/' },
      { title: 'ボード', icon: 'mdi-view-dashboard', icon_outline: 'mdi-view-dashboard-outline', link: '/taskboard' },
      { title: '設定', icon: 'mdi-cog', icon_outline: 'mdi-cog-outline', link: '/setting' },
      { title: 'このアプリは？', icon: 'mdi-information', icon_outline: 'mdi-information-outline', link: '/about' },
    ],
  }),

  computed: {
    isphone() {
      return this.$store.getters.isphone
    },
    value() {
      var link = this.$route.path
      console.log(link)
      switch (link) {
        case '/':
          return 'ホーム'
        case '/taskboard':
          return 'ボード'
        case '/setting':
          return '設定'
        case '/about':
          return 'このアプリは？'
      }
    }
  }
}
</script>

<style>
.bottom-navigation {
  background-image: url("../assets/drawer_background.svg");
  background-size: cover;
  background-position: top right;
}
</style>