<template>
  <div class="excursions-page">
    <h1>Excursions for {{ planetName }}</h1>
    <TotalPrice />
    <div v-if="filteredExcursions.length > 0">
      <div v-for="excursion in filteredExcursions" :key="excursion.id" class="excursion-item">
        <h2>{{ excursion.name }}</h2>
        <p>{{ excursion.description }}</p>
        <p><strong>Duration:</strong> {{ excursion.duration }}</p>
        <p><strong>Price:</strong> {{ excursion.price }}</p>
        <button @click="addToCart(excursion)">Add to Cart</button>
      </div>
    </div>
    <div v-else>
      <p>No excursions available for the selected destination.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import excursionsData from '@/db/excursions.json';
import TotalPrice from '@/components/TotalPrice.vue';

const route = useRoute();
const router = useRouter(); // Added to fix the error
const cartStore = useCartStore();

const addToCart = (excursion: { id: string; name: string; price: number }) => {
  const cartDetails = {
    destination: route.query.destination || 'Unknown Destination',
    travelers: parseInt(route.query.travelers as string, 10) || 1,
    travelDate: route.query.startDate || 'No Date Selected',
    days: parseInt(route.query.days as string, 10) || 0,
    hotelName: route.query.hotelName || 'None selected',
    hotelPrice: parseFloat(route.query.hotelPrice as string) || 0,
    excursionName: excursion.name,
    excursionPrice: excursion.price,
  };

  router.push({
    name: 'cart',
    state: cartDetails, // Pass the data as state
  });
};


const destination = computed(() => route.query.destination as string || '');
const travelers = computed(() => parseInt(route.query.travelers as string, 10) || 1);

const planetName = computed(() => {
  const match = destination.value.match(/(mars|venus|sun|jupiter|saturn|neptune|uranus|mercury)/i);
  return match ? match[0].toLowerCase() : 'unknown';
});

const filteredExcursions = computed(() =>
  excursionsData.filter((exc) => planetName.value && exc.id.toLowerCase().includes(planetName.value)),
);
</script>


<style scoped>
.excursion-item {
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  background-color: #f9f9f9;
}
</style>
