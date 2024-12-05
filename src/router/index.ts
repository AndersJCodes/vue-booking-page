//src/router/index.ts

import { createRouter, createWebHistory } from 'vue-router';


import Experience from '@/pages/ExperiencePage.vue';
import Packages from '@/pages/TravelPackage.vue';
import HomePage from '@/pages/HomePage.vue';
import BookingPage from '@/pages/BookingPage.vue';

const routes = [
  { path: '/',
     name: 'Home',
      component: HomePage
     },
  { path: '/booking',
      name: 'Booking',
     component: BookingPage
    },
  { path: '/experience/:id',
    name: 'Experience',
     component: Experience
     },
  { path: '/packages',
    name: 'Packages',
     component: Packages },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;


