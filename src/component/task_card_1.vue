<template>
  <v-container>
    <v-hover
      v-slot:default="{ hover }"
      open-delay="0"
    >
    <v-card
      :class="`elevation-${hover ? 9 : 1}`"
      class="transition-swing rounded-br-xl"
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
      <v-card>
        <v-progress-linear
          :value="progress"
          height="30px"
          color="cyan accent-3"
        >
          <span>進行度:&nbsp;{{progress}}&#037;</span>
        </v-progress-linear>
        <v-card-title class="headline">
          {{title}}
          <span class="ml-2 body-2 red--text">未完了のタスク</span>
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
          <p class="my-0"><v-icon class="mr-2">mdi-clock-outline</v-icon>{{DtoS(date_start)}}&nbsp;から&nbsp;{{DtoS(date_end)}}&nbsp;まで</p><br>
          <p class="my-0"><v-icon class="mr-2">mdi-account-outline</v-icon>{{userdata.displayName}}</p>
        </v-card-text>

        <v-divider class="mx-2"/>

        <v-card-text class="py-4 black--text">
          {{text}}
        </v-card-text>

        <v-divider class="mx-2"/>

        <v-card-actions>
          <v-btn
            color="red"
            text
            @click="dialog = false"
          >
            閉じる
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
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