<template>
  <nav class="navbar">
    <div class="nav-links">
      <RouterLink to="/" class="logo-link">
        <img src="@/assets/favicon.png" alt="Rekall Logo" class="logo-image" />
        <span class="logo-text">Rekall</span>
      </RouterLink>
      <router-link to="/offers" class="nav-link">Offers</router-link>
      <router-link to="/destinations" class="nav-link">Destinations</router-link>
      <router-link to="/blog" class="nav-link">Blog</router-link>
      <router-link to="/cart" class="nav-link cart-link"> <LiCart /></router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { LiCart } from '@kalimahapps/vue-icons'
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  background-color: #333;
  padding: 10px 30px;
  border-radius: 0 0 100px 100px;
  width: 100%;
}

.logo-link {
  display: flex;
  align-items: center;
  width: 150px;
}

.logo-image {
  width: 30px; /* Justera storleken efter behov */
  height: 30px;
  margin-right: 8px; /* Utrymme mellan logo och text */
}

.logo-text {
  color: white;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem; /* Add consistent spacing between links */
  justify-content: center; /* Center the links */
  flex: 1; /* Take up remaining space */
}
.nav-link:last-child {
  width: 150px; /* Match logo width */
  display: flex;
  justify-content: flex-end;
}

.nav-link {
  text-decoration: none;
  color: #fff;
  font-size: 1.2rem;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #007bff;
}
.cart-link {
  color: #fff;
  font-size: 1.5rem;
}

.cart-link:hover {
  color: #ff6347;
}
</style>
