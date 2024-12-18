// src/stores/cart.ts
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartDetails: [] as Array<{
      destination: string
      travelers: number
      adults: number
      children: number
      seniors: number
      travelDate: string
      days: number
      hotelName: string
      hotelPrice: number
      excursions: Array<{
        id: string
        name: string
        price: number
      }>
    }>,
  }),
  actions: {
    // Add an excursion to the card or create the card
    addExcursionToCard(details: {
      destination: string
      travelers: number
      adults: number
      children: number
      seniors: number
      travelDate: string
      days: number
      hotelName: string
      hotelPrice: number
      excursionName?: string
      excursionPrice?: number
    }) {
      const existingCard = this.cartDetails.find((card) => card.destination === details.destination)

      if (existingCard) {
        // Add excursion only if provided
        if (details.excursionName && details.excursionPrice) {
          existingCard.excursions.push({
            name: details.excursionName,
            price: details.excursionPrice,
          })
        }
      } else {
        // Create a new card even if no excursions are selected
        this.cartDetails.push({
          destination: details.destination,
          travelers: details.travelers,
          adults: details.adults,
          children: details.children,
          seniors: details.seniors,
          travelDate: details.travelDate,
          days: details.days,
          hotelName: details.hotelName,
          hotelPrice: details.hotelPrice,
          excursions: details.excursionName
            ? [
                {
                  name: details.excursionName,
                  price: details.excursionPrice || 0,
                },
              ]
            : [], // Empty excursions if none are selected
        })
      }
    },
    removeCard(index: number) {
      if (index >= 0 && index < this.cartDetails.length) {
        this.cartDetails.splice(index, 1)
      }
    },

    clearCart() {
      this.cartDetails = []
      console.log('All Cart Rensad.')
    },
    // Valfritt: Ta bort en cart baserat på cartId
    removeCart(cartId: string) {
      const index = this.cartDetails.findIndex((cart) => cart.cartId === cartId)
      if (index !== -1) {
        this.cartDetails.splice(index, 1)
        console.log(`Cart med ID ${cartId} har tagits bort.`)
      }
    },
  },
})
