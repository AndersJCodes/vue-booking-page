
<!-- //src/components/DestinationList.vue -->

   <script setup lang="ts">
    import { ref } from 'vue';

    const destinations = ref(['Mars', 'Moon', 'Europa', 'Titan']);
    </script>
<template>
  <div>
    <ul>
      <li v-for="destination in destinations" :key="destination">
        {{ destination }}
      </li>
    </ul>
  </div>
</template>



