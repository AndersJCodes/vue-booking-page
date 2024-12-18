<template>
  <div class="excursions-page">
    <h1>Excursions for {{ planetName }}</h1>
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
    <button class="proceed-button" @click="proceedToCart">Proceed to Cart</button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
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
  adults: parseInt(route.query.adults as string, 10) || 0,
  children: parseInt(route.query.children as string, 10) || 0,
  seniors: parseInt(route.query.seniors as string, 10) || 0,
  travelDate: (route.query.startDate as string) || 'No Date Selected',
  days: parseInt(route.query.days as string, 10) || 0,
  hotelName: (route.query.hotelName as string) || 'None selected',
  hotelPrice: parseFloat(route.query.hotelPrice as string) || 0,
  sessionId: (route.query.sessionId as string) || '',
}

// Lokalt tillstånd för valda excursions
const selectedExcursions = ref<Set<string>>(new Set())

// Funktion för att toggla excursion val
const toggleExcursion = (excursion: { id: string; name: string; price: number }) => {
  if (selectedExcursions.value.has(excursion.id)) {
    selectedExcursions.value.delete(excursion.id)
    priceStore.removeExcursion(excursion.id)
  } else {
    selectedExcursions.value.add(excursion.id)
    priceStore.addExcursion({ id: excursion.id, price: excursion.price })
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

// Ladda senaste cart vid mount om den finns
onMounted(() => {
  const sessionId = currentDestination.sessionId
  if (sessionId) {
    const existingCart = cartStore.cartDetails.find((cart) => cart.sessionId === sessionId)
    if (existingCart) {
      existingCart.excursions.forEach((exc) => selectedExcursions.value.add(exc.id))
      // Lägg till priser i priceStore
      existingCart.excursions.forEach((exc) =>
        priceStore.addExcursion({ id: exc.id, price: exc.price }),
      )
    }
  }
})

// Funktion för att spara valda excursions till den senaste carten
const proceedToCart = () => {
  // Hämta alla valda excursions objekt
  const selectedExcursionsArray = excursionsData.filter((exc) =>
    selectedExcursions.value.has(exc.id),
  )
  ///Räkna ut totalpriset för allt
  const totalPrice = priceStore.totalPrice

  // Skapa en ny cart i butiken
  const cartDetails = {
    destination: currentDestination.destination,
    travelers: currentDestination.travelers,
    adults: currentDestination.adults,
    children: currentDestination.children,
    seniors: currentDestination.seniors,
    travelDate: currentDestination.travelDate,
    days: currentDestination.days,
    hotelName: currentDestination.hotelName,
    hotelPrice: currentDestination.hotelPrice,
    sessionId: currentDestination.sessionId,
    excursions: selectedExcursionsArray.map((exc) => ({
      id: exc.id,
      name: exc.name,
      price: exc.price,
    })),
    totalPrice: totalPrice,
  }

  // Uppdatera den senaste carten istället för att skapa en ny
  cartStore.updateLatestCart(cartDetails)

  // Navigera till cartvyn
  router.push({ name: 'cart' })
}
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
