<template>
    <div class="blog-listing">
      <h1>Our Blog</h1>
      <div class="blog-container">
        <router-link
          v-for="post in blogPosts"
          :key="post.id"
          :to="{ name: 'blogPost', params: { id: post.id } }"
          class="blog-card"
        >
          <h2>{{ post.title }}</h2>
          <p>{{ post.content.slice(0, 150) }}...</p>
        </router-link>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
  export default defineComponent({
    data() {
      return {
        blogPosts: [
          { id: "blog_001", title: "Explore the Final Frontier", content: "At [Your Company Name]..." },
          { id: "blog_002", title: "Space Travel Simplified", content: "Gone are the days..." },
          { id: "blog_003", title: "The Solar Farewell", content: "The Solar Farewell Voyage..." },
          { id: "blog_004", title: "Mars: Where Adventure Meets Innovation", content: "Mars has captured humanity..." },
          { id: "blog_005", title: "Ready for Launch?", content: "Planning your first space adventure..." },
          { id: "blog_006", title: "The Joy of Weightlessness", content: "Have you ever dreamed of flying..." }
        ],
      };
    },
  });
  </script>
  
  <style scoped>
  .blog-listing {
    padding: 20px;
  }
  
  .blog-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
  
  .blog-card {
    border: 1px solid #ccc;
    padding: 15px;
    text-decoration: none;
    color: inherit;
    border-radius: 10px;
    transition: box-shadow 0.3s ease;
  }
  
  .blog-card:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
  
  .blog-card h2 {
    margin: 0;
    font-size: 1.5rem;
  }
  
  .blog-card p {
    margin: 10px 0 0;
    font-size: 1rem;
  }
  </style>
  