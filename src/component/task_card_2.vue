<!--
  Task:1
  InProgress:2
  Complete:3
-->
<template>
<div>
  <v-container>
    <v-btn
      icon
      color="black"
      @click="dialog = true"
    >
       <v-icon large>mdi-plus</v-icon>
    </v-btn>
    <!--<v-hover
      v-slot:default="{ hover }"
      open-delay="0"
    >
      <v-card
        outlined
        :class="`elevation-${hover ? 5 : 0}`"
        class="transition-swing rounded-br-xl"
        @click="dialog = true"
      >
        <v-col>
          <v-row justify="center" align="center">
            <v-icon large>mdi-plus</v-icon>
          </v-row>
        </v-col>
      </v-card>
    </v-hover>-->

    <v-dialog
      v-model="dialog"
      persistent
      max-width="610px"
    >
      <v-card class="card">
        <v-card-title class="headline px-3 pb-0">
          <v-text-field
            v-model="title"
            label="タイトル"
            placeholder="例).タスク01"
            outlined
            color="black"
          ></v-text-field>
          <v-spacer/>
        </v-card-title>

        <v-divider class="mx-2"/>

        <v-card-text class="pt-3 pb-0 black--text">
          <p><v-icon class="mb-1 mr-1">mdi-text</v-icon>詳細</p>
          <v-textarea
            v-model="text"
            row-height="20"
            rows="2"
            class="py-0"
          />
        </v-card-text>

        <v-divider class="mx-2"/>

        <v-card-text class="py-4 black--text">
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            :return-value.sync="sd"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="sd"
                label="開始日"
                prepend-icon="mdi-clock-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="sd" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu1.save(sd); StoD(sd)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          <v-menu
            ref="menu2"
            v-model="menu2"
            :close-on-content-click="false"
            :return-value.sync="ed"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="ed"
                label="終了日"
                prepend-icon="mdi-clock-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="ed" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu2.save(ed); StoD(ed)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-card-text>

        <v-divider class="mx-2"/>

        <v-card-actions>
          <v-btn
            elevation="1"
            color="#FF7786"
            outlined
            @click="dialog = false"
          >
            <v-icon class="mr-1 mb-1">mdi-menu-left-outline</v-icon>やめる
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            dark
            elevation="1"
            color="#7786FF"
            @click="addTask"
          >
            <v-icon class="mr-1">mdi-plus</v-icon>追加する
          </v-btn>
          <v-dialog
            v-model="adding"
            persistent
            width="300"
          >
            <v-card>
              <v-img :src="require('../assets/background.svg')" height="90px" position="left: 0">
              <v-card-text>
                <p class="mb-0">送信中...</p>
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
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</div>
</template>

<style>
.card{
  background-image: url("../assets/card-back3.svg");
}
</style>

<script>
export default {
  data: () => ({
    dialog: false,
    title: null,
    text: null,
    date_start: null,
    date_end: null,
    group: '目標',
    menu1: false,
    menu2: false,
    progress: null,
    sd: new Date().toISOString().substr(0, 10),
    ed: new Date().toISOString().substr(0, 10),
    type: null,
  }),

  computed: {
    userdata(){
      return this.$store.getters.userdata
    },
    adding(){
      return this.$store.getters.adding
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
      var date_s = date.getFullYear() + "年" + date.getMonth() + "月" + date.getDate() + "日"
      return date_s
    },
    StoD(date){//YYYY年MM月DD日 => UNIX時間
      date = Date.parse(date) * 0.001
      console.log("StoD", date)
      return date
    },
    init(){
      this.title = ''
      this.text = ''
      this.sd = new Date().toISOString().substr(0, 10)
      this.ed = new Date().toISOString().substr(0, 10)
    },
    addTask(){
      this.StoD(this.sd)
      this.StoD(this.ed)
      if(this.sd < this.ed){
        console.log("Adding data...")
        this.$store.dispatch('add_task', {
          end: this.ed,
          start: this.sd,
          text: this.text,
          title: this.title,
          group: this.group,
        })
        this.dialog = false
        this.init()
      }else{
        console.error("Cannot add.")
      }
    },
  }
}
</script>