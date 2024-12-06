<template>
    <div class="blog-post-view">
      <div class="content-wrapper">
        <!-- Sidebar with Blog Links -->
        <aside class="blog-sidebar">
          <h3>Other Blog Posts</h3>
          <ul v-if="blogPosts.length">
            <li v-for="post in blogPosts" :key="post.id">
              <router-link
                :to="{ name: 'blogPost', params: { id: post.id } }"
                class="sidebar-link"
                :class="{ 'current-post': post.id === id }"
              >
                {{ post.title }}
              </router-link>
            </li>
          </ul>
          <p v-else>Loading blog posts...</p>
        </aside>
  
        <!-- Main Blog Post Content -->
        <article class="blog-content">
          <h1>{{ post?.title }}</h1>
          <p>{{ post?.content }}</p>
          <router-link to="/blog" class="back-link">← Back</router-link>
        </article>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
  export default defineComponent({
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        blogPosts: [] as { id: string; title: string; content: string }[],
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
        const posts = await response.json();
        this.blogPosts = posts;
        this.post = this.blogPosts.find((post) => post.id === this.id) || null;
  
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
    display: flex;
    padding: 20px;
  }
  
  .content-wrapper {
    display: flex;
    width: 100%;
  }
  
  .blog-sidebar {
    width: 25%;
    padding-right: 20px;
    border-right: 1px solid #ddd;
  }
  
  .blog-sidebar h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
  
  .blog-sidebar ul {
    list-style: none;
    padding: 0;
  }
  
  .sidebar-link {
    text-decoration: none;
    color: #007bff;
    display: block;
    margin-bottom: 10px;
    transition: color 0.3s;
  }
  
  .sidebar-link:hover {
    color: #0056b3;
  }
  
  .current-post {
    font-weight: bold;
    color: #000;
  }
  
  .blog-content {
    width: 75%;
    padding-left: 20px;
  }
  
  .blog-content h1 {
    margin-top: 0;
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
  </style>
  