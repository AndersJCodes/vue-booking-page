<template>
  <div class="destinations-view">
    <h1>Explore Our Destinations</h1>
    <nav class="secondary-navbar">
      <router-link to="/destinations/mars" class="nav-link">Mars</router-link>
      <router-link to="/destinations/venus" class="nav-link">Venus</router-link>
      <router-link to="/destinations/sun" class="nav-link">The Sun</router-link>
    </nav>
    <DestinationsStart v-if="!isDestinationSelected" />
    <router-view v-else />
    <section v-if="isDestinationSelected" class="hotel-section">
      <h2>Available Hotels</h2>
      <div class="hotel-list">
        <HotelCard v-for="hotel in filteredHotels" :key="hotel.id" :hotel="hotel" />
      </div>
    </section>
    <section class="blog-section">
      <h2>Latest Blog Posts</h2>
      <BlogList />
    </section>
  </div>
</template>

<script lang="ts">
    import BlogList from '@/components/BlogList.vue'; // Import the BlogList component
    import DestinationsStart from '@/components/DestinationsStart.vue'; // Import the DestinationsStart component
    import HotelCard from '@/components/HotelCard.vue'; // Import the HotelCard component
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';
    import hotelsData from '@/db/hotels.json'; // Import the hotels data

    export default {
    components: {
        BlogList, // Register the BlogList component
        DestinationsStart, // Register the DestinationsStart component
        HotelCard, // Register the HotelCard component
    },
    setup() {
        const route = useRoute();
        
        // Computed property to check if a destination is selected
        const isDestinationSelected = computed(() => {
            return route.path.includes('/destinations/mars') || 
                   route.path.includes('/destinations/venus') || 
                   route.path.includes('/destinations/sun');
        });

        // Computed property to filter hotels based on the selected destination
        const filteredHotels = computed(() => {
            if (route.path.includes('/destinations/mars')) {
                return hotelsData.filter(hotel => hotel.destinationId === 'mars_colony');
            } else if (route.path.includes('/destinations/venus')) {
                return hotelsData.filter(hotel => hotel.destinationId === 'venus_cloud_city');
            } else if (route.path.includes('/destinations/sun')) {
                return hotelsData.filter(hotel => hotel.destinationId === 'solar_farewell');
            }
            return [];
        });

        return {
            isDestinationSelected,
            filteredHotels,
        };
    },
    };
</script>

<style scoped>
    .destinations-view {
        padding: 20px;
    }

    h1 {
        color: #333;
        text-align: center;
    }

    .destinations {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .destinations-text {
        font-size: 1.1rem;
        margin-bottom: 20px;
        color: #f3eded;
    }

    .secondary-navbar {
        margin-bottom: 20px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }

    .nav-link {
        text-decoration: none;
        color: #007bff;
        font-size: 1.2rem;
        margin-right: 15px;
    }

    .nav-link:hover {
        text-decoration: underline;
    }
    .hotel-section {
        margin-top: 2rem;
        padding: 2rem;
        background-color: #dddddd74;
        color: black;
        border-radius: 20px;
    }

    .hotel-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .blog-section {
        margin-top: 2rem;
        padding: 1.5rem;
        background-color: #dddddd74;
        border-radius: 20px;
        color: black;
    }
</style>