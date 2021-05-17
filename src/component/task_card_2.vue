<!--
  Task:1
  InProgress:2
  Complete:3
-->
<template>
  <v-container>
    <v-card
      dark
      flat
      color="transparent"
      class="rounded-lg"
      @click="dialog = true"
    >
      <v-col>
        <v-row justify="center" align="center">
          <v-icon class="px-2 py-2" large>mdi-plus</v-icon>タスクを追加する
        </v-row>
      </v-col>
    </v-card>

    <v-dialog
      v-model="dialog"
      persistent
      :fullscreen="isphone"
      max-width="800px"
    >
      <v-card light :class="`card ${ isphone? null : 'rounded-lg' }`">
        <div class="px-4 py-4">
          <div class="pb-2">
            <v-btn
              v-if="isphone"
              icon
              @click="dialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
          <v-card-title class="">
            <v-text-field
              v-model="title"
              label="タイトル"
              placeholder="例).タスク01"
              color="MY_blue"
              prepend-icon="mdi-format-title"
              :counter="15"
              class="pt-0"
            ></v-text-field>
          </v-card-title>

          <v-divider class="mx-2"/>

          <v-card-text class="">
            <v-textarea
              v-model="text"
              row-height="20"
              rows="3"
              :counter="150"
              placeholder="例).何かする"
              color="MY_blue"
              prepend-icon="mdi-text"
              label="詳細"
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
                  color="MY_blue"
                  label="開始日"
                  prepend-icon="mdi-calendar-start"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker light v-model="sd" scrollable color="MY_blue">
                <v-spacer />
                <v-btn text color="MY_red" @click="menu1 = false">Cancel</v-btn>
                <v-btn text color="MY_blue" @click="$refs.menu1.save(sd); StoD(sd)">OK</v-btn>
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
                  color="MY_blue"
                  label="終了日"
                  prepend-icon="mdi-calendar-end"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker light v-model="ed" scrollable color="MY_blue">
                <v-spacer />
                <v-btn text color="MY_red" @click="menu2 = false">Cancel</v-btn>
                <v-btn text color="MY_blue" @click="$refs.menu2.save(ed); StoD(ed)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-card-text>

          <v-divider class="mx-2"/>

          <v-card-text class="py-6 black--text">
            <v-icon class="mr-4">mdi-tag</v-icon>
            <v-btn rounded depressed>
              <v-icon color="grey darken-1">mdi-plus</v-icon>
              <span class="grey-darken-1--text">タグを追加</span>
            </v-btn>
          </v-card-text>

          <v-divider class="mx-2 mb-4" />

          <v-card-actions>
            <v-btn
              dark
              depressed
              color="MY_red"
              @click="dialog = false"
            >
              <v-icon class="mr-1">mdi-chevron-left</v-icon>やめる
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              dark
              depressed
              color="MY_blue"
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
        </div>
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
    activator: null,
    attach: null,
    colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
    editing: null,
    editingIndex: -1,
    tag_items: [
      {name: 'tag1', color: 'MY_blue'},
      {name: 'tag2', color: 'MY_red'},
    ],
    tag_model: [],
    tag_search: null,
  }),

  computed: {
    isphone() {
      return this.$store.getters.isphone
    },
    userdata(){
      return this.$store.getters.userdata
    },
    adding(){
      return this.$store.getters.adding
    },
  },

  watch: {
    model (val, prev) {
      if (val.length === prev.length) return

      this.model = val.map(v => {
        if (typeof v === 'string') {
          v = {
            text: v,
            color: this.colors[this.nonce - 1],
          }

          this.items.push(v)

          this.nonce++
        }

        return v
      })
    },
  },

  methods: {
    edit (index, item) {
      if (!this.editing) {
        this.editing = item
        this.editingIndex = index
      } else {
        this.editing = null
        this.editingIndex = -1
      }
    },
    filter (item, queryText, itemText) {
      if (item.header) return false

      const hasValue = val => val != null ? val : ''

      const text = hasValue(itemText)
      const query = hasValue(queryText)

      return text.toString()
        .toLowerCase()
        .indexOf(query.toString().toLowerCase()) > -1
    },
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