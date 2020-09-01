<template>
<v-container>
  <v-row v-if="isauth && !check" justify="center" align="center">
    <v-col align="center">
      <p>{{userdata}}</p>
      <p>{{$store.getters.task}}</p>
    </v-col>
    <v-col cols="12" align="center">
      <v-row>
        <v-col xs="12" sm="12" md="4" align="center">
            <v-card outlined>
              <v-card-title class="py-2">
                未進行のタスク
                <v-spacer />
                <card02 />
              </v-card-title>
              <draggable 
                :list="task"
                :options="options"
              >
                <card01
                  v-for="item in task"
                  :key="item.id"
                  :data="item"
                  :progress="50"
                  :type="1"
                  class="item"
                ></card01>
              </draggable>
            </v-card>
        </v-col>
        <v-col lg="4" md="4" sm="12" cols="12" align="center">
            <v-card outlined>
              <v-card-title class="py-2">
                進行中のタスク
                <v-spacer />
                <card02 />
              </v-card-title>
              <draggable
                :list="inProgress"
                :options="options"
                @end="dragEnd"
              >
                <card01
                  v-for="item in inProgress"
                  :key="item.id"
                  :data="item"
                  :progress="50"
                  :type="2"
                  class="item"
                ></card01>
              </draggable>
            </v-card>
        </v-col>
        <v-col xs="12" sm="12" md="4" align="center">
            <v-card outlined>
              <v-card-title class="py-2">
                完了済みのタスク
                <v-spacer />
                <card02 />
              </v-card-title>
              <draggable
                :list="complete"  
                :options="options"
                @end="dragEnd"
              >
                <card01
                  v-for="item in complete"
                  :key="item.id"
                  :data="item"
                  :progress="50"
                  :type="3"
                  class="item"
                ></card01>
              </draggable>
            </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
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
    complete(){
      return this.$store.getters.complete
    },
    inProgress() {
      return this.$store.getters.inProgress
    },
    task() {
      return this.$store.getters.task
    },
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