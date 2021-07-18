<template>
  <v-container fluid class="px-0">
    <v-row v-if="isauth" align="start" justify="space-between">
      <div class="earth_group">
        <img
          src="../assets/earth.svg"
          class="earth"
        >
        <div
          v-for=" item in creatures_pos"
          :key="item.i"
        >
        <img
          src="../assets/kimo_pen.svg"
          class="pen"
          :style="`
            top: ${ item.y }%;
            left: ${ item.x }%;
            transform: translateX(${ -1 * item.x }%) translateY(${ -1 * item.y }%) rotate(${(item.num * 360) + 90}deg);
          `"
        >
        </div>
      </div>

      <v-col lg="4" md="4" sm="0" cols="0">
        <v-card
          flat
          class="rounded-lg"
          color="transparent"
        >
          <v-card-title class="py-2">
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
            <v-simple-table style="background-color: #FFFFFF20" class="rounded-lg">
              <template v-slot:default>
                <tbody style="background-color: transparent">
                    <tr style="background-color: transparent">
                      <td class="mr-2">名称</td>
                      <td>{{planetdata.name}}</td>
                    </tr>
                    <tr style="background-color: transparent">
                      <td>誕生から</td>
                      <td>{{age}} 日</td>
                    </tr>
                    <tr style="background-color: transparent">
                      <td>生命体の数</td>
                      <td>{{planetdata.creatures}} 体</td>
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
              <strong class="text-h5">目標一覧</strong>
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

            <div style="max-height: 70vh; overflow:auto;">
              <Card02 />

              <div v-for="(item, index) in task" :key="item.id">
                <card01
                  v-model="task[index]"
                  v-if="item.group == '目標'"
                  :type="item.group == '目標' ? 1 : 2"
                  class="item"
                ></card01>
              </div>
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
    },
    age() {
      var today, created
      today = this.StoD(new Date().toISOString().substr(0, 10))
      created = this.$store.getters.planetdata.created.seconds
      return Math.floor((today - created) / 86400)
    },
    creatures_pos() {
      var array = []
      for (let i = 0; i < this.$store.getters.planetdata.creatures; i++) {
        var num = Math.random().toPrecision(3)
        var deg = num * 360
        var red = (deg * Math.PI/180.0)
        var x = Math.cos(red) * 50 + 50 + 2.9 * Math.cos(red)
        var y = Math.sin(red) * 50 + 50 + 2.9 * Math.sin(red)

        array.push({
          i: i,
          num: num,
          x: x,
          y: y
        })
      }

      return array
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
    DtoS(time){//UNIX時間 => YYYY年MM月DD日
      var date = new Date(time * 1000)
      var date_s = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日"
      return date_s
    },
    StoD(date){//YYYY年MM月DD日 => UNIX時間
      date = Date.parse(date) * 0.001
      //console.log("StoD", date)
      return date
    },
  },
};
</script>

<style scoped>
  .page_container {
    position: relative;
    width: 100%;
    margin: 0% 0% 0% 0%;
  }

  .main_view {
    min-height: calc(95vh - 64px);
  }

  .earth_group {
    position: fixed;
    height: 90vmax;
    width: 90vmax;
    bottom: -55vmax;
    left: 50%;
    transform: translateX(-50%) rotate(0deg);
    animation-name: earth;
    animation-duration: 128s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  .pen {
    position: absolute;
    height: 3%;
  }

  .earth {
    position: absolute;
    height: 100%;
    width: 100%;
  }

  @keyframes earth {
    0% {
      transform: translateX(-50%) rotate(0deg);
    }
    100% {
      transform: translateX(-50%) rotate(360deg);
    }
  }

</style>