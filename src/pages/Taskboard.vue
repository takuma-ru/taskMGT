<template>
<v-container v-if="isauth && !check" class="px-0 py-0">
  <h1 class="pb-5">タスクボード</h1>
  <v-row justify="center">
    <v-col cols="12">
      <v-row>
        <v-col
          cols="12"
          lg="2"
          md="2"
          sm="12"
          align="start"
        >
          <div>
            <v-card outlined flat color="transparent">
              <v-card-title class="py-2">
                <strong>こなしたタスクの合計</strong>
                <v-spacer />
              </v-card-title>

              <v-divider class="mx-2" />

              <div class="px-3 py-3">{{progressdata.CompletedTask}}</div>

            </v-card>
          </div>
        </v-col>
        <v-col
          v-for="item in namelist"
          :key="item"
          cols="12"
          lg="4"
          md="4"
          sm="12"
        >
          <v-card
            dark
            outlined
            color="transparent"
          >
            <v-card-title class="py-2">
              <strong>{{item}}</strong>
            </v-card-title>

            <v-divider class="mx-2" />

            <div v-for="item_2 in task" :key="item_2.id">
              <Card01
                v-if="item_2.group == item"
                :data="item_2"
                :type="item_2.group == '目標' ? 1 : 2"
                class="item"
              ></Card01>
            </div>

            <Card02 v-if="item == '目標'" />

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
import Card01 from '../component/task_card_1'
import Card02 from '../component/task_card_2'

export default {
  data: () => ({
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
    },
    progressdata() {
      return this.$store.getters.progressdata;
    }
  },

  components: {
    Card01,
    Card02,
  },

  methods: {
    signIn() {
      this.$store.dispatch('signIn')
    },
  },
}
</script>