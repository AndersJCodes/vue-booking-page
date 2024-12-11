import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import destinationsData from '@/db/destinations.json'

export const usePriceStore = defineStore('prices', () => {
  const route = useRoute()

  const totalPrice = computed(() => {
    const queries = route.query
    let price = 0

    if (queries.destination) {
      const destinationId = Array.isArray(queries.destination)
        ? queries.destination[0]
        : queries.destination
      const destination = destinationsData.find((d: any) => d.id === destinationId)

      if (destination) {
        const travelers = Array.isArray(queries.travelers)
          ? parseInt(queries.travelers[0], 10)
          : parseInt(queries.travelers as string, 10)
        price = destination.pricePerPerson * (travelers || 1)
      }
    }

    return price
  })

  return {
    totalPrice,
  }
})
