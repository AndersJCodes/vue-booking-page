import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import destinationsData from '@/db/destinations.json'
import hotelsData from '@/db/hotels.json'

export const usePriceStore = defineStore('prices', () => {
  const route = useRoute()

  const destinationPrice = computed(() => {
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

  // Separate hotel price calculation
  const hotelPrice = computed(() => {
    const queries = route.query
    let price = 0

    if (queries.hotelId) {
      const hotelId = Array.isArray(queries.hotelId) ? queries.hotelId[0] : queries.hotelId
      const hotel = hotelsData.find((h) => h.id === hotelId)
      const travelers = Array.isArray(queries.travelers)
        ? parseInt(queries.travelers[0], 10)
        : parseInt(queries.travelers as string, 10)
      const days = parseInt(queries.days as string, 10) || 1

      if (hotel) {
        price = hotel.pricePerNight * days * travelers
      }
    }
    return price
  })

  // Total price combining both
  const totalPrice = computed(() => destinationPrice.value + hotelPrice.value)

  return {
    destinationPrice,
    hotelPrice,
    totalPrice,
  }
})
