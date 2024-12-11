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
    <section class="blog-section">
      <h2>Latest Blog Posts</h2>
      <BlogList />
    </section>
  </div>
</template>

<script lang="ts">
    import BlogList from '@/components/BlogList.vue'; // Import the BlogList component
    import DestinationsStart from '@/components/DestinationsStart.vue'; // Import the DestinationsStart component
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';

    export default {
    components: {
        BlogList, // Register the BlogList component
        DestinationsStart, // Register the DestinationsStart component
    },
    setup() {
        const route = useRoute();
        
        // Computed property to check if a destination is selected
        const isDestinationSelected = computed(() => {
            return route.path.includes('/destinations/mars') || 
                   route.path.includes('/destinations/venus') || 
                   route.path.includes('/destinations/sun');
        });

        return {
            isDestinationSelected,
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
    .blog-section {
        margin-top: 40px;
        padding: 20px;
        background-color: #f9f9f9;
        border-top: 2px solid #ddd;
    }
</style>