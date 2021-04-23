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

      <v-icon>{{ item.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data: () => ({
    value: 'ホーム',
    items: [
      { title: 'ホーム', icon: 'mdi-home-variant', link: '/' },
      { title: 'ボード', icon: 'mdi-view-dashboard', link: '/taskboard' },
      { title: '設定', icon: 'mdi-cog', link: '/setting' },
      { title: 'このアプリは？', icon: 'mdi-information', link: '/about' },
      //{ title: 'Team', icon: 'mdi-account-multiple-outline', link: '/team' },
    ],
  }),

  computed: {
    isphone() {
      return this.$store.getters.isphone
    },
  },
}
</script>

<style>
.bottom-navigation {
  background-image: url("../assets/drawer_background.svg");
  background-size: cover;
  background-position: top right;
}
</style>