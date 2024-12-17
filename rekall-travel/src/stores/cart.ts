// src/stores/cart.ts
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartDetails: [] as Array<{
      destination: string;
      travelers: number;
      travelDate: string;
      days: number;
      hotelName: string;
      hotelPrice: number;
      excursionName: string;
      excursionPrice: number;
    }>,
  }),
  actions: {
    // Add a new cart item to the array
    addCartItem(details: Partial<typeof this.cartDetails[0]>) {
      const newItem = {
        destination: 'Unknown Destination',
        travelers: 1,
        travelDate: 'No Date Selected',
        days: 0,
        hotelName: 'None selected',
        hotelPrice: 0,
        excursionName: 'None selected',
        excursionPrice: 0,
        ...details, // Override defaults with provided details
      };
      this.cartDetails.push(newItem);
    },

    // Update a specific cart item by index
    updateCartItem(index: number, details: Partial<typeof this.cartDetails[0]>) {
      if (this.cartDetails[index]) {
        this.cartDetails[index] = { ...this.cartDetails[index], ...details };
      }
    },

    // Clear all cart items
    clearCart() {
      this.cartDetails = [];
    },

    // Update excursion details for a specific cart item
    setExcursion(index: number, excursion: { name: string; price: number }) {
      if (this.cartDetails[index]) {
        this.cartDetails[index].excursionName = excursion.name;
        this.cartDetails[index].excursionPrice = excursion.price;
      }
    },
  },
});
