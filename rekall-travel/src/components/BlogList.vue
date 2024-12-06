<template>
    <div class="blog-list">
      <div v-if="loading" class="loading">Loading blog posts...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else class="blog-container">
        <router-link
          v-for="post in blogPosts"
          :key="post.id"
          :to="{ name: 'blogPost', params: { id: post.id } }"
          class="blog-post"
        >
          <h2>{{ post.title }}</h2>
          <p>{{ post.content.slice(0, 150) }}...</p>
        </router-link>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from "vue";
  import type { BlogPost } from '@/types';
  
  export default defineComponent({
    data() {
      return {
        blogPosts: ref<BlogPost[]>([]),
        loading: true,
        error: null as string | null,
      };
    },
    async created() {
      try {
        const response = await fetch("/src/db/blogPosts.json");
        if (!response.ok) {
          throw new Error("Failed to load blog posts");
        }
        this.blogPosts = await response.json();
      } catch (err) {
        this.error = err instanceof Error ? err.message : "An error occurred";
      } finally {
        this.loading = false;
      }
    },
  });
  </script>
  
  <style scoped>
  .blog-list {
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
  
  .loading,
  .error {
    text-align: center;
    font-size: 1.2rem;
    margin-top: 20px;
  }
  </style>
  