<template>
  <div class="cart-page">
    <h1>Din Cart</h1>
    <div v-if="cartStore.cartDetails.length > 0">
      <div v-for="cart in cartStore.cartDetails" :key="cart.cartId" class="cart-item">
        <h2>Cart ID: {{ cart.cartId }}</h2>
        <p><strong>Destination:</strong> {{ cart.destination }}</p>
        <p><strong>Travelers:</strong> {{ cart.travelers }}</p>
        <p><strong>Travel Date:</strong> {{ cart.travelDate }}</p>
        <p><strong>Days:</strong> {{ cart.days }}</p>
        <p><strong>Hotel:</strong> {{ cart.hotelName }} - ${{ cart.hotelPrice }}</p>

        <h3>Excursions:</h3>
        <ul>
          <li v-for="exc in cart.excursions" :key="exc.id">{{ exc.name }} - ${{ exc.price }}</li>
        </ul>
      </div>
    </div>
    <div v-else>
      <p>Din cart är tom.</p>
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
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

// Komputera totala priset
const totalPrice = computed(() => {
  return cartStore.cartDetails.reduce((total, cart) => {
    const excursionsTotal = cart.excursions.reduce((sum, exc) => sum + exc.price, 0)
    return total + cart.hotelPrice + excursionsTotal
  }, 0)
})

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
</style>
