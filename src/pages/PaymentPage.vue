

<!-- PaymentPage.vue -->
<script setup lang="ts">
import { computed } from 'vue';
import { useCartStore } from '@/stores/cartStore';

const cartStore = useCartStore();

const cartItems = computed(() => cartStore.items);
const total = computed(() => cartStore.total);

const completeBooking = () => {
  alert('Booking confirmed!');
  cartStore.items = [];
  cartStore.total = 0;
};
</script>

<template>
  <div class="payment">
    <h1>Complete Your Booking</h1>
    <section class="cart-summary">
      <h2>Your Cart</h2>
      <ul>
        <li v-for="item in cartItems" :key="item.name">
          {{ item.name }} - {{ item.price }} SEK
        </li>
      </ul>
      <p>Total: {{ total }} SEK</p>
    </section>
    <button @click="completeBooking">Confirm and Pay</button>
  </div>
</template>

<style scoped>
.payment {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}
.cart-summary ul {
  list-style: none;
  padding: 0;
}
.cart-summary li {
  margin: 10px 0;
}
</style>



