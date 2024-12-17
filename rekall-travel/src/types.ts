// src/types/index.ts
import type { ComputedRef } from 'vue'

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
  category: string
  detailedDescription: string
  image: string
}

interface BookingQuery {
  destination: string
  destinationName?: string
  travelers: number
  adults?: number
  children?: number
  seniors?: number
  startDate: string
  days?: number
  hotelId?: string
  hotelName?: string
  hotelPrice?: number
  excursionId?: string
  excursionName?: string
  excursionPrice?: number
}

interface PriceStore {
  destinationPrice: ComputedRef<number>
  hotelPrice: ComputedRef<number>
  excursionPrice: ComputedRef<number>
  addExcursion: (excursion: { id: string; price: number }) => void
  removeExcursion: (excursionId: string) => void
  totalPrice: ComputedRef<number>
}

// New interfaces for Blog Posts
interface BlogPost {
  id: string
  title: string
  content: string
  image: string // Include any other properties you have
}

type BlogPostList = BlogPost[] // A list of blog posts

export type { Destination, Hotel, BlogPost, BlogPostList, BookingQuery, PriceStore }
