<template>
  <div class="destination-content">
    <h2>Enjoy Venus</h2>
    <p>
      Venus, often called Earth's twin, is a planet of striking beauty and
      extremes. Our floating Cloud City offers a luxurious escape above the
      harsh surface, where you can experience unparalleled comfort and
      breathtaking views.
    </p>
    <img src="@/assets/images/Venus-resort.webp" alt="Venus Resort" class="about-image" />
    <h3>Highlights</h3>
    <ul>
      <li>Relax in luxury accommodations with panoramic cloud views.</li>
      <li>Enjoy gourmet dining above the planet’s sulfuric atmosphere.</li>
      <li>Participate in exclusive activities like cloud-walking expeditions.</li>
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
  list-style-type: circle;
}
</style>
