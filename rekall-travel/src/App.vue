<template>
  <div id="app">
    <div class="navbar-section">
      <div class="content-wrapper">
        <Navbar />
      </div>
    </div>

    <main class="content-wrapper">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import Navbar from '@/components/NavbarMain.vue'

export default {
  components: {
    Navbar,
  },
}
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
}

.full-bleed {
  width: 100vw;
  margin-left: 50%;
  transform: translateX(-50%);
}
</style>
