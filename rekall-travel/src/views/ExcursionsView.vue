<template>
  <div class="excursions-page">
    <h1>Excursions for {{ planetName }}</h1>
    <TotalPrice />

    <div v-if="filteredExcursions.length > 0">
      <!-- Loop through excursions -->
      <div
        v-for="excursion in filteredExcursions"
        :key="excursion.id"
        class="excursion-item"
      >
        <h2>{{ excursion.name }}</h2>
        <p>{{ excursion.description }}</p>
        <p><strong>Duration:</strong> {{ excursion.duration }}</p>
        <p><strong>Price:</strong> {{ excursion.price }}</p>

        <!-- Add to Cart Button -->
        <button
          class="add-button"
          @click="addExcursion(excursion)"
        >
          Add to Cart
        </button>
      </div>
    </div>
    <div v-else>
      <p>No excursions available for the selected destination.</p>
    </div>

    <!-- Single Proceed to Cart Button -->
    <button class="proceed-button" @click="proceedToCart">
      Proceed to Cart
    </button>
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import excursionsData from '@/db/excursions.json';
import TotalPrice from '@/components/TotalPrice.vue';

const router = useRouter();
const route = useRoute();
const cartStore = useCartStore();

// Add an excursion to the current destination card
const addExcursion = (excursion: { id: string; name: string; price: number }) => {
  const cartDetails = {
    destination: route.query.destination as string || 'Unknown Destination',
    travelers: parseInt(route.query.travelers as string, 10) || 1,
    travelDate: route.query.startDate as string || 'No Date Selected',
    days: parseInt(route.query.days as string, 10) || 0,
    hotelName: route.query.hotelName as string || 'None selected',
    hotelPrice: parseFloat(route.query.hotelPrice as string) || 0,
    excursionName: excursion.name,
    excursionPrice: excursion.price,
  };

  cartStore.addExcursionToCard(cartDetails);
};

// Proceed to the cart page
const proceedToCart = () => {
  const cartDetails = {
    destination: route.query.destination as string || 'Unknown Destination',
    travelers: parseInt(route.query.travelers as string, 10) || 1,
    travelDate: route.query.startDate as string || 'No Date Selected',
    days: parseInt(route.query.days as string, 10) || 0,
    hotelName: route.query.hotelName as string || 'None selected',
    hotelPrice: parseFloat(route.query.hotelPrice as string) || 0,
  };

  // Ensure the card is created without excursions
  cartStore.addExcursionToCard({
    ...cartDetails,
    excursionName: undefined, // No excursions
    excursionPrice: undefined,
  });

  // Redirect to the Cart page
  router.push({ name: 'cart' });
};


// Planet name logic
const planetName = computed(() => {
  const match = (route.query.destination as string || '').match(
    /(mars|venus|sun|jupiter|saturn|neptune|uranus|mercury)/i
  );
  return match ? match[0].toLowerCase() : 'unknown';
});

// Filter excursions based on planet
const filteredExcursions = computed(() =>
  excursionsData.filter((exc) =>
    planetName.value && exc.id.toLowerCase().includes(planetName.value)
  )
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

button {
  padding: 8px 12px;
  margin: 8px 4px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
}

.add-button {
  background-color: #28a745;
}

.add-button:hover {
  background-color: #218838;
}

.proceed-button {
  display: block;
  width: 100%;
  background-color: #ffc107;
  margin: 20px auto;
  text-align: center;
  font-size: 1.2rem;
}

.proceed-button:hover {
  background-color: #e0a800;
}
</style>

