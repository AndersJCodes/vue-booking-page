<template>
  <div class="cart-page">
    <h1>Your Travel Cart</h1>

    <!-- Loop through each card in the cart -->
    <div v-for="(card, index) in cartItems" :key="index" class="cart-card">
      <h2>Destination: {{ card.destination }}</h2>
      <p><strong>Travelers:</strong> {{ card.travelers }} guests</p>
      <p><strong>Travel Date:</strong> {{ card.travelDate }}</p>
      <p><strong>Number of Days:</strong> {{ card.days }}</p>
      <p><strong>Hotel:</strong> {{ card.hotelName }}</p>
      <p><strong>Hotel Price Per Night:</strong> {{ card.hotelPrice }}</p>
      <p><strong>Total Hotel Cost:</strong> {{ totalHotelCost(card) }}</p>

      <h3>Selected Excursions:</h3>
      <ul>
        <li v-for="(excursion, i) in card.excursions" :key="i">
          {{ excursion.name }} - ${{ excursion.price }}
        </li>
      </ul>

      <p><strong>Total Excursion Cost:</strong> {{ totalExcursionCost(card.excursions) }}</p>
      <p><strong>Total Price:</strong> {{ totalPrice(card) }}</p>
    </div>

    <!-- Empty cart message -->
    <div v-if="cartItems.length === 0">
      <p>Your cart is empty. Please add a booking.</p>
    </div>
<button @click="goToPayment">Go to Payment</button>
    <!-- Modal -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span @click="closeModal" class="close">&times;</span>
        <h2>Open Your Bank ID</h2>
        <img src="@/assets/images/BankID.png" alt="Bank ID" class="bankid-image" />
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();

// Access cart details from Pinia store
const cartItems = computed(() => cartStore.cartDetails);

// Compute total hotel cost
const totalHotelCost = (card) => card.hotelPrice * card.days;

// Compute total excursion cost
const totalExcursionCost = (excursions) =>
  excursions.reduce((sum, excursion) => sum + excursion.price, 0);

// Compute the total price for a card
const totalPrice = (card) => totalHotelCost(card) + totalExcursionCost(card.excursions);

const showModal = ref(false);
const goToPayment = () => { showModal.value = true; };
const closeModal = () => { showModal.value = false; };
</script>

<style scoped>
.cart-page {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.cart-card {
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.cart-card h2 {
  margin-bottom: 0.5rem;
}
</style>
