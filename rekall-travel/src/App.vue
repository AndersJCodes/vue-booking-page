<template>
  <div id="app">
    <div class="full-bleed navbar-section">
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
/* Remove 'scoped' to make these styles global */
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

/* Optional: Style for sections that need full-width backgrounds */
.navbar-section {
  background-color: #333;
}
</style>
