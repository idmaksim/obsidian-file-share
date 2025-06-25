import { createRouter, createWebHistory } from 'vue-router'
import Files from '@/views/Files.vue'
import Links from '@/views/Links.vue'

const routes = [
  {
    path: '/',
    name: 'Files',
    component: Files
  },
  {
    path: '/links',
    name: 'Links',
    component: Links
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes, 
})

export default router
