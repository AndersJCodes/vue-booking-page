<template>
  <div class="hotels-page">
    <template v-if="isValidParams">
      <div class="hotels-header">
        <h1>Welcome to {{ destinationName }}</h1>
        <div class="booking-details">
          <p>Travel Date: {{ formattedStartDate }}</p>
          <p>Duration: {{ days }} days</p>
          <p>Travelers: {{ travelers }}</p>
        </div>
        <TotalPrice />
      </div>

      <div class="hotels-list-container">
        <HotelList
          :destinationId="destination"
          :destinationName="destinationName"
          :travelers="travelers"
          :startDate="startDate"
          :days="days"
        />
      </div>
    </template>

    <template v-else>
      <div class="error-message">
        <p>Invalid booking parameters. Please return to the booking page.</p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { Destination } from '@/types'
import destinationsData from '@/db/destinations.json'
import HotelList from '@/components/HotelList.vue'
import TotalPrice from '@/components/TotalPrice.vue'

const route = useRoute()

// Extract query parameters
const destination = computed(() => route.query.destination as string)
const travelers = computed(() => parseInt(route.query.travelers as string, 10) || 1)
const startDate = computed(() => route.query.startDate as string)
const days = computed(() => parseInt(route.query.days as string, 10) || 10)

// Validate presence of required parameters
const isValidParams = computed(() => {
  return destination.value && startDate.value && days.value
})

// Find destination name from destinations data
const destinationData: Destination[] = destinationsData
const destinationInfo = computed(() =>
  destinationData.find((dest) => dest.id === destination.value),
)
const destinationName = computed(() => destinationInfo.value?.name || 'Unknown Destination')

// Format the start date
const formattedStartDate = computed(() => {
  const date = new Date(startDate.value)
  return date.toLocaleDateString()
})
</script>

<style scoped>
.hotels-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.hotels-page h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.booking-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back-link {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.back-link:hover {
  background-color: #0056b3;
}
</style>
