<template>
  <div class="excursions-page">
    <h1>Excursions for {{ planetName }}</h1>
    <div v-if="filteredExcursions.length > 0">
      <div
        v-for="excursion in filteredExcursions"
        :key="excursion.id"
        class="excursion-item"
      >
        <h2>{{ excursion.name }}</h2>
        <p>{{ excursion.description }}</p>
        <p><strong>Duration:</strong> {{ excursion.duration }}</p>
        <p><strong>Price:</strong> {{ excursion.price}}</p>
      </div>
    </div>
    <div v-else>
      <p>No excursions available for the selected destination.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import excursionsData from '@/db/excursions.json' // Import JSON data

const route = useRoute()

// Extract destination from query parameters
const destination = computed(() => route.query.destination as string)

// Extract planet name from destination
const planetName = computed(() => {
  if (!destination.value) return ''
  const match = destination.value.match(/(mars|venus|sun|jupiter|saturn|neptune|uranus|mercury)/i)
  return match ? match[0].toLowerCase() : 'unknown'
})

// Filter excursions where the id contains the planet name
const excursions = excursionsData
const filteredExcursions = computed(() =>
  excursions.filter((exc) =>
    planetName.value && exc.id.toLowerCase().includes(planetName.value)
  )
)

</script>

<style scoped>
.excursion-item {
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  background-color: #f9f9f9;
}
</style>
