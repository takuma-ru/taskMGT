<template>
  <v-container>
    <v-hover
      v-slot:default="{ hover }"
      open-delay="0"
    >
    <v-card
      :class="`elevation-${hover ? 9 : 1}`"
      class="transition-swing rounded-br-xl card"
      @click="dialog = true"
      outlined
    >
      <v-card-title>{{title}}<span class="ml-2 body-2 red--text">進行中のタスク</span></v-card-title>
      <v-card-text>
        <v-card elevation="0">
          <span><v-icon class="mr-2">mdi-clock-outline</v-icon>{{DtoS(date_start)}}&nbsp;から&nbsp;{{DtoS(date_end)}}&nbsp;まで</span><br>
        </v-card>
      </v-card-text>
    </v-card>
    </v-hover>

    <v-dialog
      v-model="dialog"
      max-width="600px"
    >
      <v-card class="card">
        <v-progress-linear
          :value="progress"
          height="35px"
          :color="color"
        >
          <span class="black--text">進行度:&nbsp;{{progress}}&#037;</span>
        </v-progress-linear>
        <v-card-title class="headline px-3">
          {{title}}
          <p class="ml-2 mb-0 body-2" style="color: #FF7786;">未完了のタスク</p>
          <v-spacer/>
          <v-btn
            icon
            @click="/**/"
          >
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider class="mx-2"/>

        <v-card-text class="py-4 black--text">
          <span><v-icon class="mb-1 mr-1">mdi-text</v-icon>詳細</span>
          <v-btn
            icon
            @click="/**/"
            class="mb-1 ml-3"
          >
            <v-icon>mdi-pencil-outline</v-icon>
          </v-btn>
          <br>
          {{text}}
        </v-card-text>

        <v-divider class="mx-2"/>

        <v-card-text class="py-4 black--text">
          <p class="my-0"><v-icon class="mr-2">mdi-clock-outline</v-icon>{{DtoS(date_start)}}&nbsp;から&nbsp;{{DtoS(date_end)}}&nbsp;まで</p><br>
          <p class="my-0">
            <v-icon class="mr-2">mdi-account-outline</v-icon>
            <v-chip color="white">
              <v-avatar size="24" class="mr-2">
                <v-img :src="userdata.photoURL"></v-img>
              </v-avatar>
              {{userdata.displayName}}
            </v-chip>
            <v-btn
              icon
              small
              class="ml-2"
              color="black"
              style="background-color: white;"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </p>
        </v-card-text>

        <v-divider class="mx-2"/>

        <v-card-text class="py-4 black--text">
          <span><v-icon class="mb-1 mr-1">mdi-file-tree</v-icon>サブタスク</span>
          <v-btn
            outlined
            small
            color="black"
            @click="/**/"
            class="mb-1 ml-3"
          >
            <v-icon>mdi-plus</v-icon>追加
          </v-btn>
          <br>
          <v-checkbox
            v-model="ex4"
            label="red"
            color="red"
            value="red"
            hide-details
          ></v-checkbox>
        </v-card-text>

        <v-divider class="mx-2"/>

        <v-card-actions>
          <v-btn
            elevation="1"
            color="#FF7786"
            text
            @click="dialog = false"
          >
            閉じる
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            elevation="1"
            color="primary"
            outlined
            @click="dialog = false"
          >
            完了！
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style>
.card{
  background-image: url("../assets/card-back.svg");
}
</style>

<script>
export default {
  data: () => ({
    dialog: false,
  }),

  props:[
    'title',
    'text',
    'date_start',
    'date_end',
    'progress'
  ],

  computed: {
    userdata(){
      return this.$store.getters.userdata
    },
    color(){
      var r = Math.round(255/(100/this.progress))
      var g = Math.round(255/(100/this.progress))
      var b = Math.round(255/(100/this.progress))
      console.log(r, g, b)

      r = r.toString(16)
      g = g.toString(16)
      b = b.toString(16)
      console.log(r, g, b)
      return '#' + r + g + 'ff'
    }
  },

  methods: {
    DtoS(time){
      var date = new Date(time * 1000)
      var date_s = date.getFullYear() + "年" + date.getMonth() + "月" + date.getDate() + "日"
      return date_s
    }
  }
}
</script>