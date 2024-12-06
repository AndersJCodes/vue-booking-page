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
          <p v-for="paragraph in currentPost.content.split('\n')" :key="paragraph" class="blog-paragraph">
            {{ paragraph }}
          </p>
          <router-link to="/blog" class="back-link">← Back to Blog</router-link>
        </article>
  
        <p v-else class="error-message">Blog post not found. Please check the URL.</p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, watch } from "vue";
  import { useRoute } from "vue-router";
  
  export default defineComponent({
    setup() {
      const route = useRoute();
  
      const blogPosts = ref([] as { id: string; title: string; content: string; image: string }[]);
      const currentPost = ref(null as { id: string; title: string; content: string; image: string } | null);
      const loading = ref(true);
      const error = ref(null as string | null);
  
      const fetchBlogPosts = async () => {
        try {
          const response = await fetch("/src/db/blogPosts.json");
          if (!response.ok) {
            throw new Error("Failed to load blog posts");
          }
          blogPosts.value = await response.json();
          setCurrentPost();
        } catch (err) {
          console.error(err);
          error.value = err instanceof Error ? err.message : "An error occurred";
        } finally {
          loading.value = false;
        }
      };
  
      const setCurrentPost = () => {
    if (!loading.value) {
        const normalizedRouteId = (route.params.id as string).replace("-", "_");
        currentPost.value = blogPosts.value.find((post) => post.id === normalizedRouteId) || null;

        console.log("Route ID:", route.params.id); // Debugging
        console.log("Normalized ID:", normalizedRouteId); // Debugging
        console.log("Matched Post:", currentPost.value); // Debugging

        if (!currentPost.value) {
        error.value = "Blog post not found.";
        }
    }
    };

  
      // Watch for route changes to update the current post
      watch(
        () => route.params.id,
        () => {
          setCurrentPost();
        }
      );
  
      // Fetch blog posts on component creation
      fetchBlogPosts();
  
      return {
        route,
        blogPosts,
        currentPost,
        loading,
        error,
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
  