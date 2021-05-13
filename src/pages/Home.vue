<template>
  <v-container class="px-0 py-0">
    <v-row v-if="isauth && !check" justify="center" align="center" style="height: 100%;">
      <v-col cols="12" align="center">
        <h1>こんにちは&nbsp;{{ userdata.providerData[0].displayName }}&nbsp;さん</h1>
        <br />
      </v-col>
    </v-row>
    <v-row v-if="isauth" align="start" justify="space-between">
      <v-img
        src="../assets/earth.svg"
        class="earth"
      ></v-img>

      <v-col lg="4" md="4" sm="0" cols="0">
        <v-card
          color="transparent"
          flat
        >
          <v-card-title>
            <strong class="text-h5">情報</strong>
            <v-spacer />
            <v-tooltip bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  dark
                  color="grey lighten-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-help-circle-outline
                </v-icon>
              </template>
              <span>惑星の情報が記載されています</span>
              <ul>
                <li>名称｜あなたの惑星の名前</li>
                <li>誕生から｜誕生から何年経っているか。これは1日を1年としています。</li>
                <li>生命体の数｜タスクを1つこなすと1体増えます。</li>
              </ul>
            </v-tooltip>
          </v-card-title>

          <v-divider />

          <div class="px-0 py-4">
            <v-simple-table style="background-color: #FFFFFF20">
              <template v-slot:default>
                <tbody style="background-color: transparent">
                    <tr style="background-color: transparent">
                      <td class="mr-2">名称</td>
                      <td>{{planetdata.name}}</td>
                    </tr>
                    <tr style="background-color: transparent">
                      <td>誕生から</td>
                      <td>{{planetdata.elapsed}}年</td>
                    </tr>
                    <tr style="background-color: transparent">
                      <td>生命体の数</td>
                      <td>{{planetdata.creatures}}種</td>
                    </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>

        </v-card>
      </v-col>

      <v-col lg="3" md="3" sm="12" cols="12">
        <div id="task_list">
          <v-card flat color="transparent">
            <v-card-title class="py-2">
              <strong class="text-h5">今日までの目標</strong>
              <v-spacer />
              <v-tooltip bottom right>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    dark
                    color="grey lighten-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-help-circle-outline
                  </v-icon>
                </template>
                <span>今日が期限となっているタスクが表示されます。</span>
              </v-tooltip>
            </v-card-title>

            <v-divider class="mx-2" />

            <div style="max-height: 60vh; overflow:auto;">
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
    },
    isphone() {
      return this.$store.getters.isphone
    },
    planetdata() {
      return this.$store.getters.planetdata
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

</style>