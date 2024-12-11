import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BlogView from '@/views/BlogView.vue'
import BlogPostView from '@/views/BlogPostView.vue'
import HotelsView from '@/views/HotelsView.vue'
import ExcursionsView from '@/views/ExcursionsView.vue'
import DestinationsView from '@/views/DestinationsView.vue'
import Mars from '@/components/Mars.vue'
import Venus from '@/components/Venus.vue'
import Sun from '@/components/Sun.vue'
import Offers from '@/views/Offers.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/blog', name: 'blog', component: BlogView },
  { path: '/blog/:id', name: 'blogPost', component: BlogPostView, props: true },
  { path: '/hotels', name: 'hotels', component: HotelsView },
  { path: '/offers', name: 'offers', component: Offers },
  {
    path: '/destinations',
    component: DestinationsView,
    children: [
      { path: 'mars', component: Mars },
      { path: 'venus', component: Venus },
      { path: 'sun', component: Sun },
    ],
  },
  { path: '/excursions', name: 'excursions', component: ExcursionsView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
