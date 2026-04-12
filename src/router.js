import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'

const AboutPage = () => import('./pages/AboutPage.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/about', name: 'about', component: AboutPage }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return {
        el: to.hash,
        top: 84,
        behavior: 'smooth'
      }
    }
    return { top: 0, behavior: 'smooth' }
  }
})

export const preloadAboutPage = () => import('./pages/AboutPage.vue')

export default router
