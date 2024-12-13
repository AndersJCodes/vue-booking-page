<!-- src/views/BookingForm.vue -->
<<<<<<< HEAD
=======

>>>>>>> development
<!-- src/views/BookingForm.vue -->

<template>
  <div class="booking-form">
    <h1>Book Your Space Adventure</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-container">
        <!-- Choose Destination -->
        <div class="form-section">
          <label for="destination">Select Destination:</label>
          <select v-model="destination" id="destination" @change="updateQuery('destination', destination)" required>
            <option disabled value="">Choose destination</option>
            <option v-for="dest in destinations" :key="dest.id" :value="dest.id">
              {{ dest.name }}
            </option>
          </select>
        </div>

<<<<<<< HEAD
        <!-- Number of Travelers with Dropdown -->
        <div class="form-section traveler-dropdown" ref="dropdownContainer">
=======
        <!-- Number of Travelers -->
        <div class="form-section traveler-dropdown">
>>>>>>> development
          <label for="travelers">Travelers:</label>
          <button class="dropdown-toggle" @click.prevent="toggleDropdown">
            Add Travelers
            <span class="guest-summary">({{ totalGuests }})</span>
          </button>

          <!-- Dropdown Menu -->
          <div v-if="isDropdownOpen" class="dropdown-menu">
            <div class="guest-group">
<<<<<<< HEAD
              <!-- Adult Guests -->
              <div class="guest-item">
                <label>Vuxen <span>(18 - 64 år)</span></label>
                <div class="guest-controls">
                  <button @click="updateGuests('adults', -1)" :disabled="guests.adults <= 0">-</button>
                  <span>{{ guests.adults }}</span>
                  <button @click="updateGuests('adults', 1)">+</button>
                </div>
              </div>

              <!-- Senior Guests -->
              <div class="guest-item">
                <label>Senior <span>(Över 65 år)</span></label>
                <div class="guest-controls">
                  <button @click="updateGuests('seniors', -1)" :disabled="guests.seniors <= 0">-</button>
                  <span>{{ guests.seniors }}</span>
                  <button @click="updateGuests('seniors', 1)">+</button>
                </div>
              </div>

              <!-- Children Guests -->
              <div class="guest-item">
                <label>Barn/Ungdom <span>(0 - 17 år)</span></label>
=======
              <div class="guest-item" v-for="(label, type) in guestTypes" :key="type">
                <label>{{ label }}</label>
>>>>>>> development
                <div class="guest-controls">
                  <button
                    @click="updateGuests('children', -1)"
                    :disabled="isSolarFarewell || guests.children <= 0"
                  >-</button>
                  <span>{{ guests.children }}</span>
                  <button
                    @click="updateGuests('children', 1)"
                    :disabled="isSolarFarewell"
                  >+</button>
                </div>
              </div>
            </div>
<<<<<<< HEAD

            <!-- Done Button -->
            <button class="done-button" @click="toggleDropdown">Klar</button>
=======
            <button class="done-button" @click="toggleDropdown">Done</button>
>>>>>>> development
          </div>
        </div>

        <!-- Travel Date -->
        <div class="form-section">
          <label for="travel-date">Travel Date:</label>
          <input type="date" id="travel-date" v-model="travelDate" @change="updateQuery('travelDate', travelDate)" required />
        </div>

        <!-- Number of Days -->
        <div class="form-section">
          <label for="number-of-days">Number of Days:</label>
          <select v-model="selectedOption" id="number-of-days" @change="updateQuery('days', numberOfDays)" required>
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

        <!-- Trip Type -->
        <div class="form-section">
          <label for="trip-type">Trip Type:</label>
          <select
            v-model="tripType"
            id="trip-type"
            @change="updateQuery('tripType', tripType)"
            required
            :disabled="isSolarFarewell"
            :class="{ disabled: isSolarFarewell }"
          >
            <option value="one-way">One-way</option>
            <option value="round-trip">Round-trip</option>
          </select>
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
import { ref, watch, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import type { Destination } from '@/types';
import destinationsData from '@/db/destinations.json';

const destinations: Destination[] = destinationsData;
const router = useRouter();
const route = useRoute();

// Booking data
const destination = ref<string>('');
const travelDate = ref<string>('');
const tripType = ref<string>('one-way');
const guests = ref({ adults: 0, children: 0, seniors: 0 });
const selectedOption = ref<number | string>('');
const numberOfDays = ref<number>(10);
const daysOptions = [10, 20, 30];
const customDaysFlag = 'custom';
const customDaysValue = ref<number | null>(null);
const isDropdownOpen = ref(false);

// Check if the selected destination is "Solar Farewell Voyage"
const isSolarFarewell = computed(() => {
  const selectedDestination = destinations.find(dest => dest.id === destination.value);
  return selectedDestination?.name === 'Solar Farewell Voyage';
});

// Toggle dropdown visibility
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// Total guests summary
const totalGuests = computed(() => {
  return guests.value.adults + guests.value.children + guests.value.seniors;
});

const updateNumberOfDays = () => {
  if (customDaysValue.value && customDaysValue.value > 0) {
    numberOfDays.value = customDaysValue.value;
    updateQuery('days', customDaysValue.value);
  }
};

watch(selectedOption, (newValue) => {
  if (newValue !== customDaysFlag) {
    numberOfDays.value = Number(newValue);
    updateQuery('days', numberOfDays.value);
  } else {
    numberOfDays.value = customDaysValue.value || 0;
  }
});

const updateGuests = (type: 'adults' | 'children' | 'seniors', change: number) => {
  if (guests.value[type] + change >= 0) {
    guests.value[type] += change;
    updateQuery(type, guests.value[type]);
  }
};

const updateQuery = (key: string, value: string | number | null) => {
  const updatedQuery = { ...route.query, [key]: value };
  router.push({ query: updatedQuery });
};

onMounted(() => {
  const query = route.query;
  if (query.destination) destination.value = query.destination as string;
  if (query.adults) guests.value.adults = parseInt(query.adults as string);
  if (query.children) guests.value.children = parseInt(query.children as string);
  if (query.seniors) guests.value.seniors = parseInt(query.seniors as string);
  if (query.travelDate) travelDate.value = query.travelDate as string;
  if (query.tripType) tripType.value = query.tripType as string;
  if (query.days) {
    const days = parseInt(query.days as string);
    if (daysOptions.includes(days)) {
      selectedOption.value = days;
    } else {
      selectedOption.value = customDaysFlag;
      customDaysValue.value = days;
      numberOfDays.value = days;
    }
  }
});

const handleSubmit = () => {
  if (!destination.value || !travelDate.value || numberOfDays.value <= 0) {
    alert('Please fill in all required fields.');
  } else {
    router.push({
      name: 'hotels',
    });
  }
  console.log('Booking submitted:', {
    destination: destination.value,
    travelDate: travelDate.value,
    tripType: tripType.value,
    guests: guests.value,
    days: numberOfDays.value,
  });
};
</script>

<style scoped>
/* Styling for form layout, traveler dropdown, buttons, etc. */
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

/* Dropdown menu for traveler selection */
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

/* Done Button Styling */
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

/* Submit Button */
.submit-button {
  padding: 0.75rem rem;
  font-size: 1.5rem;
  font-weight: ;
  color: white;
  background-color: #2ecc71;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  text-transform: uppercase;
  margin-top: 1.7rem;
}

.submit-button:hover {
  background-color: #27ae60;
  transform: scale(1.05);
}
</style>
