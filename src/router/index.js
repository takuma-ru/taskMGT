import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue';
import Taskboard from '../pages/Taskboard.vue'
import Team from '../pages/Team.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',       
    component: Home,
    name: 'Home',
  },
  {
    path: '/taskboard',       
    component: Taskboard,
    name: 'Taskboard',
  },
  {
    path: '/team',       
    component: Team,
    name: 'Team',
  },
]

const router = new VueRouter({
  routes
})

export default router
