<template>
  <div class="destination-content">
    <h2>Welcome to Mars</h2>
    <p>
      Mars, the Red Planet, is a symbol of adventure, exploration, and humanity's
      ability to thrive in the most challenging environments. Our Mars Colony
      offers a unique opportunity to live and work on a planet that was once a
      distant dream.
    </p>
    <img src="@/assets/images/Mars-resort.webp" alt="Mars Resort" class="about-image" />
    <h3>Highlights</h3>
    <ul>
      <li>Stay in cutting-edge habitats designed for Martian conditions.</li>
      <li>Explore the rugged Martian terrain on a guided Mars Safari.</li>
      <li>Witness stunning sunrises over the vast plains of Mars.</li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style scoped>
.destination-content {
  padding: 20px;
}

.about-image {
  max-width: 100%;
  margin: 20px 0;
  border-radius: 8px;
  border: 2px solid #ddd;
}

ul {
  padding-left: 20px;
  list-style-type: square;
}
</style>
