<!-- src/components/HotelList.vue -->

<template>
  <div class="hotel-list">
    <h2>Available Hotels in {{ destinationName }}</h2>
    <div v-if="filteredHotels.length">
      <div v-for="hotel in filteredHotels" :key="hotel.id" class="hotel-option">
        <h3>{{ hotel.name }}</h3>
        <p>{{ hotel.description }}</p>
        <p><strong>Price per Night:</strong> ${{ hotel.pricePerNight }}</p>
        <p><strong>Rating:</strong> {{ hotel.rating }} / 5</p>
        <button @click="selectHotel(hotel)">Select Hotel</button>
      </div>
    </div>
    <div v-else>
      <p>No hotels available for the selected destination and dates.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Destination, Hotel } from '@/types'
import destinationsData from '@/db/destinations.json'
import hotelsData from '@/db/hotels.json'

// Define the props expected
const props = defineProps<{
  destinationId: string
  travelers: number
  startDate: string
  days: number
}>()



// Filter hotels based on destinationId
const filteredHotels = computed(
  () => hotelsData.filter((hotel) => hotel.destinationId === props.destinationId),
  // You can add more filtering logic based on travelers, dates, etc.
)

// Find destination name
const destinationData: Destination[] = destinationsData
const destinationInfo = computed(() =>
  destinationData.find((dest) => dest.id === props.destinationId),
)
const destinationName = computed(() => destinationInfo.value?.name || 'Unknown Destination')

// Handle hotel selection
const selectHotel = (hotel: Hotel) => {
  // Navigate to a booking confirmation or details page with selected hotel info
  // For simplicity, we'll alert the selection. Replace this with actual navigation as needed.
  alert(`You have selected ${hotel.name}`)

  // Example navigation (uncomment and implement as needed):
  /*
  router.push({
    name: 'BookingConfirmation',
    query: {
      hotelId: hotel.id,
      destination: props.destinationId,
      travelers: props.travelers.toString(),
      startDate: props.startDate,
      days: props.days.toString(),
    },
  })
  */
}
</script>

<style scoped>
.hotel-list {
  margin-top: 2rem;
}

.hotel-list h2 {
  margin-bottom: 1rem;
}

.hotel-option {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 5px;
}

.hotel-option h3 {
  margin-bottom: 0.5rem;
}

.hotel-option button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  background-color: #28a745;
  color: rgb(15, 14, 14);
  border: none;
  border-radius: 4px;
}

.hotel-option button:hover {
  background-color: #218838;
}

p {
  font-size: 1rem;
}
</style>
