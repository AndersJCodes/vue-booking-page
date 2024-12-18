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
    <button class="back-button" @click="goBack">Tillbaka till Excursions</button>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

// Funktion för att gå tillbaka till excursions sidan
const goBack = () => {
  router.push({ name: 'excursions' })
}

// Komputera totala priset
const totalPrice = computed(() => {
  return cartStore.cartDetails.reduce((total, cart) => {
    const excursionsTotal = cart.excursions.reduce((sum, exc) => sum + exc.price, 0)
    return total + cart.hotelPrice + excursionsTotal
  }, 0)
})
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
</style>
