<template>
  <div class="cart-page">
    <h1>Your Travel Cart</h1>
    <!-- Loop through each card in the cart -->
    <div v-for="(card, index) in cartItems" :key="index" class="cart-card">
      <h2>Destination: {{ card.destinationName }}</h2>
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
      Totalprice component: <TotalPrice />
      <!-- Remove Button -->
      <button class="remove-button" @click="removeCard(index)">Remove</button>
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
import { useCartStore } from '@/stores/cart'
import TotalPrice from '@/components/TotalPrice.vue'
import destinationsData from '@/db/destinations.json'
import { computed, ref } from 'vue'

const cartStore = useCartStore()

const getDestinationName = (id: string): string => {
  const destination = destinationsData.find((item) => item.id === id)
  return destination ? destination.name : 'Unknown Destination'
}

// Access cart details from Pinia store
const cartItems = computed(() => {
  return cartStore.cartDetails.map((card) => ({
    ...card,
    destinationName: getDestinationName(card.destination), // Add name dynamically
  }))
})

// Compute total hotel cost
const totalHotelCost = (card) => card.hotelPrice * card.days

// Compute total excursion cost
const totalExcursionCost = (excursions) =>
  excursions.reduce((sum, excursion) => sum + excursion.price, 0)

// Compute the total price for a card
const totalPrice = (card) => totalHotelCost(card) + totalExcursionCost(card.excursions)

const removeCard = (index: number) => {
  cartStore.removeCard(index)
}

const showModal = ref(false)
const goToPayment = () => {
  showModal.value = true
}
const closeModal = () => {
  showModal.value = false
}
</script>

<style scoped>
.cart-page {
  padding: 20px;
}

.cart-item {
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.back-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.back-button:hover {
  background-color: #0056b3;
}

h2 {
  margin-bottom: 8px;
}

h3 {
  margin-top: 16px;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  margin-bottom: 4px;
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
  width: 100%; /* Gör bilden responsiv */
  max-width: 400px;
  margin-top: 1rem;
}

.remove-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
}

.remove-button:hover {
  background-color: #c82333;
}
</style>
