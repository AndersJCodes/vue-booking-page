// src/stores/cart.ts
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartDetails: {
      destination: 'Unknown Destination',
      travelers: 1,
      travelDate: 'No Date Selected',
      days: 0,
      hotelName: 'None selected',
      hotelPrice: 0,
      excursionName: 'None selected',
      excursionPrice: 0,
    },
  }),
  actions: {
    // Set full cart details
    setCartDetails(details: Partial<typeof this.cartDetails>) {
      this.cartDetails = { ...this.cartDetails, ...details };
    },
    setExcursion(excursion: { name: string; price: number }) {
      this.cartDetails.excursionName = excursion.name;
      this.cartDetails.excursionPrice = excursion.price;
    },
  },
});
