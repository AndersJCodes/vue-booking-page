<!-- src/components/HotelList.vue -->
<template>
  <div class="hotel-component">
    <h2>Available Hotels</h2>
    <div class="hotel-list" v-if="filteredHotels.length">
      <div v-for="hotel in filteredHotels" :key="hotel.id" class="hotel-option">
        <img :src="hotel.image" :alt="hotel.name" />
        <h3>{{ hotel.name }}</h3>
        <p>{{ hotel.description }}</p>
        <div class="price-details">
          <p><strong>Price per Night:</strong> {{ formatPrice(hotel.pricePerNight) }} kr</p>
          <p class="total-hotel-price">
            <strong>Total Hotel Cost:</strong>
            {{ formatPrice(calculateTotalForHotel(hotel)) }} kr
            <span class="price-breakdown">
              ({{ props.travelers }} travelers x {{ props.days }} days)
            </span>
          </p>
        </div>
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
import type { Destination, Hotel, BookingQuery } from '@/types'
import destinationsData from '@/db/destinations.json'
import hotelsData from '@/db/hotels.json'
import { useRouter } from 'vue-router'

const router = useRouter()
// Define the props expected
const props = defineProps<BookingQuery>()

// Filter hotels based on destinationId
const filteredHotels = computed(() =>
  hotelsData.filter((hotel) => hotel.destinationId === props.destinationId),
)

// Find destination name
const destinationData: Destination[] = destinationsData
const destinationInfo = computed(() =>
  destinationData.find((dest) => dest.id === props.destinationId),
)

// Format price to Swedish locale
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('sv-SE', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

const calculateTotalForHotel = (hotel: Hotel) => {
  return hotel.pricePerNight * props.travelers * props.days
}

// Handle hotel selection
const selectHotel = (hotel: Hotel) => {
  const totalCost = calculateTotalForHotel(hotel)
  bookingStore.setTotalPrice(totalCost)

  router.push({
    name: 'excursions', // Name of the route to navigate to
    query: {
      hotelId: hotel.id,
      hotelName: hotel.name,
      hotelPrice: hotel.pricePerNight.toString(), // Pass hotel price
      destination: props.destinationName,
      travelers: props.travelers.toString(),
      adults: props.adults?.toString(),
      children: props.children?.toString(),
      seniors: props.seniors?.toString(),
      startDate: props.startDate,
      days: props.days.toString(),
    },
  })
}
</script>

<style scoped>
.hotel-component {
  margin-top: 2rem;
}

.hotel-component h2 {
  margin-bottom: 1rem;
}

.hotel-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.hotel-option img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
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
  color: white;
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
