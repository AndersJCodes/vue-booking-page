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
                :class="{ 'current-post': post.id === route.params.id }"
              >
                {{ post.title }}
              </router-link>
            </li>
          </ul>
          <p v-else>Loading blog posts...</p>
        </aside>
  
        <!-- Main Blog Post Content -->
        <article class="blog-content" v-if="currentPost">
          <img
            :src="currentPost.image"
            :alt="currentPost.title"
            class="blog-post-image"
          />
          <h1>{{ currentPost.title }}</h1>
          <p
            v-for="paragraph in currentPost.content.split('\n')"
            :key="paragraph"
            class="blog-paragraph"
          >
            {{ paragraph }}
          </p>
          <router-link to="/blog" class="back-link">← Back to Blog</router-link>
        </article>
  
        <p v-else class="error-message">Blog post not found. Please check the URL.</p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useBlogStore } from "@/stores/blog";
  
  export default defineComponent({
    setup() {
      const route = useRoute();
      const blogStore = useBlogStore();
  
      // Fetch blog posts when the component is mounted
      onMounted(() => {
        blogStore.fetchBlogPosts();
      });
  
      // Access blog posts and the current post via Pinia
      const blogPosts = computed(() => blogStore.blogPosts);
      const currentPost = computed(() =>
        blogStore.getBlogPostById(route.params.id as string)
      );
  
      return {
        route,
        blogPosts,
        currentPost,
      };
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
    margin-top: 15px;
  }
  
  .blog-paragraph {
    margin-bottom: 15px;
    line-height: 1.6;
  }
  
  .blog-post-image {
    max-width: 80%;
    height: auto;
    margin-bottom: 20px;
    border-radius: 8px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  
  .error-message {
    text-align: center;
    color: red;
    font-size: 1.2rem;
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
  