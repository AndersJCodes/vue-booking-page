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
  id: string;
  destinationId: string;
  name: string;
  description: string;
  pricePerNight: number;
  rating: number;
  category: string;
  detailedDescription: string;
  image: string;
}

interface BookingQuery {
  destination?: string
  travelers?: number
  startDate?: string
  days?: number
  hotelId?: string
}

interface PriceStore {
  destinationPrice: ComputedRef<number>
  hotelPrice: ComputedRef<number>
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
