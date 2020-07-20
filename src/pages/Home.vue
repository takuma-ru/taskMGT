<template>
  <v-container>
    <v-col>
      <v-row justify="center" align="center">
        <v-sheet>
          <v-card width="400px">
            <v-card-title>
              <span v-if="!isauth">SIGNIN</span>
              <span v-else>Account Information</span>
              </v-card-title>
            <v-card-text>
              <v-avatar v-if="isauth" size="36" class="mr-1 mb-1">
                <v-img
                  :src="userdata.photoURL"
                >
                </v-img>
              </v-avatar>
              <span class="black--text">
                {{userdata.displayName}}
              </span><br>
            </v-card-text>
            <v-card-actions>
              <v-btn
                v-if="!isauth"
                :disabled="isload"
                outlined
                block
                @click="signIn"
              >
                Signin with google
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
    signOut() {
      this.$store.dispatch('signOut')
    },
  },
}
</script>