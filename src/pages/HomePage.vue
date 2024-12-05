<!-- //src/pages/HomePage.vue -->

    <script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import SearchBar from '@/components/SearchBar.vue';
    import { fetchPhotos } from '@/api/unsplash';

    // Data
    const destinations = ref(['Mars', 'Moon', 'Venus', 'Sun']);
    const articles = ref([
      { id: 1, title: 'Mars Colony', description: 'Experience life on the Red Planet at the first human colony.'
        ,pricePerPerson: 1000, capacity: 10, duration: 5,
        departureForm: ['Earth', 'Mars'], departureDate: '2023-09-01'
       },
      { id: 2, title: 'Discover the Moon', description: 'Walk on the surface of Earth’s satellite.' },
      { id: 3, title: 'Explore Europa', description: 'Delve into the icy wonders of Jupiter’s moon.' },
    ]);

    // Image data
    const images = ref<string[]>([]);
    const fallbackImage = 'https://via.placeholder.com/150?text=Image+Not+Available';

    // Fetch images from Unsplash
    const loadImages = async () => {
      try {
        for (const destination of destinations.value) {
          const response = await fetchPhotos(destination);
          const imageUrl = response.data.results[0]?.urls.small || fallbackImage;
          images.value.push(imageUrl);
        }
      } catch (error) {
        console.error('Error fetching images from Unsplash:', error);
        images.value = Array(destinations.value.length).fill(fallbackImage);
      }
    };

    // Load images on component mount
    onMounted(loadImages);
    </script>


<template>
  <div class="home">
    <h1>Welcome to Space Travel</h1>
    <SearchBar />
    <section class="destinations">
      <h2>Popular Destinations</h2>
      <ul>
        <li v-for="(dest, index) in destinations" :key="dest">
          <img :src="images[index] || fallbackImage" alt="Destination image" />
          <p>{{ dest }}</p>
        </li>
      </ul>
    </section>
    <section class="articles">
      <h2>Explore Space Experiences</h2>
      <article v-for="article in articles" :key="article.id">
        <h3>{{ article.title }}</h3>
        <p>{{ article.description }}</p>
      </article>
    </section>
  </div>
</template>


<style scoped>
.home {
  text-align: center;
}
.destinations ul {
  display: flex;
  justify-content: center;
  gap: 20px;
  list-style: none;
  padding: 0;
}
.destinations img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
}
.articles article {
  margin: 20px 0;
}
</style>



