<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-links">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/blog" class="nav-link">Blog</router-link>
      </div>
      <div class="destinations">
        <router-link to="/about/mars" class="nav-link">| Mars</router-link>
        <router-link to="/about/venus" class="nav-link">| Venus</router-link>
        <router-link to="/about/sun" class="nav-link">| The Sun</router-link>
        <router-link to="/cart" class="nav-link">Go to Cart</router-link>
      </div>
    </nav>
    <router-view />
  </div>
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

.destinations {
  display: flex;
  align-items: center;
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
