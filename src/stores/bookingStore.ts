//src/stores/bookingStore.ts

import { defineStore } from 'pinia';

export const useBookingStore = defineStore('booking', {
  state: () => ({
    destination: null as string | null,
    dates: null as { start: Date; end: Date } | null,
    guests: { adults: 0, children: 0, seniors: 0 } as {
      adults: number;
      children: number;
      seniors: number;
    },
  }),
  actions: {
    setDestination(destination: string) {
      this.destination = destination;
    },
    setDates(dates: { start: Date; end: Date }) {
      this.dates = dates;
    },
    setGuests(guests: { adults: number; children: number; seniors: number }) {
      this.guests = guests;
    },
  },
});



