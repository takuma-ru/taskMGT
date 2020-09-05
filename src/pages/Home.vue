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
        <!--<v-col align="center">
          <p>{{userdata}}</p>
          <p>{{$store.getters.task}}</p>
        </v-col>-->
        <v-col cols="12" align="center">
          <v-row>
            <v-col v-for="(item, i) in namelist" :key="i" xs="12" sm="12" md="4" align="center">
                <v-card outlined>
                  <v-card-title class="py-2">
                    {{item}}のタスク
                    <v-spacer />
                    <card02 />
                  </v-card-title>
                  <draggable 
                    :list="item"
                    :options="options"
                  >
                    <div v-for="item_2 in task" :key="item_2">
                      <card01
                        v-if="item_2.group == item"
                        :key="item_2.id"
                        :data="item_2"
                        :progress="50"
                        :type="1"
                        class="item"
                      ></card01>
                    </div>
                </draggable>
              </v-card>
            </v-col>
          </v-row>
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
          <p>このアプリの説明・注意事項</p>
          <p><v-icon class="mb-1" color="black">mdi-alert-circle-outline</v-icon>現在"g.ichinoseki.ac.jp"のドメインのみログインが可能になっております。"gmail.com"などではログインできません。</p>
          <p>またこのサービスは現在「開発中」です。ログインしてタスクの追加や削除は行えますが、予告なく保存されたタスクデータを削除する場合がございます。ご了承の上利用してください。</p>
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
import card02 from '../component/task_card_2'

export default {
  data: () => ({
    data: {
      end: '',
      start: '',
      text: '',
      title: '',
      group: '',
    },
    namelist: [
      "未進行", "進行中", "完了済み"
    ],
    isload: false,
    num: 1,
    options: {
      group:'ITEMS',
      animation: 200
    },
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
    task() {
      return this.$store.getters.task
    },
  },

  components: {
    card01,
    card02,
    draggable,
  },

  methods: {
    signIn() {
      this.$store.dispatch('signIn')
    },
    dragEnd(data){
      console.log("dragend :", data)
    }
  },
}
</script>