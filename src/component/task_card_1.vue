<template>
  <v-container>
    <v-card elevation="1" outlined>
      <v-card-title>{{title}}</v-card-title>
      <v-card-text>
        <span>{{DtoS(date_start)}}&nbsp;から&nbsp;{{DtoS(date_end)}}&nbsp;まで</span><br>
        {{text}}
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props:[
    'title',
    'text',
    'date_start',
    'date_end',
  ],

  methods: {
    DtoS(time){
      var date = new Date(time * 1000)
      var date_s = date.getFullYear() + "年" + date.getMonth() + "月" + date.getDate() + "日"
      return date_s
    }
  }
}
</script>