
<!-- //src/App.vue -->

    <script setup lang="ts">
    import Header from './components/HeaderItem.vue';
    import Footer from './components/FooterItem.vue';
    </script>

<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>


<style>
/* Global styles can go here */
</style>


