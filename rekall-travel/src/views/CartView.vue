<!-- src/views/CartView.vue -->
<template>
  <div class="cart-page">
    <h1>Your Travel Cart</h1>
    <div v-if="cartItems">
      <p><strong>Destination:</strong> {{ cartItems.destination }}</p>
      <p><strong>Travelers:</strong> {{ cartItems.travelers }} guests</p>
      <p><strong>Travel Date:</strong> {{ cartItems.travelDate }}</p>
      <p><strong>Number of Days:</strong> {{ cartItems.days }}</p>
      <p><strong>Selected Hotel:</strong> {{ cartItems.hotelName}}</p>
      <p><strong>Hotel Price Per Night:</strong> {{ cartItems.hotelPrice }}</p>
      <p><strong>Total Hotel Cost:</strong> {{ (cartItems.hotelPrice * cartItems.days) }}</p>

      <h3>Selected Excursion:</h3>
      <p><strong>Excursion:</strong> {{ cartItems.excursionName || 'None selected' }}</p>
      <p><strong>Excursion Price:</strong> {{ cartItems.excursionPrice }}</p>

      <p><strong>Total Price:</strong> {{ totalPrice }}</p>


      <!-- Lägg till knappar för att gå vidare till betalning -->
      <button @click="goToPayment">Go to Payment</button>
    </div>
    <div v-else>
      <p>Your cart is empty. Please make a booking.</p>
    </div>

    <!-- Modal för att visa Bank ID -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span @click="closeModal" class="close">&times;</span>
        <h2>Open Your Bank ID</h2>
        <!-- Här använder vi den uppdaterade sökvägen för BankID-bilden -->
        <img src="@/assets/images/BankID.png" alt="Bank ID" class="bankid-image" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const cartStore = useCartStore();

// Beräkna kundkorgens detaljer
const cartItems = computed(() => ({
  destination: route.query.destination || 'Unknown Destination',
  travelers: parseInt(route.query.travelers as string, 10) || 1, // Default to 1 traveler
  travelDate: route.query.startDate || 'No Date Selected',
  days: parseInt(route.query.days as string, 10) || 0,
  hotelId: route.query.hotelId || null,
  hotelName: route.query.hotelName || 'None selected',
  hotelPrice: parseFloat(route.query.hotelPrice as string) || 0,
  excursionName: route.query.excursionName || 'None selected',
  excursionPrice: parseFloat(route.query.excursionPrice as string) || 0,
}));

// Update total price calculation to use valid traveler count
const totalPrice = computed(() => {
  const hotelCost = cartItems.value.hotelPrice * cartItems.value.days; // Hotel cost for the stay
  const excursionCost = cartItems.value.excursionPrice * cartItems.value.travelers; // Excursion cost
  return hotelCost + excursionCost; // Total price
});



// State för att visa/ dölja modal
const showModal = ref(false);

// Funktion för att öppna modal
const goToPayment = () => {
  showModal.value = true;
};

// Funktion för att stänga modal
const closeModal = () => {
  showModal.value = false;
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

/* Stil för modal */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Mörk bakgrund */
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  max-width: 500px;
  width: 80%;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 2rem;
  cursor: pointer;
}

.bankid-image {
  width: 100%;  /* Gör bilden responsiv */
  max-width: 400px;
  margin-top: 1rem;
}
</style>
