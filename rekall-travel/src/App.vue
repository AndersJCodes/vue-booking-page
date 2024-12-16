<template>
  <div id="app">
    <div class="navbar-section">
      <div class="content-wrapper">
        <Navbar />
      </div>
    </div>

    <main class="content-wrapper" :class="{ 'nav-spacing': !isHomePage }">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/NavbarMain.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isHomePage = computed(() => route.path === '/')
</script>

<style>
.navbar-section {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 14;
  background: transparent;
  margin: 0 auto;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  box-sizing: border-box; /* Add this */
}

.nav-spacing {
  padding-top: 80px;
}

.full-bleed {
  width: 100vw;
  margin-left: 50%;
  transform: translateX(-50%);
  box-sizing: border-box; /* Add this */
}
</style>
