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
            color="#7786FF"
            @click="/**/"
          >
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>
          <v-spacer/>
          <v-menu offset-y bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item class="px-0">
                <v-btn
                  block
                  text
                  color="#FF7786"
                  @click="dialog2 = true"
                >
                  <v-icon>mdi-delete-outline</v-icon>削除
                </v-btn>
              </v-list-item>
            </v-list>
          </v-menu>
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
                  @click="delTask(data.id, type); deleting = true; dialog2 = false"
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
            color="#7786FF"
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
            color="#7786FF"
            @click="/**/"
          >
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>
          <br>
          {{DtoS(data.date_start.seconds)}}&nbsp;～&nbsp;{{DtoS(data.date_end.seconds)}}&nbsp;</p>
        </v-card-text>

        <v-divider class="mx-2"/>

        <v-card-actions>
          <v-btn
            elevation="1"
            color="#FF7786"
            outlined
            @click="dialog = false"
          >
            <v-icon>mdi-menu-left-outline</v-icon>閉じる
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            dark
            elevation="1"
            color="#7786FF"
            @click="dialog = false"
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
  background-image: url("../assets/card-back4.svg");
}
.card2{
  background-image: url("../assets/card-back.svg");
}
.card3{
  background-image: url("../assets/card-back2.svg");
}
.marker_red_futo {
  background: linear-gradient(transparent 85%, #ff6666 0%);
}
</style>

<script>
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
    },
    color(){
      var r = Math.round(255/(100/this.progress))
      var g = Math.round(255/(100/this.progress))
      var b = Math.round(255/(100/this.progress))
      //console.log(r, g, b)

      r = r.toString(16)
      g = g.toString(16)
      b = b.toString(16)
      //console.log(r, g, b)
      return '#' + r + g + 'ff'
    }
  },

  methods: {
    Log(){
      console.log("bdclick")
    },
    DtoS(time){//UNIX時間 => YYYY年MM月DD日
      var date = new Date(time * 1000)
      var date_s = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日"
      return date_s
    },
    delTask(id, type){
      console.log("delete: ", id, type)
      this.$store.dispatch('del_task', {docid: id,})
      this.$store.dispatch('onAuth')
    },
  }
}
</script>