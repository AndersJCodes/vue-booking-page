<template>
  <div class="cart-page">
    <h1>Your Travel Cart</h1>
    <div v-if="cartItems">
      <p v-if="cartItems.destination"><strong>Destination:</strong> {{ cartItems.destination }}</p>
      <p v-if="cartItems.travelers"><strong>Travelers:</strong> {{ cartItems.travelers }} guests</p>
      <p v-if="cartItems.travelDate"><strong>Travel Date:</strong> {{ cartItems.travelDate }}</p>
      <p v-if="cartItems.days"><strong>Number of Days:</strong> {{ cartItems.days }}</p>
      <p v-if="cartItems.hotelName"><strong>Selected Hotel:</strong> {{ cartItems.hotelName }}</p>
      <p v-if="cartItems.hotelPrice">
        <strong>Hotel Price Per Night:</strong> {{ cartItems.hotelPrice }}
      </p>
      <p v-if="totalHotelCost > 0"><strong>Total Hotel Cost:</strong> {{ totalHotelCost }}</p>

      <h3>Selected Excursion:</h3>
      <p v-if="cartItems.excursionName">
        <strong>Excursion:</strong> {{ cartItems.excursionName }}
      </p>
      <p v-if="cartItems.excursionPrice">
        <strong>Excursion Price:</strong> {{ cartItems.excursionPrice }}
      </p>

      <p v-if="totalPrice > 0"><strong>Total Price:</strong> {{ totalPrice }}</p>

      <button @click="goToPayment">Go to Payment</button>
    </div>
    <div v-else>
      <p>Your cart is empty. Please make a booking.</p>
    </div>

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

const cartStore = useCartStore()

// Retrieve data passed via router state
if (history.state?.destination) {
  cartStore.setCartDetails(history.state) // Populate Pinia with the passed data
}

const cartItems = computed(() => cartStore.cartDetails)
const totalHotelCost = computed(() => cartItems.value.hotelPrice * cartItems.value.days || 0)
const totalPrice = computed(
  () => totalHotelCost.value + cartItems.value.excursionPrice * cartItems.value.travelers || 0,
)

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

/* Modal styles */
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
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
  width: 100%;
  max-width: 400px;
  margin-top: 1rem;
}
</style>
