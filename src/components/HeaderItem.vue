<!-- //src/components/HeaderItem.vue -->

<template>
  <header class="header">
    <div class="logo">Space Travel</div>
    <button class="hamburger" @click="toggleMenu">☰</button>
    <nav class="menu-container" :class="{ 'menu-open': isMenuOpen }">
      <ul class="menu">
        <li><router-link to="/" class="nav-link">Home</router-link></li>
        <li><router-link to="/packages" class="nav-link">Packages</router-link></li>
        <li><router-link to="/booking" class="nav-link">Booking</router-link></li>
        <li><router-link to="/experience/1" class="nav-link">Experience</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: #121212;
  color: white;
  position: relative; /* Gör det möjligt att positionera menyn relativt */
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.hamburger {
  background: none;
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  z-index: 10; /* Gör knappen klickbar över menyn */
}

.hamburger:focus {
  outline: none;
}

.menu-container {
  position: absolute;
  top: 100%;
  right: 0;
  background: #121212;
  display: none;
  flex-direction: column;
  width: 200px; /* Sätt en fast bredd för menyn */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.menu-container.menu-open {
  display: flex; /* Visa menyn när klassen "menu-open" är aktiv */
}

.menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu li {
  padding: 10px;
  text-align: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #3498db; /* Light blue hover effect */
}
</style>

