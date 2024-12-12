import { createRouter, createWebHistory } from 'vue-router';
import HotelsView from '@/views/HotelsView.vue';

const routes = [
  {
    path: '/hotels/:option1/:option2',
    name: 'Hotels',
    component: HotelsView,
  },
  // ... andra rutter ...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
