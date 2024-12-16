<script setup lang="ts">
import BookingComponent from '@/components/bookingForm.vue'
import BlogList from '@/components/BlogList.vue'
</script>

<template>
  <main>
    <div class="full-bleed hero-section">
      <div class="content-wrapper">
        <div class=""></div>
        <div class="hero-content">
          <h1>Tired of earth? Make space memories.</h1>
          <!-- <p class="subheader">Rekall travel</p> -->
          <BookingComponent />
        </div>
      </div>
    </div>
    <section class="blog-section">
      <h2>Latest Blog Posts</h2>
      <BlogList />
    </section>
  </main>
</template>

<style scoped>
.hero-section {
  background-image: linear-gradient(rgba(154, 153, 153, 0.294), rgba(0, 0, 0, 0.7)),
    url('@/assets/images/lost-space.webp');
  background-size: cover;
  background-position: center;
  min-height: 50vh;
  position: relative; /* Changed to relative */
  margin-top: -64px; /* Adjust based on your navbar height */
  padding-top: 64px; /* Add padding equal to navbar height */
  color: white;
}

.booking-container {
  background-color: #333;
  border-radius: 0 0 500px 500px;
  padding-top: 5rem; /* Add space between navbar and booking form */
  position: relative;
  z-index: 1;
}

.hero-content {
  text-align: center;
  padding: 10rem 0;
}

h1 {
  font-size: 3.5rem;
  padding-top: 10rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.subheader {
  font-size: 1.5rem;
  margin-bottom: 3rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.blog-section {
  margin-top: 40px;
  padding: 20px;
  /* background-color: #f9f9f9; */
  border-top: 2px solid #ddd;
}
</style>
