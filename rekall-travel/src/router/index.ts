import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      // Dynamic segments for booking details
      path: '/booking/options/:destination/:travelers/:travelDate',
      name: 'BookingOptions',
      component: () => import('../views/BookingOptions.vue'),
      props: true,
    },
    // Add more routes as needed
  ],
})

export default router
