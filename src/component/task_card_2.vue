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
        light
        outlined
        :class="`elevation-${hover ? 8 : 1}`"
        class="transition-swing"
        color="#fffaf5"
        @click="dialog = true"
      >
        <v-col>
          <v-row justify="center" align="center">
            <v-icon class="px-2 py-2" large>mdi-plus</v-icon>
          </v-row>
        </v-col>
      </v-card>
    </v-hover>

    <v-dialog
      v-model="dialog"
      persistent
      max-width="800px"
    >
      <v-card light class="card">
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

        <v-card-text class="py-4 pb-0 black--text">
          <v-dialog
            ref="menu1"
            v-model="menu1"
            :return-value.sync="sd"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="sd"
                label="開始日"
                prepend-icon="mdi-calendar-start"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="sd" scrollable>
              <v-spacer />
              <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu1.save(sd); StoD(sd)">OK</v-btn>
            </v-date-picker>
          </v-dialog>

          <v-dialog
            ref="menu2"
            v-model="menu2"
            :return-value.sync="ed"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="ed"
                label="終了日"
                prepend-icon="mdi-calendar-end"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="ed" scrollable>
              <v-spacer />
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu2.save(ed); StoD(ed)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </v-card-text>

        <v-divider class="mt-2 mb-4" />

        <v-card-actions>
          <v-btn
            dark
            depressed
            color="#FF77CA"
            @click="dialog = false"
          >
            <v-icon class="mr-1">mdi-chevron-left</v-icon>やめる
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            dark
            depressed
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
              <v-img :src="require('../assets/background_speace.svg')" height="90px" position="left: 0">
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
</template>

<style>
.card{
  background-image: url("../assets/card-back2.svg");
  background-position: top right;
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
      if(this.sd <= this.ed){
        console.log("Adding data...")
        this.$store.dispatch('add_task', {
          end: this.ed,
          start: this.sd,
          text: this.text,
          title: this.title,
          group: this.group,
          completed: null
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