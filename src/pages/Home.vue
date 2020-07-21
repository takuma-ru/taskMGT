<template>
  <v-container>
    <v-col>
      <v-row v-if="isauth" justify="center" align="center">
        <h1>ようこそ「{{userdata.displayName}}」さん</h1>
      </v-row>
      <v-row v-if="!isauth" justify="center" align="center">
        <h1>ログインすると利用できます</h1>
        <v-col cols="12" align="center">
          <v-btn
            outlined
            @click="signIn"
          >
            googleアカウントでログイン  
          </v-btn>
        </v-col>
        <v-col>
          このアプリの説明
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import firebase from 'firebase'

export default {
  data: () => ({
    isload: false,
  }),

  computed: {
    isauth(){
      return this.$store.getters.isauth
    },
    userdata(){
      return this.$store.getters.userdata
    },
  },

  methods: {
    signIn() {
      this.$store.dispatch('signIn')
    },
  },
}
</script>