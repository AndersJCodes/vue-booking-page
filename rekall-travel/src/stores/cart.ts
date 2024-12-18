// src/stores/cart.ts
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartDetails: [] as Array<{
      destination: string;
      travelers: number;
      adults: number;
      children: number;
      seniors: number;
      travelDate: string;
      days: number;
      hotelName: string;
      hotelPrice: number;
      excursions: Array<{
        name: string;
        price: number;
      }>;
    }>,
  }),
  actions: {
    // Add an excursion to the card or create the card
    addExcursionToCard(details: {
      destination: string;
      travelers: number;
      adults: number
      children: number
      seniors: number
      travelDate: string;
      days: number;
      hotelName: string;
      hotelPrice: number;
      excursionName?: string;
      excursionPrice?: number;
    }) {
      const existingCard = this.cartDetails.find(
        (card) => card.destination === details.destination
      );

      if (existingCard) {
        // Add excursion only if provided
        if (details.excursionName && details.excursionPrice) {
          existingCard.excursions.push({
            name: details.excursionName,
            price: details.excursionPrice,
          });
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
        });
      }
    },
    removeCard(index: number) {
      if (index >= 0 && index < this.cartDetails.length) {
        this.cartDetails.splice(index, 1);
      }
    },

    clearCart() {
      this.cartDetails = [];
    },
  },
});
