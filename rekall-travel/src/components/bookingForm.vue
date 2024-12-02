<template>
  <div class="booking-form">
    <h1>Book Your Space Adventure</h1>
    <form @submit.prevent="handleSubmit">
      <div class="flex-row">
        <!-- Choose Destination -->
        <div class="flex-column">
          <label for="destination">Select Destination:</label>
          <select v-model="localBooking.destination" id="destination" required>
            <option disabled value="">Choose destination</option>
            <option v-for="dest in destinations" :key="dest.id" :value="dest.id">
              {{ dest.name }}
            </option>
          </select>
        </div>

        <!-- Number of Travelers -->
        <div class="flex-column">
          <label for="travelers">Travelers:</label>
          <span>
            <button type="button" @click.prevent="decrement">-</button>
            <input
              type="number"
              id="travelers"
              v-model.number="localBooking.travelers"
              min="1"
              max="10"
              required
            />
            <button type="button" @click.prevent="increment">+</button>
          </span>
        </div>

        <!-- Travel Date -->
        <div class="flex-column">
          <label for="travel-date">Travel Date:</label>
          <input type="date" id="travel-date" v-model="localBooking.travelDate" required />
        </div>

        <!-- Submit Button -->
        <button type="submit">View Options</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import type { BookingDetails, Destination } from '@/types'

// Local booking state
const localBooking = reactive<Partial<BookingDetails>>({
  destination: '',
  travelers: 1,
  travelDate: '',
})

// Mock destinations, replace with API call or store in a real app
const destinations: Destination[] = [
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

// Router instance
const router = useRouter()

// Increment travelers
const increment = () => {
  if (localBooking.travelers && localBooking.travelers < 10) {
    localBooking.travelers++
  }
}

// Decrement travelers
const decrement = () => {
  if (localBooking.travelers && localBooking.travelers > 1) {
    localBooking.travelers--
  }
}

// Handle form submission
const handleSubmit = () => {
  if (localBooking.destination && localBooking.travelDate) {
    // Ensure all fields are present
    const bookingDetails: BookingDetails = {
      destination: localBooking.destination,
      travelers: localBooking.travelers ?? 1,
      travelDate: localBooking.travelDate,
    }

    // Navigate to the BookingOptions route with route params
    router.push({
      name: 'BookingOptions',
      params: {
        destination: bookingDetails.destination,
        travelers: bookingDetails.travelers.toString(), // Route params are strings
        travelDate: bookingDetails.travelDate,
      },
    })
  } else {
    // Handle validation errors if necessary
    alert('Please fill in all required fields.')
  }
}
</script>

<style scoped>
.flex-row {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

select {
  width: 100%;
  display: inline-block;
}

button {
  margin: 0 0.5rem;
}
</style>
