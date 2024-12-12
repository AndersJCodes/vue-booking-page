<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script lang="ts">
import Navbar from '@/components/NavbarMain.vue';

export default {
  components: {
    Navbar,
  },
};
</script>

<style scoped>
/* You can keep any global styles here */
</style>
