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
              <v-date-picker light v-model="sd" scrollable color="MY_blue" class="rounded-lg">
                <v-btn
                  dark
                  depressed
                  color="MY_red"
                  @click="menu1 = false"
                >とじる</v-btn>
                <v-spacer />
                <v-btn
                  dark
                  depressed
                  color="MY_blue"
                  @click="$refs.menu1.save(sd); StoD(sd)"
                >OK</v-btn>
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
              <v-date-picker light v-model="ed" scrollable color="MY_blue" class="rounded-lg">
                <v-btn
                  dark
                  depressed
                  color="MY_red"
                  @click="menu2 = false">とじる</v-btn>
                <v-spacer />
                <v-btn
                  dark
                  depressed
                  color="MY_blue"
                  @click="$refs.menu2.save(ed); StoD(ed)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-card-text>

          <v-divider class="mx-2"/>

          <v-card-text class="py-6 black--text">
            <v-icon class="mr-4">mdi-tag</v-icon>
            <v-chip
              v-for="item in tag_selected"
              :key="item"
              dark
              :color="tag_items[item].color"
              class="mx-1"
            >
              {{ tag_items[item].name }}
            </v-chip>
            <v-bottom-sheet
              light
              v-model="sheet"
              inset
              max-width="800px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  rounded
                  depressed
                  dark
                  color="grey darken-2"
                  class="mx-1"
                >
                  <v-icon >mdi-plus</v-icon>
                  <span>タグを追加</span>
                </v-btn>
              </template>
              <v-sheet
                class="px-4 py-4 rounded-t-lg"
              >
                <v-card-title>
                  タグの追加
                </v-card-title>

                <v-card-text>
                  <v-list rounded dense>
                    <v-list-item-group
                      v-model="tag_selected"
                      multiple
                      active-class=""
                    >
                      <v-list-item
                        light
                        v-for="(item, i) in tag_items"
                        :key="i"
                        :color="item.color"
                      >
                        <template v-slot:default="{ active }">
                          <v-list-item-action>
                            <v-checkbox
                              :input-value="active"
                              :color="item.color"
                              :ripple="false"
                            ></v-checkbox>
                          </v-list-item-action>
                          <v-list-item-title>
                            <v-chip
                              dark
                              small
                              :color="item.color"
                              class="mr-4"
                            >
                              {{ item.name }}
                            </v-chip>
                            {{ item.description }}
                          </v-list-item-title>
                        </template>
                      </v-list-item>
                      <v-list-item
                        light
                        to="/setting"
                      >
                        <v-list-item-icon>
                          <v-icon>mdi-plus</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>
                          <v-chip
                            dark
                            small
                            class="mr-4"
                          >
                            新しいタグ
                          </v-chip>
                          設定画面に移動します
                        </v-list-item-title>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card-text>

                <v-divider class="mx-2 mb-4" />
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    dark
                    depressed
                    color="MY_blue"
                    @click="sheet = false"
                  >
                    <v-icon class="mr-1">mdi-check</v-icon>OK
                  </v-btn>
                </v-card-actions>
              </v-sheet>
            </v-bottom-sheet>
          </v-card-text>

          <v-divider class="mx-2 mb-4" />

          <v-card-actions>
            <v-btn
              v-if="!isphone"
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
    tag_items:[
      {name: '簡単', color: 'MY_blue', description: '簡単なタスク'},
      {name: '緊急', color: 'MY_red', description: '至急完了させる必要がある'},
    ],
    tag_items: [
      {name: '簡単', color: 'MY_blue', description: '簡単なタスク'},
      {name: '優先度：高', color: 'MY_red', description: '至急完了させる必要がある'},
      {name: '優先度：中', color: 'MY_yellow_dark', description: 'やらなきゃいけないやつ'},
      {name: '優先度：低', color: 'MY_green_dark', description: '別に急ぐ必要はないはず'},
    ],
    tag_model: [],
    tag_search: null,
    sheet: false,
    tag_selected: [],
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
          completed: null,
          tag: this.tag_selected
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