<template>
  <div class="booking-wrapper">
    <form class="booking-form" @submit.prevent="handleSubmit">
      <!-- Destination -->
      <div class="search-section">
        <label class="section-label" for="destination">Where</label>
        <select v-model="destination" id="destination" required>
          <option disabled value="">Search destinations</option>
          <option v-for="dest in destinations" :key="dest.id" :value="dest.id">
            {{ dest.name }}
          </option>
        </select>
      </div>

      <!-- Travel Date -->
      <div class="search-section">
        <label class="section-label" for="travel-date">Check-in</label>
        <input type="date" id="travel-date" v-model="travelDate" placeholder="Add dates" required />
      </div>

      <!-- Number of Days -->
      <div class="search-section">
        <label class="section-label" for="number-of-days">Check-out</label>
        <div class="days-wrapper">
          <select v-model.number="selectedOption" id="number-of-days" required>
            <option disabled value="">Add dates</option>
            <option v-for="days in daysOptions" :key="days" :value="days">{{ days }} days</option>
            <option :value="customDaysFlag">Custom...</option>
          </select>
          <div v-if="selectedOption === customDaysFlag" class="custom-days-input">
            <input
              type="number"
              v-model.number="customDaysValue"
              min="1"
              required
              @input="updateNumberOfDays"
              placeholder="Enter days"
            />
          </div>
        </div>
      </div>

      <!-- Travelers -->
      <div class="search-section traveler-dropdown">
        <label class="section-label">Who</label>
        <button type="button" class="dropdown-toggle" @click="toggleDropdown">
          Add guests
          <span v-if="totalGuests > 0" class="guest-summary">({{ totalGuests }})</span>
        </button>

        <!-- Dropdown menu -->
        <div v-if="isDropdownOpen" class="dropdown-menu">
          <div class="guest-group">
            <div class="guest-item" v-for="(label, type) in guestTypes" :key="type">
              <label>{{ label }}</label>
              <div class="guest-controls">
                <button @click.prevent="updateGuests(type, -1)" :disabled="guests[type] <= 0">
                  -
                </button>
                <span>{{ guests[type] }}</span>
                <button @click.prevent="updateGuests(type, 1)">+</button>
              </div>
            </div>
          </div>
          <button type="button" class="done-button" @click="toggleDropdown">Done</button>
        </div>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="search-button">
        <svg
          width="18"
          height="18"
          fill="none"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="8" cy="8" r="7"></circle>
          <line x1="13" y1="13" x2="16" y2="16"></line>
        </svg>
      </button>
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

const guestTypes = {
  adults: 'Adults',
  seniors: 'Seniors',
  children: 'Children',
}

// Total guests
const totalGuests = computed(
  () => guests.value.adults + guests.value.children + guests.value.seniors,
)

const updateNumberOfDays = () => {
  if (customDaysValue.value && customDaysValue.value > 0) {
    numberOfDays.value = customDaysValue.value
  }
}

const updateGuests = (type: 'adults' | 'children' | 'seniors', change: number) => {
  if (guests.value[type] + change >= 0) {
    guests.value[type] += change
  }
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

// Handle form submission
const handleSubmit = () => {
  if (!destination.value || !travelDate.value || numberOfDays.value <= 0) {
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
:root {
  --bg-color: #fff;
  --text-color: #222;
  --border-color: #ddd;
  --divider-color: #eee;
  --hover-bg-color: #e9ecef;
  --primary-button-color: #2ecc71;
  --primary-button-hover: #27ae60;
}

.booking-wrapper {
  display: flex;
  justify-content: center;
  padding: 2rem;
  background: var(--bg-color, #fff);
}

.booking-form {
  display: grid;
  grid-template-columns: repeat(5, auto);
  align-items: center;
  background: var(--bg-color, #fff);
  border-radius: 24px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  /* overflow: hidden; */
  border: 1px solid var(--border-color, #ddd);
}

.search-section {
  display: flex;
  flex-direction: column;
  padding: 0.75rem 1rem;
  position: relative;
}

.search-section:not(:first-child) {
  border-left: 1px solid var(--divider-color, #eee);
}

.section-label {
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--text-color, #222);
}

.search-section select,
.search-section input[type='date'],
.search-section input[type='number'] {
  border: none;
  background: transparent;
  font-size: 1rem;
  color: #555;
  outline: none;
  padding: 0;
  width: 100%;
  cursor: pointer;
}

.search-section select:focus,
.search-section input[type='date']:focus,
.search-section input[type='number']:focus {
  outline: none;
}

.days-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.custom-days-input {
  margin-left: 0.5rem;
}

.custom-days-input input {
  width: 50px;
  border: 1px solid var(--border-color, #ccc);
  border-radius: 4px;
  padding: 0.25rem;
  font-size: 0.9rem;
}

/* Positioning for the traveler dropdown */
.traveler-dropdown {
  position: relative;
  cursor: pointer;
}

.dropdown-toggle {
  display: flex;
  align-items: center;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: #555;
  cursor: pointer;
  padding: 0;
}

.dropdown-toggle:focus {
  outline: none;
}

.guest-summary {
  margin-left: 0.5rem;
  font-size: 0.9rem;
  color: #666;
}

/* Dropdown menu */
.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 1rem;
  background: var(--bg-color, #fff);
  border: 1px solid var(--border-color, #ddd);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 1000;
  width: 200px;
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
  font-size: 0.9rem;
  font-weight: 500;
}

.guest-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.guest-controls button {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: gray;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
}

.guest-controls button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.done-button {
  display: block;
  margin: 1rem auto 0;
  padding: 0.5rem 1.5rem;
  font-size: 0.9rem;
  font-weight: bold;
  color: white;
  background-color: #28a745;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.done-button:hover {
  background-color: #218838;
}

/* Search button */
.search-button {
  background: var(--primary-button-color, #2ecc71);
  border: none;
  border-radius: 0 24px 24px 0;
  width: 60px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.search-button:hover {
  background: var(--primary-button-hover, #27ae60);
}

.search-button svg {
  display: inline-block;
}
</style>
