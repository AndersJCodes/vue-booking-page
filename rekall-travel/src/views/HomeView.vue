<template>
  <main>
    <BookingComponent />
    <section class="blog-section">
      <h2>Latest Blog Posts</h2>
      <BlogList />
    </section>
  </main>
</template>

<script setup lang="ts">
import BookingComponent from '@/components/BookingForm.vue';
import BlogList from '@/components/BlogList.vue';
</script>

<style scoped>
.blog-section {
  margin-top: 40px;
  padding: 20px;
  background-color: #f9f9f9;
  border-top: 2px solid #ddd;
}
</style>
