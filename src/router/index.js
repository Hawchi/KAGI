import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import SwitchesView from '../views/SwitchesView.vue'
import PartsView from '../views/PartsView.vue'
import GuideView from '../views/GuideView.vue'

const routes = [
  { path: '/',          component: HomeView },
  { path: '/switches',  component: SwitchesView },
  { path: '/parts',     component: PartsView },
  { path: '/guide',     component: GuideView },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})