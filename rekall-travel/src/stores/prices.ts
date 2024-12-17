import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import destinationsData from '@/db/destinations.json'
import hotelsData from '@/db/hotels.json'
import { Destination, Hotel, BookingQuery, PriceStore } from '@/types'

export const usePriceStore = defineStore('prices', (): PriceStore => {
  const route = useRoute()

  const destinationPrice = computed(() => {
    const queries = route.query as BookingQuery
    let price = 0

    if (queries.destinationId) {
      // 2. Clean find operation (BookingQuery ensures destination is string)
      const destination = destinationsData.find((d: Destination) => d.id === queries.destinationId)

      if (destination) {
        // 3. Simple access (BookingQuery ensures travelers is number)
        price = destination.pricePerPerson * (queries.travelers || 1)
      }
    }
    return price
  })

  // Separate hotel price calculation
  const hotelPrice = computed(() => {
    const queries = route.query as BookingQuery
    let price = 0

    if (queries.hotelId) {
      const hotel = hotelsData.find((h: Hotel) => h.id === queries.hotelId)

      if (hotel) {
        price = hotel.pricePerNight * (queries.days || 1) * (queries.travelers || 1)
      }
    }
    return price
  })

  const totalPrice = computed(() => destinationPrice.value + hotelPrice.value)

  return {
    destinationPrice,
    hotelPrice,
    totalPrice,
  } as const
})
