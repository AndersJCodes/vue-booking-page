
<!-- //src/pages/BookingPage.vue -->
<template>
  <div class="booking">
    <h1>Book Your Space Travel</h1>
    <form class="booking-form" @submit.prevent="submitBooking">
      <div class="form-group">
        <label for="destination">Destination:</label>
        <select id="destination" v-model="booking.destination" @change="updateQuery('destination', booking.destination)">
          <option v-for="dest in destinations" :key="dest" :value="dest">
            {{ dest }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Number of Guests:</label>
        <div class="guests">
          <div>
            <label>Adults</label>
            <div class="guest-control">
              <button type="button" @click="updateGuests('adults', -1)">-</button>
              <span>{{ booking.guests.adults }}</span>
              <button type="button" @click="updateGuests('adults', 1)">+</button>
            </div>
          </div>
          <div>
            <label>Children</label>
            <div class="guest-control">
              <button type="button" @click="updateGuests('children', -1)">-</button>
              <span>{{ booking.guests.children }}</span>
              <button type="button" @click="updateGuests('children', 1)">+</button>
            </div>
          </div>
          <div>
            <label>Seniors</label>
            <div class="guest-control">
              <button type="button" @click="updateGuests('seniors', -1)">-</button>
              <span>{{ booking.guests.seniors }}</span>
              <button type="button" @click="updateGuests('seniors', 1)">+</button>
            </div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="dates">Dates:</label>
        <input type="date" id="dates" v-model="booking.dates" @change="updateQuery('dates', booking.dates)" />
      </div>

      <div class="form-group">
        <label for="tripType">Trip Type:</label>
        <select id="tripType" v-model="booking.tripType" @change="updateQuery('tripType', booking.tripType)">
          <option value="one-way">One-way</option>
          <option value="round-trip">Round-trip</option>
        </select>
      </div>

      <button class="submit-btn" type="submit">Submit Booking</button>
    </form>

    <div class="cart">
      <h2>Your Booking Cart</h2>
      <ul>
        <li v-for="item in cartItems" :key="item.name">
          {{ item.name }} - {{ item.price }}
        </li>
      </ul>
      <p>Total: {{ total }}</p>
      <button class="clear-btn" @click="clearCart">Clear Cart</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useCartStore } from '@/stores/cartStore';

// Define the destinations
const destinations = ref(['Mars', 'Moon', 'Europa', 'Titan']);

// Define the booking object
const booking = ref({
  destination: '',
  guests: { adults: 0, children: 0, seniors: 0 },
  dates: '',
  tripType: 'one-way',
});

// Router hooks
const router = useRouter();
const route = useRoute();

// Access the cart store
const cartStore = useCartStore();

// Function to update the number of guests
const updateGuests = (type: 'adults' | 'children' | 'seniors', change: number) => {
  if (booking.value.guests[type] + change >= 0) {
    booking.value.guests[type] += change;
    updateQuery(type, booking.value.guests[type]);
  }
};

// Function to update query parameters
const updateQuery = (key: string, value: string | number) => {
  const updatedQuery = { ...route.query, [key]: value };
  router.push({ query: updatedQuery });
};

// Function to submit the booking

// Computed properties to access cart items and total
const cartItems = computed(() => cartStore.items);
const total = computed(() => cartStore.total);

// Function to clear the cart
const clearCart = () => {
  cartStore.items = [];
  cartStore.total = 0;
};

// Initialize booking data from URL query params
onMounted(() => {
  const query = route.query;
  if (query.destination) booking.value.destination = query.destination as string;
  if (query.adults) booking.value.guests.adults = parseInt(query.adults as string);
  if (query.children) booking.value.guests.children = parseInt(query.children as string);
  if (query.seniors) booking.value.guests.seniors = parseInt(query.seniors as string);
  if (query.dates) booking.value.dates = query.dates as string;
  if (query.tripType) booking.value.tripType = query.tripType as string;
});
const calculatePrice = () => {
  const adultPrice = 1000; // Pris per vuxen
  const childPrice = 500; // Pris per barn
  const seniorPrice = 800; // Pris per senior

  return (
    booking.value.guests.adults * adultPrice +
    booking.value.guests.children * childPrice +
    booking.value.guests.seniors * seniorPrice
  );
};

const submitBooking = () => {
  if (!booking.value.destination) {
    alert('Please select a destination!');
    return;
  }

  const totalPrice = calculatePrice();
  cartStore.addItem({
    name: `${booking.value.destination} Trip`,
    price: totalPrice,
  });
  console.log('Booking submitted:', booking.value, `Total price: ${totalPrice}`);
};

</script>

<style scoped>
/* Styles remain unchanged */
.booking {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.booking {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
}

.booking-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.guests {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

.guest-control {
  display: flex;
  align-items: center;
  gap: 10px;
}

.guest-control button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.guest-control button:hover {
  background-color: #2980b9;
}

.submit-btn {
  background-color: #2ecc71;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  text-transform: uppercase;
}

.submit-btn:hover {
  background-color: #27ae60;
}

.cart {
  margin-top: 30px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cart h2 {
  color: #2c3e50;
  margin-bottom: 15px;
}

.cart ul {
  list-style: none;
  padding: 0;
  margin: 0 0 15px 0;
}

.cart li {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.clear-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.clear-btn:hover {
  background-color: #c0392b;
}
</style>



