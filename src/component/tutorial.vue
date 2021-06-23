<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="80%"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          depressed
          dark
          color="MY_success"
          class="my-2"
          @click="tutorialChange(true)"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon class="mr-2">mdi-play</v-icon>チュートリアルを始める (制作中)
        </v-btn>
      </template>

      <v-stepper
        light
        v-model="e1"
        class="transition-swing rounded-lg"
      >
        <v-stepper-header>
          <v-stepper-step
            color="MY_blue"
            :complete="e1 > 1"
            step="1"
          >
            ログインしよう！
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            color="MY_blue"
            :complete="e1 > 2"
            step="2"
          >
            タスクの追加の仕方
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            color="MY_blue"
            :complete="el > 3"
            step="3"
          >
            完了してみよう
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
            color="MY_blue"
            step="4"
          >
            ペンギンが増えたことを確認
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card
              class="mb-6"
              flat
              min-height="400px"
            >
              <v-card-title>
                ログインしよう！
              </v-card-title>
              <v-card-text>
                タスクを追加する前にまずログインする必要があります。<br>
                特別な会員登録などは必要ありません。<strong>以下のボタンからGoogleアカウントでログインしましょう！</strong><br>
                <v-btn
                  :disabled="isauth"
                  depressed
                  color="MY_success"
                  class="mx-4 my-4 white--text"
                  @click="signIn"
                >
                  <v-icon class="mr-2">mdi-google</v-icon>{{ isauth? 'ログイン済み' : 'Googleアカウントでログイン' }}
                </v-btn><br>
                ログアウトは画面右上の<v-icon>mdi-logout</v-icon>からできます。<br>
                現在以下のアカウントでログインしています。このアカウントで続ける場合は右下の「次へ」を押して下さい。

                <v-list-item v-if="isauth" class="my-4">
                  <v-list-item-avatar>
                    <v-img :src="userdata.photoURL" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{userdata.providerData[0].displayName}}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{userdata.providerData[0].email}}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                  </v-list-item-action>
                </v-list-item>

              </v-card-text>
            </v-card>

            <v-divider class="mt-2 mb-4"/>

            <v-card-actions>
              <v-btn
                dark
                depressed
                color="MY_red"
                @click="dialog = false"
              >
                とじる
              </v-btn>

              <v-spacer />

              <v-btn
                dark
                depressed
                color="MY_blue"
                @click="e1 += 1"
              >
                次へ
              </v-btn>
            </v-card-actions>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card
              class="mb-6"
              flat
              min-height="400px"
            >
              <v-card-title>
                タスクを追加してみよう！
              </v-card-title>
              <v-card-text>
                では、早速タスクを追加してみましょう。下のボタンを押すとタスクを追加できます。<br>
                「 <strong>チュートリアルをやる</strong>」というタイトルでタスクを追加してみてください。
                <Card2 :light="true"></Card2>
                追加できると、下に「チュートリアルをやる」というタスクが表示されるはずです。
              </v-card-text>
            </v-card>

            <v-divider class="mt-2 mb-4"/>

            <v-card-actions>
              <v-btn
                dark
                depressed
                color="MY_red"
                @click="e1 -= 1"
              >
                もどる
              </v-btn>

              <v-spacer />

              <v-btn
                dark
                depressed
                color="MY_blue"
                @click="e1 += 1"
              >
                次へ
              </v-btn>
            </v-card-actions>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card
              class="mb-6"
              color="grey lighten-1"
              min-height="400px"
            ></v-card>

            <v-divider class="mt-2 mb-4"/>

            <v-card-actions>
              <v-btn
                dark
                depressed
                color="MY_red"
                @click="e1 -= 1"
              >
                もどる
              </v-btn>

              <v-spacer />

              <v-btn
                dark
                depressed
                color="MY_blue"
                @click="dialog = false"
              >
                とじる
              </v-btn>
            </v-card-actions>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-dialog>
  </div>
</template>
'
<script>
import Card2 from '../component/task_card_2.vue'

export default {
  data: () => ({
    e1: 1,
    dialog: false
  }),

  components: {
    Card2
  },

  computed: {
    isauth() {
      return this.$store.getters.isauth
    },
    userdata() {
      return this.$store.getters.userdata
    },
    tutorial() {
      return this.$store.getters.tutorial
    }
  },

  methods: {
    signIn() {
      this.$store.dispatch('signIn')
    },
    tutorialChange(bool) {
      this.$store.commit('tutorialChange', bool)
    }
  }

}
</script>

<style>

</style>