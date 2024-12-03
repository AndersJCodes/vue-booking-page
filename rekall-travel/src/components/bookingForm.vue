<!-- src/views/BookingForm.vue -->

<template>
  <div class="booking-form">
    <h1>Book Your Space Adventure</h1>
    <form @submit.prevent="handleSubmit">
      <div class="flex-row">
        <!-- Choose Destination -->
        <div class="flex-column">
          <label for="destination">Select Destination:</label>
          <select v-model="destination" id="destination" required>
            <option disabled value="">Choose destination</option>
            <option v-for="dest in destinations" :key="dest.id" :value="dest.id">
              {{ dest.name }}
            </option>
          </select>
        </div>

        <!-- Number of Travelers -->
        <div class="flex-column">
          <label for="travelers">Travelers:</label>
          <span class="travelers-controls">
            <button type="button" @click.prevent="decrement">-</button>
            <input
              type="number"
              id="travelers"
              v-model.number="travelers"
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
          <input type="date" id="travel-date" v-model="travelDate" required />
        </div>

        <!-- Number of Days -->
        <div class="flex-column">
          <label for="number-of-days">Number of Days:</label>
          <select v-model.number="numberOfDays" id="number-of-days" required>
            <option disabled value="">Select number of days</option>
            <option v-for="days in daysOptions" :key="days" :value="days">
              {{ days }}
            </option>
          </select>
        </div>

        <!-- Submit Button -->
        <button type="submit">View Options</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Destination } from '@/types'
import destinationsData from '@/db/destinations.json'

const destinations: Destination[] = destinationsData
const router = useRouter()

const destination = ref<string>('')
const travelers = ref<number>(1)
const travelDate = ref<string>('')
const numberOfDays = ref<number>(10) // Default to 10 days

const daysOptions = [10, 20, 30]

// Increment travelers
const increment = () => {
  if (travelers.value < 10) {
    travelers.value++
  }
}

// Decrement travelers
const decrement = () => {
  if (travelers.value > 1) {
    travelers.value--
  }
}

// Handle form submission
const handleSubmit = () => {
  if (destination.value && travelDate.value && numberOfDays.value) {
    // Navigate to the Hotels route with query params
    router.push({
      name: 'Hotels',
      query: {
        destination: destination.value,
        travelers: travelers.value.toString(),
        startDate: travelDate.value,
        days: numberOfDays.value.toString(),
      },
    })
  } else {
    alert('Please fill in all required fields.')
  }
}
</script>

<style scoped>
.booking-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.booking-form h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.flex-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.flex-column {
  display: flex;
  flex-direction: column;
  flex: 1;
}

label {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

select,
input[type='number'],
input[type='date'] {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.travelers-controls {
  display: flex;
  align-items: center;
}

.travelers-controls button {
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  font-size: 1rem;
  cursor: pointer;
}

button[type='submit'] {
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type='submit']:hover {
  background-color: #0056b3;
}
</style>
