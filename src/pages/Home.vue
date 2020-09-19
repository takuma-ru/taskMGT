<template>
  <v-container>
    <v-col>
      <v-row v-if="check" justify="center" align="center">
        <h1>読み込み中...</h1>
      </v-row>
      <v-row v-if="isauth && !check" justify="center" align="center">
        <v-col cols="12" align="center">
          <h1>ようこそ「{{userdata.displayName}}」さん</h1><br>
        </v-col>
        <!--<v-col align="center">
          <p>{{userdata}}</p>
          <p>{{$store.getters.task}}</p>
        </v-col>-->
          <div style="display: flex; overflow: auto; width: 100%;">
            <div v-for="(item, i) in namelist" :key="i" class="px-3 py-3" style="width: 350px">
                <v-card outlined>
                  <v-card-title class="py-2">
                    {{item}}
                    <v-spacer />
                    <card02 />
                  </v-card-title>
                  <draggable 
                    :list="task"
                    :options="options"
                  >
                    <div v-for="item_2 in task" :key="item_2">
                      <card01
                        v-if="item_2.group == item"
                        :key="item_2.id"
                        :data="item_2"
                        :progress="50"
                        :type="1"
                        class="item"
                      ></card01>
                    </div>
                </draggable>
              </v-card>
            </div>
            <div class="px-3 py-3" style="width: 350px">
              <v-card
                color=""
                outlined
              >
                <v-card-title class="py-2">
                  <v-container>
                    <v-col class="px-0 py-0" align="center">
                      <v-icon large>mdi-plus</v-icon>
                    </v-col>
                  </v-container>
                </v-card-title>
              </v-card>
            </div>
          </div>
      </v-row>
    </v-col>
  </v-container>
</template>

<style scoped>
  .item {
    display: inline-block;
  }
  .item:hover {
    cursor: grab;
  }
  .item:active {
    cursor: grabbing;
  }
</style>

<script>
import firebase from 'firebase'
import draggable from 'vuedraggable'
import card01 from '../component/task_card_1'
import card02 from '../component/task_card_2'

export default {
  data: () => ({
    data: {
      end: '',
      start: '',
      text: '',
      title: '',
      group: '',
    },
    isload: false,
    num: 1,
    options: {
      group:'ITEMS',
      animation: 200
    },
  }),

  computed: {
    isauth(){
      return this.$store.getters.isauth
    },
    userdata(){
      return this.$store.getters.userdata
    },
    check(){
      return this.$store.getters.check
    },
    task() {
      return this.$store.getters.task
    },
    namelist(){
      return this.$store.getters.namelist
    }
  },

  components: {
    card01,
    card02,
    draggable,
  },

  methods: {
    signIn() {
      this.$store.dispatch('signIn')
    },
    dragEnd(data){
      console.log("dragend :", data)
    }
  },
}
</script>