<template>
  <div class="booking-options">
    <h1>Booking Options</h1>
    <div v-if="destinationData">
      <p><strong>Destination:</strong> {{ destinationData.name }}</p>
      <p><strong>Number of Travelers:</strong> {{ travelers }}</p>
      <p><strong>Travel Date:</strong> {{ formattedTravelDate }}</p>
      <p><strong>Description:</strong> {{ destinationData.description }}</p>
      <!-- Add more detailed information and options here -->
      <button @click="proceedToNextStep">Proceed</button>
    </div>
    <div v-else>
      <p>Invalid booking details or booking not found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Destination } from '@/types'

// Initialize route and router
const route = useRoute()
const router = useRouter()

// Mock destinations, replace with API call or store in a real app
const allDestinations: Destination[] = [
  {
    id: 'mars_colony',
    name: 'Mars Colony',
    description: 'Experience life on the Red Planet at the first human colony.',
    pricePerPerson: 1000000,
    duration: '6 months',
    departureFrom: ['Earth Orbit Station', 'Moon Base Alpha'],
  },
  {
    id: 'venus_cloud_city',
    name: 'Venus Cloud City',
    description: "Float above Venus' surface in luxury cloud cities.",
    pricePerPerson: 1200000,
    duration: '1 year',
    departureFrom: ['Earth Orbit Station', 'Moon Base Alpha'],
  },
  {
    id: 'solar_farewell',
    name: 'Solar Farewell Voyage',
    description: 'A one-way journey to the Sun for a spectacular final act.',
    pricePerPerson: 500000,
    duration: 'Final',
    departureFrom: ['Earth Orbit Station'],
  },
]

// Extract route params
const destinationParam = computed(() => route.params.destination as string)
const travelersParam = computed(() => parseInt(route.params.travelers as string, 10))
const travelDateParam = computed(() => route.params.travelDate as string)

// Compute the selected destination data
const destinationData = computed(() =>
  allDestinations.find((dest) => dest.id === destinationParam.value),
)

// Format the travel date for display
const formattedTravelDate = computed(() => {
  const date = new Date(travelDateParam.value)
  return date.toLocaleDateString()
})

// Proceed to the next step (e.g., selecting classes, extras, etc.)
const proceedToNextStep = () => {
  // Implement navigation to the next step
  // For example: router.push({ name: 'BookingSummary' });
  alert('Proceeding to the next step...')
}
</script>

<style scoped>
.booking-options {
  max-width: 600px;
  margin: 0 auto;
}

button {
  margin-top: 1rem;
}
</style>
