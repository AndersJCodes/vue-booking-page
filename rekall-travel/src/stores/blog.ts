import { defineStore } from 'pinia'

export const useBlogStore = defineStore('blog', {
  state: () => ({
    blogPosts: [] as { id: string; title: string; content: string; image: string }[],
  }),
  actions: {
    async fetchBlogPosts() {
      if (this.blogPosts.length) return // Prevent refetching
      try {
        const response = await fetch('/src/db/blogPosts.json')
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts')
        }
        this.blogPosts = await response.json()
        console.log('Fetched blog posts:', this.blogPosts) // Log fetched posts
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      }
    },
  },
  getters: {
    getBlogPostById: (state) => (id: string) => {
      const normalizedId = id.replace('-', '_') // Normalize ID format
      const post = state.blogPosts.find((post) => post.id === normalizedId)
      return post
    },
  },
})
