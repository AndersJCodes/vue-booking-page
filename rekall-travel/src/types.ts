interface BookingDetails {
  destination: string
  travelers: number
  travelDate: string
}

interface Destination {
  id: string
  name: string
  description: string
  pricePerPerson: number
  duration: string
  departureFrom: string[]
}

export type { BookingDetails, Destination }
