<template>
  <v-bottom-navigation
    light
    v-if="isphone"
    v-model="value"
    grow
    shift
  >
    <v-btn
      v-for="item in items"
      :key="item.title"
      :to="item.link"
      :value="item.title"
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
      { title: 'このアプリは何？', icon: 'mdi-information', link: '/about' },
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

</style>