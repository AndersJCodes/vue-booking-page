
    <!-- //src/components/BookingForm.vue -->

    <script setup lang="ts">
    import { ref } from 'vue';
    import { validateBookingForm } from '@/utils/formValidation';

    // Destinationer att välja mellan
    const destinations = ref(['Mars', 'Moon', 'Europa', 'Titan']);

    // Formulärdata
    const destination = ref('');
    const guests = ref({ adults: 0, children: 0, seniors: 0 });

    // Validering och inlämning
    const submitForm = () => {
      const error = validateBookingForm(destination.value, guests.value);
      if (error) {
        alert(error);
        return;
      }
      console.log(`Booking for ${JSON.stringify(guests.value)} to ${destination.value}`);
    };
    </script>

    <template>
      <form>
        <!-- Destination Dropdown -->
        <label for="destination">Destination:</label>
        <select id="destination" v-model="destination">
          <option v-for="dest in destinations" :key="dest" :value="dest">
            {{ dest }}
          </option>
        </select>

        <!-- Gästval -->
        <div class="guests-selector">
          <div>
            <label>Adults:</label>
            <button @click.prevent="guests.adults--" :disabled="guests.adults <= 0">-</button>
            <span>{{ guests.adults }}</span>
            <button @click.prevent="guests.adults++">+</button>
          </div>
          <div>
            <label>Children:</label>
            <button @click.prevent="guests.children--" :disabled="guests.children <= 0">-</button>
            <span>{{ guests.children }}</span>
            <button @click.prevent="guests.children++">+</button>
          </div>
          <div>
            <label>Seniors:</label>
            <button @click.prevent="guests.seniors--" :disabled="guests.seniors <= 0">-</button>
            <span>{{ guests.seniors }}</span>
            <button @click.prevent="guests.seniors++">+</button>
          </div>
        </div>

        <!-- Boka-knapp -->
        <button type="button" @click="submitForm">Book</button>
      </form>
    </template>

    <style scoped>
    /* Enkel styling för bättre användarupplevelse */
    .guests-selector {
      margin: 20px 0;
    }
    .guests-selector div {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
    .guests-selector button {
      margin: 0 10px;
    }
    </style>




