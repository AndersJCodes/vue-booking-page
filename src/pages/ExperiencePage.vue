<!-- //src/pages/ExperiencePage.vue  -->

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';


interface Experience {
  id: number;
  title: string;
  description: string;
  image: string;
  criteria: {
    destination: string;
    guests: { adults: number; children: number; seniors: number };
    dates: string;
    tripType: string;
  };
}

// Mock dataset
const experiences: Experience[] = [
  {
    id: 1,
    title: 'Mars Explorer',
    description: 'Experience the thrill of exploring the red planet.',
    image: 'https://source.unsplash.com/featured/?mars',
    criteria: {
      destination: 'Mars',
      guests: { adults: 2, children: 0, seniors: 0 },
      dates: '2024-12-01 to 2024-12-07',
      tripType: 'round-trip',
    },
  },
  {
    id: 2,
    title: 'Moon Adventure',
    description: 'Walk on the surface of the Moon and explore its mysteries.',
    image: 'https://source.unsplash.com/featured/?moon',
    criteria: {
      destination: 'Moon',
      guests: { adults: 1, children: 2, seniors: 0 },
      dates: '2024-10-15 to 2024-10-20',
      tripType: 'one-way',
    },
  },
];

const route = useRoute();
const experience = ref<Experience | null>(null);

onMounted(() => {
  const id = Number(route.params.id);
  console.log('Route Params:', route.params); // Debug
  console.log('ID from route:', id); // Debug

  // Find experience by ID
  const selectedExperience = experiences.find(exp => exp.id === id);

  if (selectedExperience) {
    experience.value = selectedExperience;
  } else {
    console.warn(`Experience not found for ID: ${id}`);
    experience.value = null;
  }
});
</script>

<template>
  <div v-if="experience" class="experience">
    <h1>{{ experience.title }}</h1>
    <img :src="experience.image" alt="Experience image" />
    <p>{{ experience.description }}</p>
    <ul>
      <li>Destination: {{ experience.criteria.destination }}</li>
      <li>
        Guests: Adults {{ experience.criteria.guests.adults }},
        Children {{ experience.criteria.guests.children }},
        Seniors {{ experience.criteria.guests.seniors }}
      </li>
      <li>Dates: {{ experience.criteria.dates }}</li>
      <li>Trip Type: {{ experience.criteria.tripType }}</li>
    </ul>
  </div>
  <div v-else>
    <h1>Experience Not Found</h1>
    <p>The experience you are looking for does not exist.</p>
  </div>
</template>

<style scoped>
.experience {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}
</style>
