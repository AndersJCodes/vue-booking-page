import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import destinationsData from '@/db/destinations.json'
import hotelsData from '@/db/hotels.json'
import { Destination, Hotel, BookingQuery, PriceStore } from '@/types'

export const usePriceStore = defineStore('prices', (): PriceStore => {
  const route = useRoute()

  const selectedExcursions = ref<{ id: string; price: number }[]>([])

  const destinationPrice = computed(() => {
    const queries = route.query as unknown as BookingQuery
    let price = 0

    if (queries.destination) {
      const destination = destinationsData.find((d: Destination) => d.id === queries.destination)

      if (destination) {
        price = destination.pricePerPerson * (queries.travelers || 1)
      }
    }
    return price
  })

  // Separate hotel price calculation
  const hotelPrice = computed(() => {
    const queries = route.query as unknown as BookingQuery
    let price = 0

    if (queries.hotelId) {
      const hotel = hotelsData.find((h: Hotel) => h.id === queries.hotelId)

      if (hotel) {
        price = hotel.pricePerNight * (queries.days || 1) * (queries.travelers || 1)
      }
    }
    return price
  })

  const addExcursion = (excursion: { id: string; price: number }) => {
    if (!selectedExcursions.value.some((e) => e.id === excursion.id)) {
      selectedExcursions.value.push(excursion)
    }
  }

  const removeExcursion = (excursionId: string) => {
    selectedExcursions.value = selectedExcursions.value.filter((e) => e.id !== excursionId)
  }

  const excursionPrice = computed(() => {
    return selectedExcursions.value.reduce((total, excursion) => total + excursion.price, 0)
  })

  const totalPrice = computed(
    () => destinationPrice.value + hotelPrice.value + excursionPrice.value,
  )

  return {
    destinationPrice,
    hotelPrice,
    addExcursion,
    removeExcursion,
    excursionPrice,
    totalPrice,
  } as const
})
