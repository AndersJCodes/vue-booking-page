<template>
  <div class="hotels-page">
    <h1>Available Hotels</h1>
    <div v-if="isValidParams">
      <p><strong>Destination:</strong> {{ destinationName }}</p>
      <p><strong>Travelers:</strong> {{ travelers }}</p>
      <p><strong>Start Date:</strong> {{ formattedStartDate }}</p>
      <p><strong>Number of Days:</strong> {{ days }}</p>
      <div>
        <TotalPrice />
      </div>

      <!-- Hotel List Component -->
      <HotelList
        :destinationId="destination"
        :travelers="travelers"
        :startDate="startDate"
        :days="days"
      />
    </div>
    <div v-else>
      <p>
        Invalid or missing search parameters. Please use the form on the homepage to search for
        hotels.
      </p>
      <router-link to="/">Go Back to Homepage</router-link>
    </div>
<<<<<<< HEAD:rekall-travel/src/views/Hotels.vue

   <!--  <section class="blog-section">
      <h2>Latest Blog Posts</h2>
      <BlogList />
    </section> -->
=======
>>>>>>> development:rekall-travel/src/views/HotelsView.vue
  </div>
</template>

<script setup lang="ts">
<<<<<<< HEAD:rekall-travel/src/views/Hotels.vue
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Destination } from '@/types';
import destinationsData from '@/db/destinations.json';
import HotelList from '@/components/HotelList.vue';
/* import BlogList from '@/components/BlogList.vue'; */
=======
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { Destination } from '@/types'
import destinationsData from '@/db/destinations.json'
import HotelList from '@/components/HotelList.vue'
import TotalPrice from '@/components/TotalPrice.vue'
>>>>>>> development:rekall-travel/src/views/HotelsView.vue

const route = useRoute()

// Extract query parameters
const destination = computed(() => route.query.destination as string)
const travelers = computed(() => parseInt(route.query.travelers as string, 10) || 1)
const startDate = computed(() => route.query.startDate as string)
const days = computed(() => parseInt(route.query.days as string, 10) || 10)

// Validate presence of required parameters
const isValidParams = computed(() => {
  return destination.value && startDate.value && days.value
})

// Find destination name from destinations data
const destinationData: Destination[] = destinationsData
const destinationInfo = computed(() =>
  destinationData.find((dest) => dest.id === destination.value),
)
const destinationName = computed(() => destinationInfo.value?.name || 'Unknown Destination')

// Format the start date
const formattedStartDate = computed(() => {
  const date = new Date(startDate.value)
  return date.toLocaleDateString()
})
</script>

<style scoped>
.hotels-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.hotels-page h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.back-link {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.back-link:hover {
  background-color: #0056b3;
}
</style>
