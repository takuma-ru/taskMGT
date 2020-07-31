<!--
  Task:1
  InProgress:2
  Complete:3
-->
<template>
  <v-container>
    <v-hover
      v-slot:default="{ hover }"
      open-delay="0"
    >
    <v-card
      :class="`elevation-${hover ? 9 : 1} card${type}`"
      class="transition-swing rounded-br-xl"
      @click="dialog = true"
      outlined
    >
      <v-progress-linear
        :value="progress"
        height="5px"
        :color="color"
      />
      <v-card-title>
        {{title}}
        <span class="ml-2 body-2 red--text">{{type == 1 ? "未進行": type == 2 ? "進行中..." : "完了済み！"}}</span>
        <v-spacer/>
          <v-btn
            icon
            class="mb-1 ml-1"
            color="#FF7786"
            @click="dialog2 = true"
          >
            <v-icon>mdi-delete-outline</v-icon>
          </v-btn>
      </v-card-title>
      <v-card-text>
        <v-card elevation="0">
          <span><v-icon class="mr-2">mdi-clock-outline</v-icon>{{DtoS(date_start)}}&nbsp;から&nbsp;{{DtoS(date_end)}}&nbsp;まで</span><br>
        </v-card>
      </v-card-text>
    </v-card>
    </v-hover>

    <v-dialog
      v-model="dialog"
      max-width="600px"
    >
      <v-card :class="`card${type}`">
        <v-progress-linear
          :value="progress"
          height="35px"
          :color="color"
        >
          <span class="black--text">進行度:&nbsp;{{progress}}&#037;</span>
        </v-progress-linear>
        <v-card-title class="headline px-6">
          {{title}}
          <v-btn
            icon
            class="mb-1 ml-3"
            color="#7786FF"
            @click="/**/"
          >
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>
          <v-spacer/>
          <p class="mr-3 mb-0 body-2" style="color: #FF7786;">{{type == 1 ? "未進行": type == 2 ? "進行中..." : "完了済み！"}}</p>
          <v-btn
            icon
            class="mb-1 ml-1"
            color="#FF7786"
            @click="dialog2 = true"
          >
            <v-icon>mdi-delete-outline</v-icon>
          </v-btn>
          <v-dialog
            v-model="dialog2"
            persistent
            width="300"
          >
            <v-card>
              <v-img :src="require('../assets/background.svg')" max-height="140px" position="left: 0">
              <v-card-text>
                このタスクを削除しますか？<br>
                ※削除すると元に戻すことはできません
              </v-card-text>
              <v-card-actions>
                <v-btn
                  elevation="1"
                  text
                  @click="dialog2 = false"
                >
                いいえ
                </v-btn>
                <v-spacer/>
                <v-btn
                  elevation="1"
                  outlined
                  color="#FF7786"
                  @click="delTask(id, type); deleting = true; dialog2 = false"
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
          {{text}}
        </v-card-text>

        <v-divider class="mx-2"/>

        <v-card-text class="py-4 black--text">
          <p class="my-0"><v-icon class="mr-2">mdi-clock-outline</v-icon>{{DtoS(date_start)}}&nbsp;から&nbsp;{{DtoS(date_end)}}&nbsp;まで</p><br>
          <p class="my-0">
            <v-icon class="mr-2">mdi-account-outline</v-icon>
            <v-chip color="white">
              <v-avatar size="24" class="mr-2">
                <v-img :src="userdata.photoURL"></v-img>
              </v-avatar>
              {{userdata.displayName}}
            </v-chip>
            <v-btn
              icon
              small
              class="ml-2"
              color="black"
              style="background-color: white; height: 32px; width: 32px;"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </p>
        </v-card-text>

        <v-divider class="mx-2"/>

        <v-card-text class="py-4 black--text">
          <span><v-icon class="mb-1 mr-1">mdi-file-tree</v-icon>サブタスク</span>
          <v-btn
            outlined
            small
            color="#7786FF"
            @click="/**/"
            class="mb-1 ml-3"
          >
            <v-icon>mdi-plus</v-icon>追加
          </v-btn>
          <br>
          <v-checkbox
            v-model="ex4"
            label="red"
            color="red"
            value="red"
            hide-details
          ></v-checkbox>
        </v-card-text>

        <v-divider class="mx-2"/>

        <v-card-actions>
          <v-btn
            elevation="1"
            color="#FF7786"
            text
            @click="dialog = false"
          >
            <v-icon>mdi-menu-left-outline</v-icon>閉じる
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            elevation="1"
            color="#7786FF"
            outlined
            @click="dialog = false"
          >
            <v-icon>mdi-check</v-icon>完了！
          </v-btn>
        </v-card-actions>
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
</style>

<script>
export default {
  data: () => ({
    dialog: false,
    dialog2: false,
  }),

  props:[
    'id',
    'title',
    'text',
    'date_start',
    'date_end',
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
    color(){
      var r = Math.round(255/(100/this.progress))
      var g = Math.round(255/(100/this.progress))
      var b = Math.round(255/(100/this.progress))
      console.log(r, g, b)

      r = r.toString(16)
      g = g.toString(16)
      b = b.toString(16)
      console.log(r, g, b)
      return '#' + r + g + 'ff'
    }
  },

  methods: {
    DtoS(time){//UNIX時間 => YYYY年MM月DD日
      var date = new Date(time * 1000)
      var date_s = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日"
      return date_s
    },
    delTask(id, type){
      var coll
      switch(type){
        case 1:
          coll = 'Task'
          break;
        case 2:
          coll = 'InProgress'
          break;
        case 3:
          coll = 'Complete'
          break;
      }
      console.log("delete: ", id, type, coll)
      this.$store.dispatch('del_task', {coll: coll, docid: id,})
      this.$store.dispatch('onAuth')
    }
  }
}
</script>