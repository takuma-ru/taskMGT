<template>
  <v-container class="main_view">
    <v-row v-if="isauth && !check" justify="center" align="center" style="height: 100%">
      <v-col cols="12" align="center">
        <h1>Hi!&nbsp;{{userdata.providerData[0].displayName}}</h1><br>
      </v-col>
        <p>{{$store.getters.task}}</p>
      <!--<v-col align="center">
        <p>{{userdata}}</p>
        <p>{{userdata.providerData[0].displayName}}</p>
      </v-col>-->
    </v-row>
    <v-row align="end" justify="end">
      <v-col cols="3">
        <div id="task_list">
          <div v-for="(item, i) in namelist" :key="i" class="" style="width: 100%">
            <v-card outlined flat color="transparent">
              <v-card-title class="py-2">
                <strong>{{item}}</strong>
                <v-spacer />
                <card02 />
              </v-card-title>

              <v-divider class="mx-2"/>

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
        </div>
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

  .main_view {
    min-height: calc(95vh - 64px);
  }

  #task_list {
    height: 100%;
  }
</style>

<script>
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