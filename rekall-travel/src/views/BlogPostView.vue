<template>
    <div class="blog-post-view">
      <div v-if="loading" class="loading">Loading blog post...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else>
        <h1>{{ post?.title }}</h1>
        <p>{{ post?.content }}</p>
        <router-link to="/blog" class="back-link">← Back to Blog</router-link>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import type { BlogPost } from '@/types';
  
  export default defineComponent({
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        post: null as { id: string; title: string; content: string } | null,
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
        const blogPosts = await response.json() as BlogPost[];
        this.post = blogPosts.find((post) => post.id === this.id) || null;
        if (!this.post) {
          throw new Error("Blog post not found");
        }
      } catch (err) {
        this.error = err instanceof Error ? err.message : "An error occurred";
      } finally {
        this.loading = false;
      }
    },
  });
  </script>
  
  <style scoped>
  .blog-post-view {
    padding: 20px;
  }
  
  .back-link {
    display: inline-block;
    margin-top: 20px;
    text-decoration: none;
    color: #007bff;
  }
  
  .back-link:hover {
    text-decoration: underline;
  }
  
  .loading,
  .error {
    text-align: center;
    font-size: 1.2rem;
    margin-top: 20px;
  }
  </style>
  