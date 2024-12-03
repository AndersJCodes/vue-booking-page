<template>
  <div class="booking-options">
    <h1>Booking Options</h1>
    <div v-if="destinationData && travelDateParam.value">
      <p><strong>Destination:</strong> {{ destinationData.name }}</p>
      <p><strong>Number of Travelers:</strong> {{ travelers }}</p>
      <p><strong>Travel Date:</strong> {{ formattedTravelDate }}</p>
      <p><strong>Description:</strong> {{ destinationData.description }}</p>

      <!-- Hotel List Component -->
      <HotelList :destinationId="destinationData.id" />

      <!-- Proceed Button -->
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
import hotelsData from '@/db/hotels.json'
import HotelList from '@/components/HotelList.vue' // Ensure correct path

const route = useRoute()
const router = useRouter()

// Import destinations from JSON file
import destinationsData from '@/db/destinations.json'
import type { Hotel } from '@/types'

const destinations: Destination[] = destinationsData

const destinationParam = computed(() => route.params.destination as string)
const travelersParam = computed(() => {
  const num = parseInt(route.params.travelers as string, 10)
  return isNaN(num) ? 1 : num
})
const travelDateParam = computed(() => route.params.travelDate as string)

const destinationData = computed(() =>
  destinations.find((dest) => dest.id === destinationParam.value),
)

const formattedTravelDate = computed(() => {
  if (!travelDateParam.value) return ''
  const date = new Date(travelDateParam.value)
  return date.toLocaleDateString()
})

const travelers = travelersParam.value

const proceedToNextStep = () => {
  // Implement navigation to the next step, such as booking summary or confirmation
  alert('Proceeding to the next step...')
}
</script>

<style scoped>
.booking-options {
  max-width: 800px;
  margin: 0 auto;
}

.booking-options h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style>
