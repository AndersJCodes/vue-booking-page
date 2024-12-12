<!-- src/views/BookingForm.vue -->

<template>
  <div class="booking-form">
    <h1>Book Your Space Adventure</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-container">
        <!-- Choose Destination -->
        <div class="form-section">
          <label for="destination">Select Destination:</label>
          <select v-model="destination" id="destination" required>
            <option disabled value="">Choose destination</option>
            <option v-for="dest in destinations" :key="dest.id" :value="dest.id">
              {{ dest.name }}
            </option>
          </select>
        </div>

        <!-- Number of Travelers -->
        <div class="form-section traveler-dropdown">
          <label for="travelers">Travelers:</label>
          <button type="button" class="dropdown-toggle" @click.prevent="toggleDropdown">
            Add Travelers
            <span class="guest-summary">({{ totalGuests }})</span>
          </button>
          <div v-if="isDropdownOpen" class="dropdown-menu">
            <div class="guest-group">
              <div class="guest-item" v-for="(label, type) in guestTypes" :key="type">
                <label>{{ label }}</label>
                <div class="guest-controls">
                  <button
                    type="button"
                    @click="updateGuests(type, -1)"
                    :disabled="guests[type] <= 0"
                  >
                    -
                  </button>
                  <span>{{ guests[type] }}</span>
                  <button type="button" @click="updateGuests(type, 1)">+</button>
                </div>
              </div>
            </div>
            <button type="button" class="done-button" @click="toggleDropdown">Done</button>
          </div>
        </div>

        <!-- Travel Date -->
        <div class="form-section">
          <label for="travel-date">Travel Date:</label>
          <input type="date" id="travel-date" v-model="travelDate" required />
        </div>

        <!-- Number of Days -->
        <div class="form-section">
          <label for="number-of-days">Number of Days:</label>
          <select v-model="selectedOption" id="number-of-days" required>
            <option disabled value="">Select number of days</option>
            <option v-for="days in daysOptions" :key="days" :value="days">
              {{ days }}
            </option>
            <option :value="customDaysFlag">Custom...</option>
          </select>
          <div v-if="selectedOption === customDaysFlag">
            <label for="custom-days-input">Enter Custom Number of Days:</label>
            <input
              type="number"
              id="custom-days-input"
              v-model.number="customDaysValue"
              min="1"
              required
              @input="updateNumberOfDays"
            />
          </div>
        </div>

        <!-- Submit Button -->
        <div class="form-section">
          <button type="submit" class="submit-button">Submit Booking</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Destination } from '@/types'
import destinationsData from '@/db/destinations.json'

const destinations: Destination[] = destinationsData
const router = useRouter()

// Booking data
const destination = ref<string>('')
const travelDate = ref<string>('')
const guests = ref({ adults: 0, children: 0, seniors: 0 })
const selectedOption = ref<number | string>('')
const numberOfDays = ref<number>(10)
const daysOptions = [10, 20, 30]
const customDaysFlag = 'custom'
const customDaysValue = ref<number | null>(null)
const isDropdownOpen = ref(false)

// Total guests
const totalGuests = computed(
  () => guests.value.adults + guests.value.children + guests.value.seniors,
)

const guestTypes = {
  adults: 'Adults',
  seniors: 'Seniors',
  children: 'Children',
}

// Update number of days
const updateNumberOfDays = () => {
  if (customDaysValue.value && customDaysValue.value > 0) {
    numberOfDays.value = customDaysValue.value
  }
}

// Update guests count
const updateGuests = (type: 'adults' | 'children' | 'seniors', change: number) => {
  if (guests.value[type] + change >= 0) {
    guests.value[type] += change
  }
}

// Toggle dropdown visibility
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

// Handle form submission
const handleSubmit = () => {
  if (
    !destination.value ||
    !travelDate.value ||
    numberOfDays.value <= 0 ||
    totalGuests.value === 0
  ) {
    alert('Please fill in all required fields.')
    return
  }

  router.push({
    name: 'hotels',
    query: {
      destination: destination.value,
      travelers: totalGuests.value,
      startDate: travelDate.value,
      days: numberOfDays.value,
    },
  })
}
</script>

<style scoped>
.form-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.traveler-dropdown {
  position: relative;
}

.dropdown-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1 rem;
  font-size: 1rem;

  color: #333;
  background-color: transparent;
  border: 1px solid black;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dropdown-toggle:hover {
  background-color: #e9ecef;
}

.guest-summary {
  margin-left: 1rem;
  font-weight: normal;
  color: #888;
}

.dropdown-menu {
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 1rem;
}

.guest-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.guest-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.guest-item label {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
}

.guest-item span {
  font-size: 0.875rem;
  color: #777;
}

.guest-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.guest-controls button {
  width: 32px;
  height: 32px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
}

.guest-controls button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.guest-controls button:hover:not(:disabled) {
  background-color: #0056b3;
}

.done-button {
  display: block;
  margin: 1rem auto 0;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #28a745;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.done-button:hover {
  background-color: #218838;
}

/************************** Submit Button **************************/
.submit-button {
  padding: 0.75rem 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  background-color: #2ecc71;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;
  text-transform: uppercase;
}

.submit-button:hover {
  background-color: #27ae60;
  transform: scale(1.05);
}
</style>
