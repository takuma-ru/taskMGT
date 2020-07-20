<template>
  <v-container>
    <v-col>
      <v-row justify="center" align="center">
        <v-sheet>
          <v-card width="400px">
            <v-card-title><v-icon class="mr-2">mdi-google</v-icon>googleアカウントでログイン</v-card-title>
            <v-card-text>
              <v-avatar v-if="isAuth" size="36">
                <v-img
                  :src="user.photoURL"
                >
                </v-img>
              </v-avatar>
              <span>
                {{user.displayName}}
              </span><br>
            </v-card-text>
            <v-card-actions>
              <v-btn
                v-if="!isAuth"
                :disabled="isload"
                outlined
                block
                @click="signIn"
              >
                Login
              </v-btn>
              <v-btn
                v-else
                :disabled="isload"
                outlined
                block
                @click="signOut"
              >
                Logout
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-sheet>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import firebase from 'firebase'
import { mapState,mapMutations,mapActions,mapGetters } from 'vuex'

export default {
  data: () => ({
    isAuth: false,
    isload: false,
    user: {photoURL: '',},
  }),
  
  mounted: function () {
    firebase.auth().onAuthStateChanged((user) => {
        this.isAuth = !!user
        this.user = user;
        this.isload = false;
        console.log("sucsses!")
    })
  },

  computed: {
    ...mapState([
      "login",
    ]),
    getuser(){
      return this.$store.getters.login
    }
  },

  methods: {
    signIn: function () {
      this.isload = true;
      console.log("signin...");
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },
    signOut: function () {
      this.isload = true;
      console.log("signout...");
      firebase.auth().signOut()
    },
  },
}
</script>