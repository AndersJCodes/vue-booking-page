<template>
  <nav class="navbar">
    <div class="nav-links">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/blog" class="nav-link">Blog</router-link>
      <router-link to="/destinations" class="nav-link">Destinations</router-link>
    </div>
  </nav>
</template>

<script lang="ts">
export default {};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  background-color: #333;
  padding: 10px 30px;
}

.nav-link {
  margin: 0 15px;
  text-decoration: none;
  color: #fff;
  font-size: 1.2rem;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #007bff;
}
</style>
