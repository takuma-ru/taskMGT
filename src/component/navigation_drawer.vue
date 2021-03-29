<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    dark
    style="background-color: #9E9E9E"
  >
    <v-list-item class="py-4 px-4">
      <v-list dense rounded>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
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
    </v-list-item>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: 'ホーム', icon: 'mdi-home-variant-outline', link: '/' },
      { title: 'タスクボード', icon: 'mdi-view-dashboard-outline', link: '/taskboard' },
      { title: 'チーム', icon: 'mdi-account-multiple-outline', link: '/team' },
      { title: 'test', icon: 'mdi-ab-testing', link: '/test' },
    ],
  }),

  props:[
    'drawer',
  ]
}
</script>

<style>

</style>