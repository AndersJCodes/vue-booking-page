<template>
    <div class="about-page">
      <h1>About Venus</h1>
      <p>
        Venus, often called Earth's twin, is a planet of striking beauty and
        extremes. Our floating Cloud City offers a luxurious escape above the
        harsh surface, where you can experience unparalleled comfort and
        breathtaking views.
      </p>
      <img src="@/assets/images/Venus-resort.webp" alt="Venus Resort" class="about-image" />
      <h2>Highlights</h2>
      <ul>
        <li>Relax in luxury accommodations with panoramic cloud views.</li>
        <li>Enjoy gourmet dining above the planet’s sulfuric atmosphere.</li>
        <li>Participate in exclusive activities like cloud-walking expeditions.</li>
      </ul>
      <h2>Experience</h2>
      <p>
        Venus' atmosphere creates a surreal setting for an unforgettable journey.
        With floating cities that redefine elegance, it's a destination for
        travelers seeking the ultimate blend of adventure and luxury.
      </p>
    </div>
  </template>
  
  <script lang="ts">
  export default {};
  </script>
  
  <style scoped>
  .about-page {
    padding: 20px;
  }
  
  h1, h2 {
    color: #ffa500;
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
  