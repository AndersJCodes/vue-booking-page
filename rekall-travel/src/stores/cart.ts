// src/stores/cart.ts
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartDetails: [] as Array<{
      cartId: string
      sessionId: string
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
    }>,
  }),
  actions: {
    // Lägg till en ny cart med excursions
    setCartDetails(details: {
      sessionId: string
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
        sessionId: details.sessionId,
        destination: details.destination,
        travelers: details.travelers,
        travelDate: details.travelDate,
        days: details.days,
        hotelName: details.hotelName,
        hotelPrice: details.hotelPrice,
        excursions: details.excursions,
      })
    },
    updateLatestCart(details: {
      sessionId: string
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
      const existingCart = this.cartDetails.find((cart) => cart.sessionId === details.sessionId)
      if (existingCart) {
        existingCart.destination = details.destination
        existingCart.travelers = details.travelers
        existingCart.travelDate = details.travelDate
        existingCart.days = details.days
        existingCart.hotelName = details.hotelName
        existingCart.hotelPrice = details.hotelPrice
        existingCart.excursions = details.excursions
      } else {
        this.setCartDetails(details)
      }
    },
    clearCart() {
      this.cartDetails = []
    },
    // Valfritt: Ta bort en cart baserat på cartId
    removeCart(cartId: string) {
      const index = this.cartDetails.findIndex((cart) => cart.cartId === cartId)
      if (index !== -1) {
        this.cartDetails.splice(index, 1)
      }
    },
  },
})
