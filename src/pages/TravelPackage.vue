<!-- //src/pages/travelPackage.vue -->

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCartStore } from '@/stores/cartStore';
import { fetchPhotos } from '@/api/unsplash';

const packages = ref([
  {
    id: 1,
    name: 'Mars Explorer',
    description: 'A thrilling 7-day journey to the red planet.',
    image: '',
    price: 5000,
  },
  {
    id: 2,
    name: 'Moon Adventure',
    description: 'A 5-day trip to explore Earth’s satellite.',
    image: '',
    price: 3000,
  },
  {
    id: 3,
    name: 'Sweden Expedition',
    description: 'Dive into the icy wonders of Jupiter’s moon.',
    image: '',
    price: 7000,
  },
]);
const cartStore = useCartStore();

const bookPackage = (selectedPackage: { name: string; price: number }) => {
  cartStore.addItem({
    name: selectedPackage.name,
    price: selectedPackage.price,
  });
  alert(`${selectedPackage.name} has been added to your cart!`);
};

const loadImages = async () => {
  for (const travelPackage of packages.value) {
    try {
      const response = await fetchPhotos(travelPackage.name);
      travelPackage.image = response.data.results[0]?.urls.small || 'https://via.placeholder.com/300x200?text=Image+Not+Available';
    } catch (error) {
      console.error(`Failed to fetch image for ${travelPackage.name}:`, error);
      travelPackage.image = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
    }
  }
};

onMounted(() => {
  loadImages();
});
</script>


<template>
  <div class="packages">
    <h1>Travel Packages</h1>
    <section class="package-list">
      <div v-for="travelPackage in packages" :key="travelPackage.id" class="package-item">
        <img :src="travelPackage.image" alt="Package image" />
        <h2>{{ travelPackage.name }}</h2>
        <p>{{ travelPackage.description }}</p>
        <button @click="bookPackage(travelPackage)">Book Now</button>
      </div>
    </section>
  </div>
</template>


<style scoped>
.packages {
  text-align: center;
}
.package-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
.package-item {
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
}
.package-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}
</style>
