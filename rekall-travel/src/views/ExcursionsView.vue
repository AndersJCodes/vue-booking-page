<template>
  <div class="excursions-page">
    <h1>Excursions for {{ planetName }}</h1>
    <TotalPrice />

    <div v-if="filteredExcursions.length > 0">
      <!-- Loop through excursions -->
      <div v-for="excursion in filteredExcursions" :key="excursion.id" class="excursion-item">
        <h2>{{ excursion.name }}</h2>
        <p>{{ excursion.description }}</p>
        <p><strong>Duration:</strong> {{ excursion.duration }}</p>
        <p><strong>Price:</strong> ${{ excursion.price }}</p>

        <!-- Toggle Add/Remove Button -->
        <button
          class="add-button"
          :class="{ selected: isExcursionInCard(excursion.name) }"
          @click="toggleExcursion(excursion)"
        >
          {{ isExcursionInCard(excursion.name) ? 'Remove from Cart' : 'Add to Cart' }}
        </button>
      </div>
    </div>
    <div v-else>
      <p>No excursions available for the selected destination.</p>
    </div>

    <!-- Proceed to Cart Button -->
    <button class="proceed-button" @click="proceedToCart">Proceed to Cart</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { usePriceStore } from '@/stores/prices'
import excursionsData from '@/db/excursions.json'
import TotalPrice from '@/components/TotalPrice.vue'

const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()
const priceStore = usePriceStore()

// Current destination details
const currentDestination = {
  destination: (route.query.destination as string) || 'Unknown Destination',
  travelers: parseInt(route.query.travelers as string, 10) || 1,
  adults: parseInt(route.query.adults as string, 10) || 0,
  children: parseInt(route.query.children as string, 10) || 0,
  seniors: parseInt(route.query.seniors as string, 10) || 0,
  travelDate: (route.query.startDate as string) || 'No Date Selected',
  days: parseInt(route.query.days as string, 10) || 0,
  hotelName: (route.query.hotelName as string) || 'None selected',
  hotelPrice: parseFloat(route.query.hotelPrice as string) || 0,
}

// Check if an excursion is in the card for the current destination
const isExcursionInCard = (excursionName: string) => {
  const card = cartStore.cartDetails.find(
    (item) => item.destination === currentDestination.destination,
  )
  return card?.excursions.some((exc) => exc.name === excursionName) || false
}

// Toggle excursion in the current card
const toggleExcursion = (excursion: { name: string; price: number }) => {
  const card = cartStore.cartDetails.find(
    (item) => item.destination === currentDestination.destination,
  )

  if (card) {
    const existingIndex = card.excursions.findIndex((exc) => exc.name === excursion.name)

    if (existingIndex > -1) {
      // Remove excursion if it exists
      card.excursions.splice(existingIndex, 1)
      // Update the pricestore to remove the excursion
      priceStore.removeExcursion(excursion.id)
    } else {
      // Add excursion if it doesn't exist
      card.excursions.push({
        name: excursion.name,
        price: excursion.price,
      })
      // Update the price store to add the excursion
      priceStore.addExcursion({ id: excursion.id, price: excursion.price })
    }
  } else {
    // Create a new card and add the excursion
    cartStore.addExcursionToCard({
      ...currentDestination,
      excursionName: excursion.name,
      excursionPrice: excursion.price,
    })
  }
}

// Proceed to Cart: Finalize the card and navigate
const proceedToCart = () => {
  cartStore.addExcursionToCard({
    ...currentDestination,
    excursionName: undefined,
    excursionPrice: undefined,
  })
  router.push({ name: 'cart' })
}

// Planet name logic
const planetName = computed(() => {
  const match = ((route.query.destination as string) || '').match(
    /(mars|venus|sun|jupiter|saturn|neptune|uranus|mercury)/i,
  )
  return match ? match[0].toLowerCase() : 'unknown'
})

// Filter excursions based on planet
const filteredExcursions = computed(() =>
  excursionsData.filter(
    (exc) => planetName.value && exc.id.toLowerCase().includes(planetName.value),
  ),
)
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

.add-button.selected {
  background-color: #dc3545;
}

.add-button.selected:hover {
  background-color: #c82333;
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
