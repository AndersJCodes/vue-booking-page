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
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import excursionsData from '@/db/excursions.json' // Import JSON data
import TotalPrice from '@/components/TotalPrice.vue'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const addToCart = (excursion: { id: string; name: string; price: number }) => {
  router.push({
    name: 'cart',
    query: {
      ...route.query,
      excursionId: excursion.id,
      excursionName: excursion.name,
      excursionPrice: excursion.price.toString(),
    },
  })
}

// Extract destination from query parameters
const destination = computed(() => route.query.destination as string)
const travelers = computed(() => parseInt(route.query.travelers as string, 10) || 1)

// Extract planet name from destination
const planetName = computed(() => {
  if (!destination.value) return ''
  const match = destination.value.match(/(mars|venus|sun|jupiter|saturn|neptune|uranus|mercury)/i)
  return match ? match[0].toLowerCase() : 'unknown'
})

// Filter excursions where the id contains the planet name
const excursions = excursionsData
const filteredExcursions = computed(() =>
  excursions.filter((exc) => planetName.value && exc.id.toLowerCase().includes(planetName.value)),
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
</style>
