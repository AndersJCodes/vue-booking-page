// src/stores/cart.ts
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartDetails: [] as Array<{
      cartId: string
      destination: string
      travelers: number
      adults: number;
      children: number;
      seniors: number;
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
    // Lägg till en ny cart med excursions
    setCartDetails(details: {
      destination: string
      travelers: number
      travelDate: string
      days: number
      hotelName: string
      hotelPrice: number
      excursions: Array<{
        id: string
        name: string
        price: number
      }>
    }) {
      const cartId = uuidv4()
      this.cartDetails.push({
        cartId,
        destination: details.destination,
        travelers: details.travelers,
        travelDate: details.travelDate,
        days: details.days,
        hotelName: details.hotelName,
        hotelPrice: details.hotelPrice,
        excursions: details.excursions,
      })
      console.log('Ny Cart skapad:', cartId)
      console.log('Aktuell Cart Detaljer:', this.cartDetails)
    },
    removeCard(index: number) {
      if (index >= 0 && index < this.cartDetails.length) {
        this.cartDetails.splice(index, 1);
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
