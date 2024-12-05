//src/stores/cartStore.ts

import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as { name: string; price: number }[], // Lägg till `name` här
    total: 0,
  }),
  actions: {
    addItem(item: { name: string; price: number }) { // Uppdaterad typ
      this.items.push(item);
      this.total += item.price;
    },
    removeItem(index: number) {
      this.total -= this.items[index].price;
      this.items.splice(index, 1);
    },
  },
});



