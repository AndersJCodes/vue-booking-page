<!-- src/views/CartView.vue -->
<template>
  <div class="cart-page">
    <h1>Your Travel Cart</h1>
    <div v-if="cartItems">
      <p><strong>Destination:</strong> {{ cartItems.destinationName }}</p>
      <p><strong>Travelers:</strong> {{ cartItems.travelers }} guests</p>
      <p><strong>Travel Date:</strong> {{ cartItems.travelDate }}</p>
      <p><strong>Number of Days:</strong> {{ cartItems.numberOfDays }}</p>
      <p><strong>Selected Hotel:</strong> {{ cartItems.selectedHotel?.name || 'None selected' }}</p>
      <!-- Lägg till knappar för att gå vidare till betalning eller ändra kundkorg -->
      <button @click="goToPayment">Go to Payment</button>
    </div>
    <div v-else>
      <p>Your cart is empty. Please make a booking.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
import { computed } from 'vue';



const cartStore = useCartStore();

// Beräkna kundkorgens detaljer
const cartItems = computed(() => ({
  destinationName: cartStore.destination,
  travelers: cartStore.travelers,
  travelDate: cartStore.travelDate,
  numberOfDays: cartStore.numberOfDays,
  selectedHotel: cartStore.selectedHotel as { name: string } | null,
}));

const goToPayment = () => {
  // Navigera till betalningssidan (kan skapas som en annan vy)
  alert('Open Yor Bank ID');
  // router.push({ name: 'payment' })
};
</script>

<style scoped>
.cart-page {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.cart-page h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

button {
  padding: 1rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>
