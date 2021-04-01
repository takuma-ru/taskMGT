<!--
  Task:1
  InProgress:2
  Complete:3
-->
<template>
  <v-container>
    <v-hover
      v-slot:default="{ hover }"
      open-delay="150"
    >
    <v-card
      :class="`elevation-${hover ? 8 : 1} card${type}`"
      class="transition-swing rounded-1"
      @click="dialog = true"
      outlined
    >
      <v-card-title class="pt-3 pb-3">
        <span>{{data.title}}</span>
        <v-spacer/>
      </v-card-title>
      <v-card-actions class="pt-0">
        <!--<v-card
          elevation="0"
          color="#FF7786"
          dark
          class="py-1"
        >-->
          <span class="px-2"><v-icon class="mr-2 mb-1">mdi-clock-outline</v-icon>&nbsp;{{DtoS(data.date_end.seconds)}}&nbsp;まで</span><br>
        <!--</v-card>-->
      </v-card-actions>
    </v-card>
    </v-hover>

    <v-dialog
      v-model="dialog"
      max-width="600px"
    >
      <v-card :class="`card${type}`">
        <v-col>
        <v-card-title class="headline px-4">
          <span @dblclick="Log()">{{data.title}}</span>
          <v-btn
            icon
            class="mb-1 ml-3"
            @click="/**/"
          >
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>
          <v-spacer/>

          <v-btn
            text
            color="#FF7786"
            @click="dialog2 = true"
          >
            <v-icon>mdi-delete-outline</v-icon><strong class="ml-1">削除</strong>
          </v-btn>

          <v-dialog
            v-model="dialog2"
            persistent
            width="300"
          >
            <v-card>
              <v-img :src="require('../assets/background.svg')" max-height="140px" position="left: 0">
              <v-card-text>
                <span class="mb-0 marker_red_futo">このタスクを削除しますか？</span><br>
                ※削除すると元に戻すことはできません
              </v-card-text>
              <v-card-actions>
                <v-btn
                  elevation="1"
                  outlined
                  @click="dialog2 = false"
                >
                <v-icon>mdi-close</v-icon>いいえ
                </v-btn>
                <v-spacer/>
                <v-btn
                  dark
                  elevation="1"
                  color="#FF7786"
                  @click="DelTask(data.id, type); deleting = true; dialog2 = false"
                >
                <v-icon>mdi-delete-outline</v-icon>削除する
                </v-btn>
              </v-card-actions>
              </v-img>
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="deleting"
            persistent
            width="300"
          >
            <v-card>
              <v-img :src="require('../assets/background.svg')" height="90px" position="left: 0">
              <v-card-text>
                <p class="mb-0">削除中...</p>
                <v-progress-linear
                  indeterminate
                  color="black"
                  class="mb-0"
                ></v-progress-linear>
                <p class="mb-0 mt-3">ウィンドウを閉じないでください</p>
              </v-card-text>
              </v-img>
            </v-card>
          </v-dialog>
        </v-card-title>

        <v-divider class="mx-2"/>

        <v-card-text class="py-4 black--text">
          <span><v-icon class="mb-1 mr-1">mdi-text</v-icon>詳細</span>
          <v-btn
            icon
            class="mb-1 ml-3"
            @click="/**/"
          >
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>
          <br>
          {{data.text}}
        </v-card-text>

        <v-divider class="mx-2"/>

        <v-card-text class="py-4 black--text">
          <p class="my-0"><v-icon class="mr-2">mdi-clock-outline</v-icon>期限
          <v-btn
            icon
            class="mb-1 ml-3"
            color=""
            @click="/**/"
          >
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>
          <br>
          {{DtoS(data.date_start.seconds)}}&nbsp;～&nbsp;{{DtoS(data.date_end.seconds)}}&nbsp;</p>
        </v-card-text>

        <v-divider class="mt-2 mb-4"/>

        <v-card-actions>
          <v-btn
            dark
            depressed
            color="#F0A0D2"
            @click="dialog = false"
          >
            <v-icon class="mr-1">mdi-chevron-left</v-icon>とじる
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            dark
            depressed
            color="#7786FF"
            @click="Complete"
          >
            <v-icon class="mr-1">mdi-check</v-icon>完了！
          </v-btn>
        </v-card-actions>
        </v-col>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style>
.card1{
  background-image: url("../assets/card-back.svg");
  background-position: top right;
}
.card2{
  background-image: url("../assets/card-back3.svg");
  background-position: top right;

}
.card3{
  background-image: url("../assets/card-back4.svg");
  background-position: top right;
}
.marker_red_futo {
  background: linear-gradient(transparent 85%, #ff6666 0%);
}
</style>

<script>
import firebase from '../plugins/firebase'
import firestore from '../plugins/firestore'

export default {
  data: () => ({
    dialog: false,
    dialog2: false,
    ex4: null,
  }),

  props:[
    'data',
    'progress',
    'type'
  ],

  computed: {
    temporary_data(){
      return{
        id: this.data.id,
        end: this.data.date_end.seconds,
        start: this.data.date_start.seconds,
        text: this.data.text,
        title: this.data.title,
        group: this.data.group,
      }
    },
    userdata(){
      return this.$store.getters.userdata
    },
    deleting(){
      return this.$store.deleting
    },
    colorType(){
      var color
      switch(this.type){
        case 1:
          color = '#004D40'
          break;
        case 2:
          color = '#1A237E'
          break;
        case 3:
          color = '#FF6F00'
          break;
      }
      return color
    }
  },

  methods: {
    Log(){
      console.log("bdclick")
    },
    Complete(){
      this.temporary_data.group = "完了"
      this.ChangeTask()
    },
    Incomplete(){
      this.temporary_data.group = "目標"
      this.ChangeTask()
    },
    DtoS(time){//UNIX時間 => YYYY年MM月DD日
      var date = new Date(time * 1000)
      var date_s = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日"
      return date_s
    },
    StoD(date){//YYYY年MM月DD日 => UNIX時間
      date = Date.parse(date) * 0.001
      console.log("StoD", date)
      return date
    },
    ChangeTask(){
      if(this.temporary_data.start <= this.temporary_data.end){
        console.log("Adding data...")
        this.$store.dispatch('change_task', { data: this.temporary_data })
        this.dialog = false
      }else{
        console.error("Cannot add.")
      }
    },
    DelTask(id, type){
      console.log("delete: ", id, type)
      this.$store.dispatch('del_task', {docid: id,})
      this.$store.dispatch('onAuth')
    },
  }
}
</script>