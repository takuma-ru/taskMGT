<template>
<v-container>
  <v-row v-if="isauth && !check" justify="center" align="center">
    <v-col align="center">
      <!--<p>{{userdata}}</p>-->
      <!--<p>{{$store.getters.task}}</p>-->
    </v-col>
    <v-col cols="12" align="center">
      <v-row>
        <v-col v-for="(item, i) in namelist" :key="i" xs="12" sm="12" md="4" align="center">
            <v-card outlined>
              <v-card-title class="py-2">
                {{item}}
                <v-spacer />
                <card02 />
              </v-card-title>
              <draggable 
                :list="item"
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
    task(){
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