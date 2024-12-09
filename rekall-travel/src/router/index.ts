import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BlogView from '@/views/BlogView.vue'
import BlogPostView from '@/views/BlogPostView.vue'
import HotelsView from '@/views/HotelsView.vue'
import AboutMars from '@/views/AboutMars.vue'
import AboutVenus from '@/views/AboutVenus.vue'
import AboutSun from '@/views/AboutSun.vue'
import ExcursionsView from '@/views/ExcursionsView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/blog', name: 'blog', component: BlogView },
  { path: '/blog/:id', name: 'blogPost', component: BlogPostView, props: true },
  { path: '/hotels', name: 'hotels', component: HotelsView },
  { path: '/about/mars', name: 'aboutMars', component: AboutMars },
  { path: '/about/venus', name: 'aboutVenus', component: AboutVenus },
  { path: '/about/sun', name: 'aboutSun', component: AboutSun },
  { path: '/excursions', name: 'excursions', component: ExcursionsView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
