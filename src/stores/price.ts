import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

export const usePriceStore = defineStore('prices', () => {
  const route = useRoute();

  const totalPrice = computed(() => {
    const queries = route.query;
    console.log('Mottagna queries:', queries);
    let price = 0;

    if (queries.option1) {
      const option1 = Array.isArray(queries.option1)
        ? queries.option1[0]
        : queries.option1;
      price += calculateOption1Price(option1);
    }
    if (queries.option2) {
      const option2 = Array.isArray(queries.option2)
        ? queries.option2[0]
        : queries.option2;
      price += calculateOption2Price(option2);
    }

    return price;
  });

  function calculateOption1Price(option: string): number {
    console.log(`Beräknar pris för option1: ${option}`);
    return 100;
  }

  function calculateOption2Price(option: string): number {
    console.log(`Beräknar pris för option2: ${option}`);
    return 200;
  }

  return {
    totalPrice,
  };
});
