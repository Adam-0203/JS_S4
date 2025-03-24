import { createRouter, createWebHistory } from 'vue-router'
import Details from '../views/Details.vue'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path : '/Home',
      component: Home
    },
    {
      path : '/Details/:id',
      component: Details
    },
  ],
})

export default router
