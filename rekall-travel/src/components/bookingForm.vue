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
import destinationsData from '../db/destionations.json'

const destinations: Destination[] = destinationsData
const router = useRouter()
const localBooking = reactive<Partial<BookingDetails>>({
  destination: '',
  travelers: 1,
  travelDate: '',
})

// Router instance

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
  flex-direction: row;
  gap: 1rem;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

select {
  /* width: 100%; */
  display: inline-block;
}

button {
  margin: 0 0.5rem;
}
</style>
