<template>
  <v-container>
    <v-card
      :light="light"
      :dark="!light"
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
      :fullscreen="isphone"
      :transition="isphone? `dialog-bottom-transition` : `dialog-transition`"
      max-width="800px"
    >
      <v-card
        light
        :class="`card ${ isphone? null : 'rounded-lg' }`"
      >
        <div class="px-4 py-4">
          <div class="pb-4 text-center">
            <v-btn
              v-if="isphone"
              large
              block
              text
              @click="dialog = false"
              class="px-0"
            >
              <span>とじる</span><br>
              <v-icon
                large
                class="mr-1"
              >mdi-chevron-down</v-icon>
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

            <v-text-field
              v-model="sd"
              @click="sd_sheet = true"
              color="MY_blue"
              label="開始日"
              prepend-icon="mdi-calendar-end"
              readonly
            ></v-text-field>
            <swipemodal
              v-model="sd_sheet"
              height="auto"
              width="350px"
              radius="10px"
            >
              <v-sheet
                class="px-0 py-0 rounded-t-lg"
              >
                <v-card-title class="font-weight-black">
                  開始日
                </v-card-title>

                <v-divider class="mx-2 mb-4" />

                <v-checkbox
                  disabled
                  v-model="sd"
                  label="設定しない(実装中)"
                  color="MY_blue"
                  value="設定しない"
                  hide-details
                  class="py-2"
                ></v-checkbox>
                <v-date-picker
                  light
                  v-model="sd"
                  scrollable
                  color="MY_blue"
                  width="100%"
                />
              </v-sheet>
            </swipemodal>

            <v-text-field
              v-model="ed"
              @click="ed_sheet = true"
              color="MY_blue"
              label="終了日"
              prepend-icon="mdi-calendar-end"
              readonly
            ></v-text-field>
            <swipemodal
              v-model="ed_sheet"
              height="auto"
              width="350px"
              radius="10px"
            >
              <v-sheet
                class="px-0 py-0 rounded-t-lg"
              >
                <v-card-title class="font-weight-black">
                  終了日
                </v-card-title>

                <v-divider class="mx-2 mb-4" />

                <v-checkbox
                  disabled
                  v-model="ed"
                  label="設定しない(実装中)"
                  color="MY_blue"
                  value="設定しない"
                  hide-details
                  class="py-2"
                ></v-checkbox>
                <v-date-picker
                  light
                  v-model="ed"
                  scrollable
                  color="MY_blue"
                  width="100%"
                />
              </v-sheet>
            </swipemodal>
          </v-card-text>

          <v-divider class="mx-2"/>

          <v-card-text class="py-6 black--text">
            <v-icon class="mr-4">mdi-tag</v-icon>
            <v-chip
              v-for="item in tag_selected"
              :key="item"
              dark
              :color="tag_items[item].color"
              class="mx-1 my-1"
            >
              {{ tag_items[item].name }}
            </v-chip>

            <v-btn
              v-model="sheet"
              @click="sheet = true"
              rounded
              depressed
              dark
              color="grey darken-2"
              class="mx-1"
            >
              <v-icon >mdi-plus</v-icon>
              <span>タグを追加</span>
            </v-btn>
            <swipemodal
              v-model="sheet"
              height="auto"
              width="800px"
              maxwidth="100vw"
              radius="10px"
            >
              <v-sheet
                class="px-4 py-4 rounded-t-lg"
              >
                <v-card-title class="font-weight-black">
                  タグの追加
                </v-card-title>

                <v-divider class="mx-2" />

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
                        disabled
                        light
                        to="/setting"
                      >
                        <v-list-item-icon>
                          <v-icon>mdi-plus</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>
                          <v-chip
                            disabled
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
            </swipemodal>
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

<script>
import swipemodal from '../component/Swipemodal.vue'

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
    sd_sheet: false,
    ed_sheet: false,
    sd: new Date().toISOString().substr(0, 10),
    ed: new Date().toISOString().substr(0, 10),
    type: null,
    activator: null,
    attach: null,
    colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
    editing: null,
    editingIndex: -1,
    tag_items: [
      {name: '簡単', color: 'MY_blue', description: '簡単なタスク'},
      {name: '優先度：高', color: 'MY_red', description: '至急完了させる必要がある'},
      {name: '優先度：中', color: 'MY_yellow_dark', description: 'やらなきゃいけないやつ'},
      {name: '優先度：低', color: 'MY_green_dark', description: '別に急ぐ必要はないはず'},
      {name: 'やろうと思えば...', color: '#AC77FF', description: 'そんな難しくない'},
      {name: '難しい', color: '#F077FF', description: 'これやるの大変'},
    ],
    tag_model: [],
    tag_search: null,
    sheet: false,
    tag_selected: [],
  }),

  components: {
    swipemodal
  },

  props: [
    'light'
  ],

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
    swipe() {
      this.dialog = false
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
      this.tag_selected = []
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

<style>
.card{
  background-image: url("../assets/card-back2.svg");
  background-position: top right;
}
.top_mark {
  width: 35px;
  height: 0.7vh;
  margin-left: calc(50% - 17.5px);
  background-color: rgb(200, 200, 200);
  border-radius: 10px;
}
</style>
