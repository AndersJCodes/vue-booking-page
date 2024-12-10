// src/types/index.ts

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

// New interfaces for Blog Posts
interface BlogPost {
  id: string
  title: string
  content: string
  image: string // Include any other properties you have
}

type BlogPostList = BlogPost[] // A list of blog posts

export type { Destination, Hotel, BlogPost, BlogPostList }
