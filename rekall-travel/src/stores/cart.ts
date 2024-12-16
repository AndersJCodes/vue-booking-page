
// src/stores/cart.ts
// src/stores/cart.ts

import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    destination: null,
    travelers: 0,
    travelDate: '',
    numberOfDays: 0,
    selectedHotel: null,
    pricePerNight: 0,
    totalPrice:0,
  }),
  actions: {
    setCartDetails(destination, travelers, travelDate, numberOfDays, selectedHotel, pricePerNight) {
      this.destination = destination;
      this.travelers = travelers;
      this.travelDate = travelDate;
      this.numberOfDays = numberOfDays;
      this.selectedHotel = selectedHotel;
      this.pricePerNight = pricePerNight;
      this.totalPrice = pricePerNight * travelers * numberOfDays;
    },
    clearCart() {
      this.destination = null;
      this.travelers = 0;
      this.travelDate = '';
      this.numberOfDays = 0;
      this.selectedHotel = null;
      this.pricePerNight = 0;
      this.totalPrice = 0;
    },
  },
});
