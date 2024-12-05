<!-- //src/components/CartPage.vue -->

    <script setup lang="ts">
    import { ref, computed } from 'vue';

    const cartItems = ref([
      { name: 'Mars Trip', price: 3000 },
      { name: 'Moon Stay', price: 2000 },
    ]);

    const total = computed(() => {
      return cartItems.value.reduce((sum, item) => sum + item.price, 0);
    });
    </script>

<template>
  <div>
    <h2>Cart</h2>
    <ul>
      <li v-for="item in cartItems" :key="item.name">
        {{ item.name }} - {{ item.price }}
      </li>
    </ul>
    <p>Total: {{ total }}</p>
  </div>
</template>



