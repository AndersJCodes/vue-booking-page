<!-- this component is used to display the total price of the booking It uses the price store to get the total price and formats it to Swedish locale -->
<template>
  <div class="total-price">Total price: {{ formattedTotalPrice }} kr</div>
</template>

<script setup lang="ts">
import { usePriceStore } from '@/stores/prices'
import { computed } from 'vue'

// Create a number formatter for Swedish locale
const numberFormatter = new Intl.NumberFormat('sv-SE', {
  style: 'decimal',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

const { totalPrice } = usePriceStore()
const formattedTotalPrice = computed(() => numberFormatter.format(totalPrice))
</script>

<style scoped>
.total-price {
  font-size: 1.5rem;
  font-weight: bold;
  /* Lägg till ytterligare styling vid behov */
}
</style>
