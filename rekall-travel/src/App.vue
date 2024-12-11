<template>
  <div id="app">
    <!-- Behåll din navbar-struktur -->
    <nav class="navbar">
      <div class="nav-links">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/blog" class="nav-link">Blog</router-link>
      </div>
      <div class="destinations">
        <router-link to="/about/mars" class="nav-link">| Mars</router-link>
        <router-link to="/about/venus" class="nav-link">| Venus</router-link>
        <router-link to="/about/sun" class="nav-link">| The Sun</router-link>
        <router-link to="/cart" class="nav-link cart-link">| <LiCart/></router-link>
      </div>
    </nav>

    <!-- Temaknapp utanför navbar -->
    <button @click="toggleTheme" class="theme-toggle">
      {{ isDark ? '☀️ ' : '🌙 ' }}
    </button>

    <!-- Använd router-view här för att visa rätt komponent -->
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { applySavedTheme, toggleThemeFunction } from '@/theme/theme';
import { LiCart } from '@kalimahapps/vue-icons';

// Reactiv variabel för att följa temastatus
const isDark = ref(false);

// Uppdatera temastatus när användaren växlar
const toggleTheme = () => {
  toggleThemeFunction();
  isDark.value = document.documentElement.getAttribute('data-theme') === 'dark';
};

// Applicera tidigare sparat tema vid sidladdning
onMounted(() => {
  applySavedTheme();
  isDark.value = document.documentElement.getAttribute('data-theme') === 'dark';
});
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.cart-link {
  color: #fff;
  font-size: 1.5rem;
}

.cart-link:hover {
  color: #ff6347;
}

.theme-toggle {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: var(--background-color);
  color: var(--text-color);
  border: 1px solid var(--text-color);
  padding: 5px 10px;
  font-size: 0.5rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s, transform 0.2s;
}

.theme-toggle:hover {
  background-color: var(--text-color);
  color: var(--background-color);
  transform: scale(1.1);
}

.theme-toggle:focus {
  outline: none;
  box-shadow: 0 0 5px var(--link-color);
}
</style>
