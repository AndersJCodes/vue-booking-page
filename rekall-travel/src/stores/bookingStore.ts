import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { BookingDetails } from '@/types'

export const useBookingStore = defineStore('booking', () => {
  // State
  const bookingDetails = ref<BookingDetails>({
    destination: '',
    travelers: 1,
    travelDate: '',
  })

  // Actions
  const setBookingDetails = (details: Partial<BookingDetails>) => {
    bookingDetails.value = { ...bookingDetails.value, ...details }
  }

  const resetBookingDetails = () => {
    bookingDetails.value = {
      destination: '',
      travelers: 1,
      travelDate: '',
    }
  }

  return {
    bookingDetails,
    setBookingDetails,
    resetBookingDetails,
  }
})
