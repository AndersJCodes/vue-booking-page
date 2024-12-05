
<!-- src/components/DropDown -->
<script setup lang="ts">
import { ref } from 'vue';

const options = ['Mars', 'Moon', 'Europa'];
const selected = ref(options[0]);

const update = () => {
  console.log(`Selected: ${selected.value}`);
};
</script>

<template>
  <select v-model="selected" @change="update">
    <option v-for="option in options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>


