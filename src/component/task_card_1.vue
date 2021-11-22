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
        class="transition-swing rounded-xl"
        @click="dialog = true"
      >
        <v-card-title class="py-2">
          <div class="py-1" style="width: 100%;">
            <v-chip
              v-for="item in data.tag"
              :key="item"
              dark
              :color="tag_items[item].color"
              class="mr-2"
              style="height: 1vh; width: 2vw"
            >
            </v-chip>
          </div>
          <span>{{data.title}}</span>
          <v-spacer/>
        </v-card-title>
        <v-card-actions class="pt-0">
            <span v-if="data.group == '完了'" class="px-2 font-weight-bold" style="color: #79DFA1">
              <v-icon class="pb-1" color="#79DFA1">
                mdi-check
              </v-icon>
              完了済み
            </span>
            <span
              v-else-if="data.date_end.seconds == today"
              class="px-2 font-weight-bold"
              style="color: #EF6786"
            >
              <v-icon class="mr-2 mb-1" color="My_error">mdi-clock-outline</v-icon>
              今日まで！！急げ
            </span>
            <span
              v-else
              class="px-2 subtitle--text"
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
      :persistent="editing"
      :fullscreen="isphone"
      :transition="isphone? `dialog-bottom-transition` : `dialog-transition`"
      max-width="800px"
    >
      <v-card
        v-if="!editing"
        light
        v-touch="{
          down: () => swipe()
        }"
        :class="`card${type} rounded-xl`"
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
          <div class="px-4">
            <v-chip
              v-for="item in data.tag"
              :key="item"
              class="mr-2 my-1"
              :color="tag_items[item].color"
              dark
            >
              {{ tag_items[item].name }}
            </v-chip>
          </div>
          <v-card-title class="headline px-4">
            <p class="mb-0">{{data.title}}</p>
            <span v-if="data.group == '完了'" class="ml-4 text-subtitle-2" style="color: #79DFA1">
              <v-icon>
                mdi-check
              </v-icon>
              完了済み
            </span>
            <v-spacer/>

            <v-btn
              rounded
              depressed
              color="#00000000"
              class="mr-0"
              @click="editing = true; Edit()"
            >
              <v-icon>mdi-pencil-outline</v-icon><span class="ml-1 mt-1 text-subtitle-2">編集</span>
            </v-btn>

            <v-btn
              rounded
              depressed
              color="#00000000"
              @click="dialog2 = true"
            >
              <v-icon>mdi-delete-outline</v-icon><span class="ml-1 mt-1 text-subtitle-2">削除</span>
            </v-btn>

            <v-dialog
              v-model="dialog2"
              persistent
              width="400"
            >
              <v-card>
                <v-img
                  :src="require('../assets/card-back2.svg')"
                  max-height="180px"
                  position="left: 0"
                  class="px-4 py-4 rounded-lg"
                  style="background-color: white"
                >
                  <v-card-text class="black--text">
                    <span class="marker_red_futo">このタスクを削除しますか？</span><br>
                    ※削除すると元に戻すことはできません
                  </v-card-text>

                  <v-divider light class="mx-2 mb-4" />

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
            <span class="subtitle--text"><v-icon class="mb-1 mr-1">mdi-text</v-icon>詳細</span>
            <br>
            <span v-html="data.text"></span>
          </v-card-text>

          <v-divider class="mx-2"/>

          <v-card-text class="py-4">
            <span class="subtitle--text"><v-icon class="mr-2">mdi-clock-outline</v-icon>期限</span>
              <br>
              {{DtoS(data.date_start.seconds)}}&nbsp;～&nbsp;{{DtoS(data.date_end.seconds)}}&nbsp;<br>
              <p v-if="data.group == '完了'" class="mt-4 mb-0 font-weight-bold" style="color: #79DFA1">{{DtoS(data.completed.seconds)}}に完了！</p>
          </v-card-text>

          <v-divider class="mt-2 mb-4"/>

          <v-card-actions>
            <v-btn
              v-if="!isphone"
              dark
              depressed
              color="MY_red"
              @click="dialog = false"
              class="rounded-xl"
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
              class="rounded-xl"
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
      <v-card
        v-else
        light
        :class="`card${type} rounded-lg`"
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
          <div class="px-4">
            <v-chip
              v-for="item in temporary_data.tag"
              :key="item"
              class="mr-2 my-1"
              :color="tag_items[item].color"
              dark
            >
              {{ tag_items[item].name }}
            </v-chip>
            <v-btn
              v-model="tag_sheet"
              @click="tag_sheet = true"
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
              v-model="tag_sheet"
              height="auto"
              width="800px"
              max-width="100vw"
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
                      v-model="temporary_data.tag"
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
                    @click="tag_sheet = false"
                  >
                    <v-icon class="mr-1">mdi-check</v-icon>OK
                  </v-btn>
                </v-card-actions>
              </v-sheet>
            </swipemodal>
          </div>
          <v-card-title class="px-2 pb-0">
            <v-text-field
              ref="title"
              v-model="temporary_data.title"
              label="タイトル"
              color="MY_blue"
              placeholder="例).タスク01"
              filled
              shaped
              :counter="30"
              class="py-0"
              :rules="[
                () => !!temporary_data.title || '入力してください',
                () => !!temporary_data.title && temporary_data.title.length <= 30 || '文字数制限(30文字)を超過しています',
              ]"
            ></v-text-field>
          </v-card-title>

          <v-divider class="mx-2"/>

          <v-card-text class="px-2 py-4 pb-0">
            <v-textarea
              ref="text"
              v-model="temporary_data.text"
              row-height="20"
              rows="4"
              color="MY_blue"
              placeholder="例).何かする"
              filled
              shaped
              :counter="150"
              label="詳細"
              :rules="[
                () => !!temporary_data.text || '入力してください',
                () => !!temporary_data.text && temporary_data.text.length <= 150 || '文字数制限(150文字)を超過しています',
              ]"
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
              filled
              shaped
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
              filled
              shaped
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

          <v-divider class="mt-2 mb-4"/>

          <v-card-actions>
            <v-btn
              v-if="!isphone"
              dark
              depressed
              color="MY_red"
              @click="Restore()"
            >
              <v-icon class="mr-1">mdi-chevron-left</v-icon>中止
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              dark
              depressed
              color="MY_blue"
              @click="EditingComplete()"
            >
              <v-icon class="mr-1">mdi-check</v-icon>変更を反映させる
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import swipemodal from 'nekoo_vue_swipemodal'
import 'nekoo_vue_swipemodal/dist/swipemodal.css'

