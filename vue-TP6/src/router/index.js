import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import addPost from '../views/addPost.vue'
import editPost from '../views/editPost.vue'
import DetailPost from '../views/DetailPost.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },

    {
      path: '/addPost',
      name: 'add',
      component: addPost,
    },

    {
      path: '/editPost/:id',
      name: 'edit',
      component: editPost,
    },
    {
      path: '/Details/:id',
      component: DetailPost,
    },
  ],
})

export default router
