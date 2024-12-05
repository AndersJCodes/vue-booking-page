<!-- //src/components/SearchBar.vue -->

    <script setup lang="ts">
    import { ref } from 'vue';

    const query = ref('');
    const search = () => {
      console.log(`Searching for: ${query.value}`);
    };
    </script>

<template>
  <div>
    <input v-model="query" placeholder="Search destinations..." />
    <button @click="search">Search</button>
  </div>
</template>



