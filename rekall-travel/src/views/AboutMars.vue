<template>
    <div class="about-page">
      <h1>About Mars</h1>
      <p>
        Mars, the Red Planet, is a symbol of adventure, exploration, and humanity's
        ability to thrive in the most challenging environments. Our Mars Colony
        offers a unique opportunity to live and work on a planet that was once a
        distant dream.
      </p>
      <img src="@/assets/images/Mars-resort.webp" alt="Mars Resort" class="about-image" />
      <h2>Highlights</h2>
      <ul>
        <li>Stay in cutting-edge habitats designed for Martian conditions.</li>
        <li>Explore the rugged Martian terrain on a guided Mars Safari.</li>
        <li>Witness stunning sunrises over the vast plains of Mars.</li>
      </ul>
      <h2>Experience</h2>
      <p>
        Whether you're conducting groundbreaking research or simply enjoying the
        serenity of this alien world, Mars offers a balance of adventure and
        innovation. From the towering Olympus Mons to the mysterious Valles
        Marineris, every day on Mars is filled with awe and discovery.
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
    color: #a50000;
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
  