export default {
  data: () => ({
    dialog: false,
    dialog2: false,
    editing: false,
    ex4: null,
    tag_items: [
      {name: '簡単', color: 'MY_blue', description: '簡単なタスク'},
      {name: '優先度：高', color: 'MY_red', description: '至急完了させる必要がある'},
      {name: '優先度：中', color: 'MY_yellow_dark', description: 'やらなきゃいけないやつ'},
      {name: '優先度：低', color: 'MY_green_dark', description: '別に急ぐ必要はないはず'},
      {name: 'やろうと思えば...', color: '#AC77FF', description: 'そんな難しくない'},
      {name: '難しい', color: '#F077FF', description: 'これやるの大変'},
    ],

    sd: null,
    sd_sheet: false,
    ed: null,
    ed_sheet: false,
    tag_sheet: false,
    tag_selected: []
  }),

  components: {
    swipemodal
  },

  model: {
    prop: 'data',
    event: 'change-data',
  },

  props:{
    data: {
      type: Object,
      default: null
    },
    type: {
      type: Number,
      default: null
    }
  },

  computed: {
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
    today(){
      return this.StoD(new Date().toISOString().substr(0, 10))
    },
    isphone() {
      return this.$store.getters.isphone
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
    Edit() {
      this.temporary_data.completed = new Date().toISOString().substr(0, 10)
      this.sd = this.DtoSE(this.data.date_start.seconds)
      this.ed = this.DtoSE(this.data.date_end.seconds)
    },
    Restore() {
      this.editing = false
    },
    Complete(){
      this.temporary_data.group = '完了'
      this.temporary_data.completed = new Date().toISOString().substr(0, 10)
      this.ChangeTask(1)
    },
    Incomplete(){
      this.temporary_data.group = '目標'
      this.temporary_data.completed = null
      this.ChangeTask(0)
    },
    EditingComplete() {
      this.ChangeTask(3)
    },
    DtoS(time){//UNIX時間 => YYYY年MM月DD日
      var date = new Date(time * 1000)
      var date_s = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日"
      return date_s
    },
    DtoSE(time) {
      var date = new Date(time * 1000)
      var date_s = date.getFullYear() + "-" + ('00' + (date.getMonth() + 1)).slice(-2) + "-" + ('00' + date.getDate()).slice(-2)
      return date_s
    },
    StoD(date){//YYYY年MM月DD日 => UNIX時間
      date = Date.parse(date) * 0.001
      //console.log("StoD", date)
      return date
    },
    ChangeTask(type){
      console.log(this.temporary_data)
      this.StoD(this.temporary_data.completed)
      if(type == 3){
        this.temporary_data.date_start = this.StoD(this.sd) * 1000
        this.temporary_data.date_end = this.StoD(this.ed) * 1000
      }

      if(this.temporary_data.date_start <= this.temporary_data.date_end){
        console.log("Changing data...")
        this.$store.dispatch('change_task', { data: this.temporary_data, type: type })
        if(type == 3){
          this.editing = false
        }else {
          this.dialog = false
        }
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
