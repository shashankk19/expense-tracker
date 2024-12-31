import ExpenseLayout from '@/views/ExpenseLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('../views/Login.vue') },
    {
      path: '/home',
      name: 'home',
      component: ExpenseLayout,
    },
  ],
})

export default router
