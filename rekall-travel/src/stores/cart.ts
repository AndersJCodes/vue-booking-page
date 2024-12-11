
// src/stores/cart.ts
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    destination: null,
    travelers: 0,
    travelDate: '',
    numberOfDays: 0,
    selectedHotel: null,
  }),
  actions: {
    setCartDetails(destination, travelers, travelDate, numberOfDays, selectedHotel) {
      this.destination = destination;
      this.travelers = travelers;
      this.travelDate = travelDate;
      this.numberOfDays = numberOfDays;
      this.selectedHotel = selectedHotel;
    },
    clearCart() {
      this.destination = null;
      this.travelers = 0;
      this.travelDate = '';
      this.numberOfDays = 0;
      this.selectedHotel = null;
    },
  },
});
