<template>
    <div class="hotel-card">
      <img :src="resolvedImagePath" :alt="hotel.name" class="hotel-image" />
      <h3>{{ hotel.name }}</h3>
      <p>{{ hotel.description }}</p>
      <p><strong>Price per Night:</strong> ${{ hotel.pricePerNight }}</p>
      <p><strong>Rating:</strong> {{ hotel.rating }} / 5</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed, PropType } from 'vue';
  import type { Hotel } from '@/types'; // Ensure you have a Hotel type defined
  
  export default defineComponent({
    props: {
      hotel: {
        type: Object as PropType<Hotel>,
        required: true,
      },
    },
    setup(props) {
      // Dynamically resolve the image path
      const resolvedImagePath = computed(() => {
        try {
          return new URL(props.hotel.image, import.meta.url).href;
        } catch {
          return props.hotel.image; // Fallback to the raw path
        }
      });
  
      return {
        resolvedImagePath,
      };
    },
  });
  </script>
  
  <style scoped>
  .hotel-card {
    color: black;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    margin: 10px;
    text-align: center;
    background-color: #f9f9f9;
    width: 30%;
  }
  
  .hotel-image {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
  }
  </style>
  