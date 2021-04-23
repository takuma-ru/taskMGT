import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue';
import Taskboard from '../pages/Taskboard.vue'
import Team from '../pages/Team.vue'
import About from '../pages/About.vue'
import Setting from '../pages/Setting.vue'

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
  {
    path: '/about',
    component: About,
    name: 'About',
  },
  {
    path: '/setting',
    component: Setting,
    name: 'Setting',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
