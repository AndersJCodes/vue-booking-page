import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

export const useBookingStore = defineStore('booking', () => {
  const route = useRoute();

  const totalPrice = computed(() => {
    const params = route.params;
    let price = 0;

    if (params.option1) {
      price += calculateOption1Price(params.option1 as string);
    }
    if (params.option2) {
      price += calculateOption2Price(params.option2 as string);
    }
    // Lägg till fler parametrar efter behov

    return price;
  });

  function calculateOption1Price(option: string): number {
    // Implementera logik för att beräkna pris baserat på option1
    return 100; // Exempelvärde
  }

  function calculateOption2Price(option: string): number {
    // Implementera logik för att beräkna pris baserat på option2
    return 200; // Exempelvärde
  }

  return {
    totalPrice,
  };
});
