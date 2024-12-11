<template>
  <div class="blog-view">
    <div v-if="loading" class="loading">Loading blog posts...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="blog-container">
      <router-link
        v-for="post in blogPosts"
        :key="post.id"
        :to="{ name: 'blogPost', params: { id: post.id } }"
        class="blog-post"
      >
        <div class="post-layout">
          <img :src="post.image" alt="Blog Post Image" class="blog-post-image" />
          <h2 class="blog-title">{{ post.title }}</h2>
        </div>
        <p class="preview-content">{{ post.content.slice(0, 150) }}...</p>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import type { BlogPost } from '@/types';

export default defineComponent({
  setup() {
    const blogPosts = ref<BlogPost[]>([]);
    const loading = ref(true);
    const error = ref<string | null>(null);

    const fetchBlogPosts = async () => {
      try {
        const response = await fetch("/src/db/BlogPosts.json"); // Adjust the path as necessary
        if (!response.ok) {
          throw new Error("Failed to load blog posts");
        }
        blogPosts.value = await response.json();
      } catch (err) {
        error.value = err instanceof Error ? err.message : "An error occurred";
      } finally {
        loading.value = false;
      }
    };

    fetchBlogPosts();

    return {
      blogPosts,
      loading,
      error,
    };
  },
});
</script>

<style scoped>
.blog-view {
  padding: 20px;
}

.blog-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.blog-post {
  text-decoration: none;
  color: black;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  background: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.blog-post:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

.post-layout {
  display: flex; /* Use flexbox for layout */
  align-items: center; /* Center align items vertically */
}

.blog-post-image {
  max-width: 100px; /* Set a fixed width for the image */
  height: auto;
  margin-right: 20px; /* Space between image and title */
  border-radius: 8px;
}

.blog-title {
  margin: 0; /* Remove default margin */
  font-size: 1.5rem; /* Adjust title size */
}

.preview-content {
  margin-top: 10px; /* Space between title and content */
}

.loading,
.error {
  text-align: center;
  font-size: 1.2rem;
  margin-top: 20px;
}
</style>

