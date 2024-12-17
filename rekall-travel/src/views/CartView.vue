<template>
  <div class="cart-page">
    <h1>Your Travel Cart</h1>

    <!-- Check if cartItems has any data -->
    <div v-if="cartItems.length">
      <!-- Loop through cartItems -->
      <div v-for="(item, index) in cartItems" :key="index" class="cart-card">
        <h2>Booking {{ index + 1 }}</h2>
        <p><strong>Destination:</strong> {{ item.destination }}</p>
        <p><strong>Travelers:</strong> {{ item.travelers }} guests</p>
        <p><strong>Travel Date:</strong> {{ item.travelDate }}</p>
        <p><strong>Number of Days:</strong> {{ item.days }}</p>
        <p><strong>Selected Hotel:</strong> {{ item.hotelName }}</p>
        <p><strong>Hotel Price Per Night:</strong> {{ item.hotelPrice }}</p>
        <p><strong>Total Hotel Cost:</strong> {{ totalHotelCost(item) }}</p>

        <h3>Selected Excursion:</h3>
        <p><strong>Excursion:</strong> {{ item.excursionName || 'None selected' }}</p>
        <p><strong>Excursion Price:</strong> {{ item.excursionPrice }}</p>

        <p><strong>Total Price:</strong> {{ totalPrice(item) }}</p>
      </div>
    </div>
    <div v-else>
      <p>Your cart is empty. Please make a booking.</p>
    </div>

    <!-- Button and Modal -->
    <button @click="goToPayment">Go to Payment</button>

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
import { useCartStore } from '@/stores/cart';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const cartStore = useCartStore();

// Ensure cartStore holds an array of items
if (history.state?.destination) {
  cartStore.addCartItem(history.state); // Add passed data to the cart array
}

// Get cart items as an array
const cartItems = computed(() => cartStore.cartDetails);

// Compute total hotel cost for each item
const totalHotelCost = (item) => item.hotelPrice * item.days || 0;

// Compute total price for each card
const totalPrice = (item) =>
  totalHotelCost(item) + (item.excursionPrice || 0) * item.travelers;

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
