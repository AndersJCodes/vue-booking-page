import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BlogView from '@/views/BlogView.vue'
import BlogPostView from '@/views/BlogPostView.vue'
import HotelsView from '@/views/HotelsView.vue'
import ExcursionsView from '@/views/ExcursionsView.vue'
import DestinationsView from '@/views/DestinationsView.vue'
import Mars from '@/components/AboutMars.vue'
import Venus from '@/components/AboutVenus.vue'
import Sun from '@/components/AboutSun.vue'
import OffersView from '@/views/OffersView.vue'
const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/blog', name: 'blog', component: BlogView },
  { path: '/blog/:id', name: 'blogPost', component: BlogPostView, props: true },
  { path: '/hotels', name: 'hotels', component: HotelsView },
  { path: '/excursions', name: 'excursions', component: ExcursionsView },
  { path: '/offers', name: 'offers', component: OffersView },

  {
    path: '/destinations',
    component: DestinationsView,
    children: [
      { path: 'mars', component: Mars },
      { path: 'venus', component: Venus },
      { path: 'sun', component: Sun },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
