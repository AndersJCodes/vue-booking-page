<template>
  <div class="excursions-page">
    <h1>Excursions för {{ planetName }}</h1>
    <TotalPrice />

    <div v-if="filteredExcursions.length > 0">
      <!-- Loop genom excursions -->
      <div v-for="excursion in filteredExcursions" :key="excursion.id" class="excursion-item">
        <h2>{{ excursion.name }}</h2>
        <p>{{ excursion.description }}</p>
        <p><strong>Duration:</strong> {{ excursion.duration }}</p>
        <p><strong>Price:</strong> ${{ excursion.price }}</p>

        <!-- Toggle Add/Remove Button -->
        <button
          class="add-button"
          :class="{ selected: isExcursionSelected(excursion.id) }"
          @click="toggleExcursion(excursion)"
        >
          {{ isExcursionSelected(excursion.id) ? 'Ta bort från Cart' : 'Lägg till i Cart' }}
        </button>
      </div>
    </div>
    <div v-else>
      <p>Inga excursions tillgängliga för den valda destinationen.</p>
    </div>

    <!-- Proceed to Cart Button -->
    <button class="proceed-button" @click="proceedToCart" :disabled="!hasSelectedExcursions">
      Proceed to Cart
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { usePriceStore } from '@/stores/prices'
import excursionsData from '@/db/excursions.json'
import TotalPrice from '@/components/TotalPrice.vue'

// Initialisera router och route
const router = useRouter()
const route = useRoute()

// Initiera Pinia store
const cartStore = useCartStore()
const priceStore = usePriceStore()

// Hämta destination detaljer från query parametrar
const currentDestination = {
  destination: (route.query.destination as string) || 'Unknown Destination',
  travelers: parseInt(route.query.travelers as string, 10) || 1,
  travelDate: (route.query.startDate as string) || 'No Date Selected',
  days: parseInt(route.query.days as string, 10) || 0,
  hotelName: (route.query.hotelName as string) || 'None selected',
  hotelPrice: parseFloat(route.query.hotelPrice as string) || 0,
}

// Lokalt tillstånd för valda excursions
const selectedExcursions = ref<Set<string>>(new Set())

// Funktion för att toggla excursion val
const toggleExcursion = (excursion: { id: string; name: string; price: number }) => {
  if (selectedExcursions.value.has(excursion.id)) {
    selectedExcursions.value.delete(excursion.id)
    priceStore.removeExcursion(excursion.id)
    console.log(`Excursion Removed: ${excursion.id}`)
  } else {
    selectedExcursions.value.add(excursion.id)
    priceStore.addExcursion({ id: excursion.id, price: excursion.price })
    console.log(`Excursion Added: ${excursion.id}`)
  }
}

// Kontrollera om en excursion är vald
const isExcursionSelected = (excursionId: string) => {
  return selectedExcursions.value.has(excursionId)
}

// Kontrollera om minst en excursion är vald
const hasSelectedExcursions = computed(() => selectedExcursions.value.size > 0)

// Filtrera excursions baserat på planet
const planetName = computed(() => {
  const match = ((route.query.destination as string) || '').match(
    /(mars|venus|sun|jupiter|saturn|neptune|uranus|mercury)/i,
  )
  return match ? match[0].toLowerCase() : 'unknown'
})

const filteredExcursions = computed(() =>
  excursionsData.filter(
    (exc) => planetName.value && exc.id.toLowerCase().includes(planetName.value),
  ),
)

// Funktion för att spara valda excursions till en ny cart
const proceedToCart = () => {
  // Hämta alla valda excursions objekt
  const selectedExcursionsArray = excursionsData.filter((exc) =>
    selectedExcursions.value.has(exc.id),
  )

  // Skapa en ny cart i butiken
  cartStore.setCartDetails({
    destination: currentDestination.destination,
    travelers: currentDestination.travelers,
    travelDate: currentDestination.travelDate,
    days: currentDestination.days,
    hotelName: currentDestination.hotelName,
    hotelPrice: currentDestination.hotelPrice,
    excursions: selectedExcursionsArray.map((exc) => ({
      id: exc.id,
      name: exc.name,
      price: exc.price,
    })),
  })

  console.log('Cart Added:', cartStore.cartDetails[cartStore.cartDetails.length - 1])

  // Navigera till cartvyn
  router.push({ name: 'cart' })
}

// Initial logg av cart state
console.log('Initial Cart State:', cartStore.cartDetails)
</script>

<style scoped>
.excursion-item {
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

button {
  padding: 8px 12px;
  margin: 8px 4px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
}

.add-button {
  background-color: #28a745;
}

.add-button:hover {
  background-color: #218838;
}

.add-button.selected {
  background-color: #dc3545;
}

.add-button.selected:hover {
  background-color: #c82333;
}

.proceed-button {
  display: block;
  width: 100%;
  background-color: #ffc107;
  margin: 20px auto;
  text-align: center;
  font-size: 1.2rem;
}

.proceed-button:hover {
  background-color: #e0a800;
}

.proceed-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
