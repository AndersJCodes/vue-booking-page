<template>
  <div class="hotel-option">
    <h3>{{ hotel.name }}</h3>
    <p>{{ hotel.description }}</p>
    <p><strong>Price per Night:</strong> ${{ hotel.pricePerNight }}</p>
    <p><strong>Rating:</strong> {{ hotel.rating }} / 5</p>
    <button @click="selectHotel">Select Hotel</button>
  </div>
</template>

<script setup lang="ts">
import type { Hotel } from '@/types'
import { useRouter } from 'vue-router'

const props = defineProps<{
  hotel: Hotel
}>()

const router = useRouter()

const selectHotel = () => {
  // Implement the logic to handle hotel selection
  // For example, navigate to a booking summary or confirmation page
  alert(`You have selected ${props.hotel.name}`)
}
</script>

<style scoped>
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
}
</style>
