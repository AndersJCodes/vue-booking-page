<template>
  <div class="hotel-list">
    <h2>Available Hotels</h2>
    <div v-if="filteredHotels.length">
      <HotelOption v-for="hotel in filteredHotels" :key="hotel.id" :hotel="hotel" />
    </div>
    <div v-else>
      <p>No hotels available for the selected destination.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Hotel } from '@/types'
import hotelsData from '@/db/hotels.json'
import HotelOption from './HotelOption.vue' // Optional: if you create this component

const props = defineProps<{
  destinationId: string
}>()

const hotels: Hotel[] = hotelsData

const filteredHotels = computed(() =>
  hotels.filter((hotel) => hotel.destinationId === props.destinationId),
)
</script>

<style scoped>
.hotel-list {
  margin-top: 2rem;
}

.hotel-list h2 {
  margin-bottom: 1rem;
}
</style>
