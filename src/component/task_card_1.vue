<template>
  <v-container>
    <!--簡易表示-->
    <v-hover
      v-slot:default="{ hover }"
      open-delay="50"
    >
      <v-card
        light
        :class="`elevation-${hover ? 9 : 1} card${type}`"
        class="transition-swing rounded-lg"
        @click="dialog = true"
      >
        <v-card-title class="py-2">
          <div style="width: 100%; height: 3vh;">
            <v-chip
              v-for="item in data.tag"
              :key="item"
              dark
              :color="tags_group[item].color"
              class="mr-2 py-1"
              style="height: 1vh; width: 2vw"
            >
            </v-chip>
          </div>
          <span>{{data.title}}</span>
          <span v-if="data.group == '完了'" class="ml-4 gray--text text-subtitle-2">
            <v-icon>
              mdi-check
            </v-icon>
            完了済み
          </span>
          <v-spacer/>
        </v-card-title>
        <v-card-actions class="pt-0">
            <span
              v-if="data.date_end.seconds == today"
              class="px-2 font-weight-bold"
              style="color: #EF6786"
            >
              <v-icon class="mr-2 mb-1" color="My_error">mdi-clock-outline</v-icon>
              今日まで！！急げ
            </span>
            <span
              v-else
              class="px-2"
            >
              <v-icon class="mr-2 mb-1">mdi-clock-outline</v-icon>
              &nbsp;{{DtoS(data.date_end.seconds)}}&nbsp;まで
            </span>
            <br>
        </v-card-actions>
      </v-card>
    </v-hover>

    <!--詳細表示-->
    <v-dialog
      light
      v-model="dialog"
      :fullscreen="isphone"
      max-width="800px"
    >
      <v-card light :class="`card${type} rounded-lg`">
        <div class="px-4 py-4">
          <div class="pb-4">
            <v-btn
              v-if="isphone"
              large
              text
              @click="dialog = false"
              class="px-0"
            >
              <v-icon
                large
                class="mr-1"
              >mdi-chevron-left</v-icon>とじる
            </v-btn>
          </div>
          <div class="px-4">
            <v-chip
              v-for="item in data.tag"
              :key="item"
              class="mr-2 my-1"
              :color="tags_group[item].color"
              dark
            >
              {{ tags_group[item].name }}
            </v-chip>
          </div>
          <v-card-title class="headline px-4">
            <p class="mb-0" @dblclick="Log()">{{data.title}}</p>
            <span v-if="data.group == '完了'" class="ml-4 text-subtitle-2" style="color: #79DFA1">
              <v-icon>
                mdi-check
              </v-icon>
              完了済み
            </span>
            <v-spacer/>

            <v-btn
              disabled
              icon
              class="mr-4"
              @click="/**/"
            >
              <v-icon>mdi-pencil-outline</v-icon><!--<span class="ml-1 font-weight-bold text-subtitle-2">編集</span>-->
            </v-btn>

            <v-btn
              icon
              @click="dialog2 = true"
            >
              <v-icon>mdi-delete-outline</v-icon><!--<span class="ml-1 font-weight-bold text-subtitle-2">削除</span>-->
            </v-btn>

            <v-dialog
              v-model="dialog2"
              persistent
              width="400"
            >
              <v-card>
                <v-img :src="require('../assets/card-back3.svg')" max-height="140px" position="left: 0">
                  <v-card-text class="black--text">
                    <span class="mb-0 marker_red_futo">このタスクを削除しますか？</span><br>
                    ※削除すると元に戻すことはできません
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      dark
                      depressed
                      color="MY_blue"
                      @click="dialog2 = false"
                    >
                    <v-icon class="mr-2">mdi-close</v-icon>いいえ
                    </v-btn>
                    <v-spacer/>
                    <v-btn
                      dark
                      depressed
                      color="MY_red"
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
                <v-img :src="require('../assets/card-back3.svg')" height="90px" position="left: 0">
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

          <v-card-text class="py-4">
            <span><v-icon class="mb-1 mr-1">mdi-text</v-icon>詳細</span>
            <br>
            {{data.text}}
          </v-card-text>

          <v-divider class="mx-2"/>

          <v-card-text class="py-4">
            <span class="my-0"><v-icon class="mr-2">mdi-clock-outline</v-icon>期限
              <br>
              {{DtoS(data.date_start.seconds)}}&nbsp;～&nbsp;{{DtoS(data.date_end.seconds)}}&nbsp;<br>
              <p v-if="data.group == '完了'" class="mt-4 mb-0 font-weight-bold" style="color: #79DFA1">{{DtoS(data.completed.seconds)}}に完了！</p>
            </span>
          </v-card-text>

          <v-divider class="mt-2 mb-4"/>

          <v-card-actions>
            <v-btn
              v-if="!isphone"
              dark
              depressed
              color="MY_red"
              @click="dialog = false"
            >
              <v-icon class="mr-1">mdi-chevron-left</v-icon>とじる
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              v-if="data.group == '目標'"
              dark
              depressed
              color="MY_blue"
              @click="Complete"
            >
              <v-icon class="mr-1">mdi-check</v-icon>完了！
            </v-btn>
            <v-btn
              v-else
              dark
              depressed
              color="MY_blue"
              @click="Incomplete"
            >
              <v-icon class="mr-1">mdi-check</v-icon>やっぱまだ完了じゃない
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialog2: false,
    ex4: null,
    tags_group: [
      {name: '簡単', color: 'MY_blue'},
      {name: '優先度：高', color: 'MY_red'},
      {name: '優先度：中', color: 'MY_yellow_dark'},
      {name: '優先度：低', color: 'MY_green_dark'},
    ],
  }),

  props:[
    'data',
    'progress',
    'type'
  ],

  computed: {
    today(){
      return this.StoD(new Date().toISOString().substr(0, 10))
    },
    isphone() {
      return this.$store.getters.isphone
    },
    temporary_data(){
      console.log(this.data)
      return{
        id: this.data.id,
        date_end: this.data.date_end,
        date_start: this.data.date_start,
        text: this.data.text,
        title: this.data.title,
        group: this.data.group,
        completed: this.data.completed,
        tag: this.data.tag
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
      this.temporary_data.group = '完了'
      this.temporary_data.completed = new Date().toISOString().substr(0, 10)
      this.ChangeTask()
    },
    Incomplete(){
      this.temporary_data.group = '目標'
      this.temporary_data.completed = null
      this.ChangeTask()
    },
    DtoS(time){//UNIX時間 => YYYY年MM月DD日
      var date = new Date(time * 1000)
      var date_s = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日"
      return date_s
    },
    StoD(date){//YYYY年MM月DD日 => UNIX時間
      date = Date.parse(date) * 0.001
      //console.log("StoD", date)
      return date
    },
    ChangeTask(){
      //this.StoD(this.temporary_data.date_end.seconds)
      //this.StoD(this.temporary_data.date_start.seconds)
      this.StoD(this.temporary_data.completed)

      if(this.temporary_data.date_start <= this.temporary_data.date_end){
        var type
        if(this.temporary_data.group == '目標'){
          type = 0
        }
        if(this.temporary_data.group == '完了'){
          type = 1
        }

        console.log("Changing data...")
        this.$store.dispatch('change_task', { data: this.temporary_data, type: type })
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

<style>
.card1{
  background-image: url("../assets/card-back.svg");
  background-size: cover;
  background-position: top right;
}
.card2{
  background-image: url("../assets/card-back4.svg");
  background-size: cover;
  background-position: top right;
}
.card3{
  background-image: url("../assets/card-back3.svg");
  background-size: cover;
  background-position: top right;
}
.marker_red_futo {
  background: linear-gradient(transparent 85%, #ff6666 0%);
}
</style>
