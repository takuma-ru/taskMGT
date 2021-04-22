<template>
  <v-container class="main_view">
    <v-row v-if="!isauth" class="mt-2" justify="center" align="center" style="color: white">
      <h1>ログインすることで利用できます</h1>
      <v-col cols="12" align="center">
        <v-btn depressed dark color="indigo" @click="signIn">
          <v-icon small class="mr-2">mdi-google</v-icon>googleアカウントでログイン
        </v-btn>
      </v-col>
      <v-col align="center">
        <p>
          <v-icon dark class="mb-1 mr-1">mdi-alert-circle-outline</v-icon
          >このアプリを利用する際の注意事項
        </p>
        <p class="gray--text">
          このサービスは現在<strong class="white--text">開発中</strong>です。
        </p>
        <p>
          ログインしてタスクの追加や削除は行えますが、予告なく保存されたタスクデータ、ユーザーデータを削除する場合がございます。
        </p>
      </v-col>
    </v-row>
    <v-row v-if="isauth && !check" justify="center" align="center" style="height: 100%;">
      <v-col cols="12" align="center">
        <h1>Hi!&nbsp;{{ userdata.providerData[0].displayName }}</h1>
        <br />
      </v-col>
      <!--<v-col align="center">
        <p>{{$store.getters.task}}</p>
        <p>{{userdata}}</p>
        <p>{{userdata.providerData[0].displayName}}</p>
      </v-col>-->
    </v-row>
    <v-row v-if="isauth" align="start" justify="space-between">

      <v-img
        src="../assets/earth.svg"
        class="earth"
      ></v-img>

      <v-col lg="3" md="3" sm="0" xs="0">
        <div>
          <v-card outlined flat color="transparent">
            <v-card-title class="py-2">
              <strong>こなしたタスクの合計</strong>
              <v-spacer />
            </v-card-title>

            <v-divider class="mx-2" />

            <div>{{progressdata.CompletedTask}}</div>

          </v-card>
        </div>
      </v-col>

      <v-col lg="3" md="3" sm="12" xs="12">
        <div id="task_list">
          <v-card outlined flat color="transparent">
            <v-card-title class="py-2">
              <strong>目標</strong>
              <v-spacer />
            </v-card-title>

            <v-divider class="mx-2" />

            <div style="height: 60vh; overflow:auto;">
              <div v-for="item in task" :key="item.id">
                <Card01
                  v-if="item.group == '目標'"
                  :data="item"
                  :type="item.group == '目標' ? 1 : 2"
                  class="item"
                ></Card01>
              </div>

              <Card02 />

            </div>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import draggable from "vuedraggable";
import Card01 from "../component/task_card_1";
import Card02 from "../component/task_card_2";

export default {
  data: () => ({
    data: {
      date_end: "",
      date_start: "",
      text: "",
      title: "",
      group: "",
      computed: "",
    },
    isload: false,
    num: 1,
  }),

  computed: {
    isauth() {
      return this.$store.getters.isauth;
    },
    userdata() {
      return this.$store.getters.userdata;
    },
    check() {
      return this.$store.getters.check;
    },
    task() {
      return this.$store.getters.task;
    },
    namelist() {
      return this.$store.getters.namelist;
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
      this.$store.dispatch("signIn");
    },
    dragEnd(data) {
      console.log("dragend :", data);
    },
  },
};
</script>

<style scoped>
  .main_view {
    min-height: calc(95vh - 64px);
  }

  .earth {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-name: earth;
    animation-duration: 8s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  }

  @keyframes earth {
    0% {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    25% {
      transform: translate(-50%, -45%);
    }
    75% {
      transform: translate(-50%, -55%);
    }
    100% {
      transform: translate(-50%, -50%);
    }
  }

  #task_list {
    height: 100%;
  }
</style>