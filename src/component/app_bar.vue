<template>
  <v-app-bar
    flat
    color="transparent"
    height="64"
    class="px-0 py-0"
    fixed
    style="backdrop-filter: blur(2px);"
  >

    <v-spacer />

    <v-divider dark vertical inset class="mx-4"></v-divider>

    <div>
      <v-list-item
        dark
        v-if="isauth"
        class="px-0 py-0"
      >
        <v-list-item-avatar
          @click="$router.push({ name: 'Setting' })"
          :ripple="{ center: true }"
          style="cursor: pointer"
        >
          <v-img :src="userdata.photoURL" />
        </v-list-item-avatar>
        <v-list-item-content class="py-0">
          <v-list-item-title v-if="!isphone">
            <v-list-item-subtitle class="text-caption gray--text">
              ログイン済み
            </v-list-item-subtitle>
            <p class="mb-0">
              {{userdata.providerData[0].displayName}}
            </p>
          </v-list-item-title>
        </v-list-item-content>
        <v-list-item-icon>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                icon
                v-bind="attrs"
                v-on="on"
                @click="signOut"
              >
                <v-icon>mdi-logout</v-icon>
              </v-btn>
            </template>
            <span>ログアウト</span>
          </v-tooltip>
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
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dark
                icon
                v-bind="attrs"
                v-on="on"
                @click="signIn"
              >
                <v-icon>mdi-login</v-icon>
              </v-btn>
            </template>
            <span>ログイン</span>
          </v-tooltip>
        </v-list-item-icon>
      </v-list-item>
    </div>
  </v-app-bar>
</template>

<script>
export default {
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
  },
}
</script>

<style>

</style>