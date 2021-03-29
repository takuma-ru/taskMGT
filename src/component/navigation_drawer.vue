<template>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      :mini-variant="mini"
      app
      style="background-color: #ffffff00"
    >
    <!--
      :src="require('./assets/card-back.svg')"
      style="background-color: #ffffffc8"
    -->
      <v-list-item  @click="isphone ? drawer = false : mini = !mini" :ripple="false">
        <v-list-item-icon>
          <v-icon>{{mini ? 'mdi-chevron-right' : 'mdi-chevron-left'}}</v-icon>
        </v-list-item-icon>
        <v-list-item-content class="py-0">
          <v-list-item-title>閉じる</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="ml-3 mr-3"></v-divider>

      <v-list-item v-if="isauth" class="px-2">
        <v-list-item-avatar>
          <v-img :src="userdata.photoURL" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            <v-list-item-subtitle>
              ログイン済み
            </v-list-item-subtitle>
            <p class="mb-0 black--text">
              {{userdata.displayName}}
            </p>
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon class="mr-2">
          <v-btn
            icon
            @click="signOut"
          >
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </v-list-item-icon>
      </v-list-item>
      <v-list-item v-else class="px-2">
        <v-list-item-avatar>
          <v-img style="background-color: grey" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            <v-list-item-subtitle>
              未ログイン
            </v-list-item-subtitle>
            <p class="mb-0 black--text">
              -
            </p>
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon class="mr-2">
          <v-btn
            icon
            @click="signIn"
          >
            <v-icon>mdi-login</v-icon>
          </v-btn>
        </v-list-item-icon>
      </v-list-item>

      <v-divider class="ml-3 mr-3"></v-divider>

      <v-list dense>
        <v-list-item
          v-for="(i, item) in items"
          :key="i"
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
    </v-navigation-drawer>
</template>

<script>
export default {

}
</script>

<style>

</style>