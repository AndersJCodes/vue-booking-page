<template>
  <div class="special-offers">
    <h1>Special Offers</h1>
    <div v-for="offer in offers" :key="offer.id" class="offer">
      <img :src="offer.image" :alt="offer.name" class="offer-image" />
      <div class="offer-details">
        <h2>{{ offer.name }}</h2>
        <p>{{ offer.description }}</p>
        <p>
          <span>Price:</span>
          <span class="old-price">${{ offer.price }}</span>
          <span class="discounted-price"
            >${{ calculateDiscountedPrice(offer.price, offer.discount) }}</span
          >
        </p>
        <p><span>Duration:</span> {{ offer.duration }}</p>
        <p><span>Adults:</span> {{ offer.adults }}</p>
        <p v-if="offer.children"><span>Children:</span> {{ offer.children }}</p>
        <h3>Included Excursions:</h3>
        <ul>
          <li v-for="excursionId in offer.excursions" :key="excursionId">
            {{ getExcursionById(excursionId).name }}
          </li>
        </ul>
        <h3>Hotel Options:</h3>
        <ul>
          <li v-for="hotelId in offer.hotel" :key="hotelId">
            {{ getHotelById(hotelId).name }}
          </li>
        </ul>

        <div class="choose-btn-container">
          <button class="choose-btn" @click="cartStore.setCartDetails(offer)">Choose</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import offers from '@/db/offers.json'
import excursions from '@/db/excursions.json'
import hotels from '@/db/hotels.json'
import { useCartStore } from '@/stores/cart'

export default {
  name: 'SpecialOffers',
  data() {
    return {
      offers,
      excursions,
      hotels,
    }
  },
  computed: {
    cartStore() {
      return useCartStore()
    },
  },
  methods: {
    getExcursionById(id) {
      return (
        this.excursions.find((excursion) => excursion.id === id) || { name: 'Unknown Excursion' }
      )
    },
    getHotelById(id) {
      return this.hotels.find((hotel) => hotel.id === id) || { name: 'Unknown Hotel' }
    },
    calculateDiscountedPrice(price, discount) {
      return (price * (1 - discount / 100)).toFixed(2)
    },
  },
}
</script>

<style scoped>
.special-offers {
  padding: 20px;
  max-width: 1200px;
  margin: auto;
}
.offer {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  align-items: center;
  transition:
    box-shadow 0.3s ease,
    background-color 0.3s ease; /* Плавный переход */
}
.offer:hover {
  box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.8); /* Эффект свечения белого цвета */
}
.offer-image {
  width: 40%;
  height: 100%;
  border-radius: 8px;
}
.offer-details {
  flex: 1;
}
.offer-details h2 {
  margin: 0;
  font-size: 1.5em;
  color: #d1ea54;
  text-align: center;
}
.offer-details p {
  margin: 10px 0;
}
/*.offer-details p > span {
    color: #056396;
  }*/
.offer-details h3 {
  color: #d1ea54;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 5px 0;
}
.old-price {
  text-decoration: line-through;
  text-decoration-color: red;
  margin-inline: 10px;
}
.discounted-price {
  font-weight: bold;
}
.choose-btn {
  width: 100%;
  background-color: #d1ea54;
  border-radius: 5px;
  height: 30px;
}
/*.choose-btn-container {
    text-align: center;
  }*/
</style>
