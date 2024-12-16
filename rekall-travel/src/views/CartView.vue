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
      <p><strong>Price per Night:</strong> {{ formatPrice(cartStore.pricePerNight) }} kr</p>
    <p><strong>Total Price:</strong> {{ formatPrice(cartStore.totalPrice) }} kr</p>
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

const cartStore = useCartStore();
const formatPrice = (price: number) => price.toLocaleString('sv-SE');


// Beräkna kundkorgens detaljer
const cartItems = computed(() => {
  console.log('Cart Store Contents:', {
    destination: cartStore.destination,
    travelers: cartStore.travelers,
    travelDate: cartStore.travelDate,
    numberOfDays: cartStore.numberOfDays,
    selectedHotel: cartStore.selectedHotel,
    pricePerNight: cartStore.pricePerNight,
    totalPrice: cartStore.totalPrice,
  });

  return {
    destinationName: cartStore.destination,
    travelers: cartStore.travelers,
    travelDate: cartStore.travelDate,
    numberOfDays: cartStore.numberOfDays,
    selectedHotel: cartStore.selectedHotel as { name: string } | null,
    pricePerNight: cartStore.pricePerNight,
    totalPrice: cartStore.totalPrice,
  };
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
