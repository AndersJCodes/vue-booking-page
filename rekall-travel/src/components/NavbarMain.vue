<template>
  <nav class="navbar">
    <!-- Logo Section -->
    <RouterLink to="/" class="logo-link">
      <img src="@/assets/favicon.png" alt="Rekall Logo" class="logo-image" />
      <span class="logo-text">Rekall</span>
    </RouterLink>

    <!-- Navigation Links for Desktop -->
    <div class="nav-links">
      <router-link to="/offers" class="nav-link">Offers</router-link>
      <router-link to="/destinations" class="nav-link">Destinations</router-link>
      <router-link to="/blog" class="nav-link">Blog</router-link>
    </div>

    <!-- Cart and Hamburger Menu -->
    <div class="navbar-right">
      <router-link to="/cart" class="nav-link cart-link">
        <LiCart />
        <div v-if="hasItemsInCart" class="cart-dot">{{ cartStore.cartDetails.length }}</div>
      </router-link>
      <button class="hamburger" @click="toggleMenu" aria-label="Toggle menu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="mobile-menu">
      <router-link to="/offers" class="nav-link" @click="toggleMenu">Offers</router-link>
      <router-link to="/destinations" class="nav-link" @click="toggleMenu"
        >Destinations</router-link
      >
      <router-link to="/blog" class="nav-link" @click="toggleMenu">Blog</router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { LiCart } from '@kalimahapps/vue-icons'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const isMenuOpen = ref(false)
// Computed property to check if there are items in the cart
const hasItemsInCart = computed(() => cartStore.cartDetails.length > 0)

console.log('Cart Store:', cartStore.cartDetails.length)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Vertikalt centrerade */
  background-color: #333;
  padding: 10px 30px;
  border-radius: 0 0 100px 100px;
  width: 100%;
  position: relative; /* För positionering av mobile-menu */
}

.logo-link {
  display: flex;
  align-items: center;
  width: auto;
}

.logo-image {
  width: 30px; /* Justera storlek efter behov */
  height: 30px;
  margin-right: 8px; /* Utrymme mellan logo och text */
}

.logo-text {
  color: white;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem; /* Konsistent avstånd mellan länkar */
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 1rem; /* Avstånd mellan cart och hamburger */
}

.nav-link:last-child {
  display: flex;
  justify-content: center;
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

.cart-dot {
  position: absolute;
  top: 8px; /* Adjust to position the dot on top */
  right: 20px; /* Adjust to position the dot on top */
  width: 20px; /* Adjust size for number */
  height: 20px; /* Adjust size for number */
  background-color: red;
  border-radius: 50%;
  border: 2px solid white; /* Optional: Add a border to make the dot stand out */
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5); /* Optional: Add a shadow for better visibility */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white; /* Text color */
  font-size: 12px; /* Adjust font size */
  font-weight: bold; /* Make the number bold */
}

.cart-link:hover {
  color: #ff6347;
}

/* Hamburger Menu Styles */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 25px;
  height: 20px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.bar {
  height: 3px;
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
}

.mobile-menu {
  display: none;
  flex-direction: column;
  position: absolute;
  top: 60px;
  right: 30px;
  background-color: #333;
  border-radius: 8px;
  padding: 10px;
  gap: 1rem;
}

.mobile-menu .nav-link {
  font-size: 1.2rem;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  .hamburger {
    display: flex;
  }
  .mobile-menu {
    display: flex;
  }

  .cart-dot {
    right: 61px; /* Adjust to position the dot on top */
  }
}
</style>
