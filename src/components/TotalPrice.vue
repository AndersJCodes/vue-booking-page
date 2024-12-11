<template>
  <div class="total-price">Totalt Pris: {{ totalPrice }} SEK</div>
</template>

<script setup lang="ts">
import { useBookingStore } from '@/stores/bookingStore';
import { computed } from 'vue';

const bookingStore = useBookingStore();
const totalPrice = computed(() => bookingStore.totalPrice);
</script>

<style scoped>
.total-price {
  font-size: 1.5rem;
  font-weight: bold;
  /* Lägg till ytterligare styling vid behov */
}
</style>
