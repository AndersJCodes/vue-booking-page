// src/types/index.ts

interface BookingDetails {
  destination: string
  travelers: number
  travelDate: string
  numberOfDays: number
}

interface Destination {
  id: string
  name: string
  description: string
  pricePerPerson: number
  duration: string
  departureFrom: string[]
}

interface Hotel {
  id: string
  destinationId: string
  name: string
  description: string
  pricePerNight: number
  rating: number
}

export type { BookingDetails, Destination, Hotel }
