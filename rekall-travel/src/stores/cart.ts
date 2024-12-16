
// src/stores/cart.ts
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    destination: null as string | null,
    travelers: 0,
    travelDate: '',
    numberOfDays: 0,
    selectedHotel: null as { name: string; price?: number } | null,
    selectedExcursions: [] as Array<{ id: string; name: string; price: number }>,
  }),
  actions: {
    setCartDetails(destination: string, travelers: number, travelDate: string, numberOfDays: number, selectedHotel: { name: string; price?: number }) {
      this.destination = destination;
      this.travelers = travelers;
      this.travelDate = travelDate;
      this.numberOfDays = numberOfDays;
      this.selectedHotel = selectedHotel;
    },

    addExcursion(excursion: { id: string; name: string; price: number }) {
      const exists = this.selectedExcursions.find((e) => e.id === excursion.id);
      if (!exists) {
        this.selectedExcursions.push(excursion);
      }
    },
    clearCart() {
      this.destination = null;
      this.travelers = 0;
      this.travelDate = '';
      this.numberOfDays = 0;
      this.selectedHotel = null;
      this.selectedExcursions = []
    },
  },
  getters: {
    // Calculate total price
    totalPrice: (state) => {
      const excursionsCost = state.selectedExcursions.reduce((total, exc) => total + exc.price, 0);
      const hotelCost = state.selectedHotel?.price ?? 0;
      return (excursionsCost + hotelCost) * state.travelers;
    },
  },
});
