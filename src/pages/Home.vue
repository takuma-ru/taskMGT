<template>
  <v-container>
    <v-col>
      <v-row v-if="check" justify="center" align="center">
        <h1>読み込み中...</h1>
      </v-row>
      <v-row v-if="isauth && !check" justify="center" align="center">
        <v-col cols="12" align="center">
          <h1>ようこそ「{{userdata.displayName}}」さん</h1><br>
        </v-col>
        <v-col align="center">
          <p>{{userdata.uid}}</p>
          <p>{{dbdata}}</p>
        </v-col>
        <v-col cols="12" align="center">
          <v-col cols="4" align="center">
              <v-card>
                <v-card-title>あなたのタスク</v-card-title>
                <draggable :options="options">
                  <card01
                    v-for="item in dbdata"
                    :key="item.id"
                    :title="item.title"
                    :text="item.text"
                    :date_start="item.date_start.seconds"
                    :date_end="item.date_end.seconds"
                    class="item"
                  ></card01>
                </draggable>
              </v-card>
          </v-col>
        </v-col>
      </v-row>
      <v-row v-if="!isauth && !check" justify="center" align="center">
        <h1>ログインすると利用できます</h1>
        <v-col cols="12" align="center">
          <v-btn
            outlined
            @click="signIn"
          >
            googleアカウントでログイン  
          </v-btn>
        </v-col>
        <v-col align="center">
          <p>このアプリの説明</p>
          <p><v-icon class="mb-1" color="black">mdi-alert-circle-outline</v-icon>現在"g.ichinoseki.ac.jp"のドメインのみログインが可能になっております。"gmail.com"などではログインできません。</p>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<style scoped>
  .item {
    display: inline-block;
  }
  .item:hover {
    cursor: grab;
  }
  .item:active {
    cursor: grabbing;
  }
</style>

<script>
import firebase from 'firebase'
import draggable from 'vuedraggable'
import card01 from '../component/task_card_1'

export default {
  data: () => ({
    options: {
        animation: 200
    },
    isload: false,
  }),
  
  computed: {
    isauth(){
      return this.$store.getters.isauth
    },
    userdata(){
      return this.$store.getters.userdata
    },
    check(){
      return this.$store.getters.check
    },
    dbdata(){
      return this.$store.getters.dbdata
    },
  },

  components: {
    card01,
    draggable,
  },

  methods: {
    signIn() {
      this.$store.dispatch('signIn')
    },
  },
}
</script>