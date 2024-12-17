<template>
  <div class="destinations-view">
    <h1>Explore Our Destinations</h1>
    <nav class="secondary-navbar">
      <router-link to="/destinations/mars" class="nav-link">Mars</router-link>
      <router-link to="/destinations/venus" class="nav-link">Venus</router-link>
      <router-link to="/destinations/sun" class="nav-link">The Sun</router-link>
    </nav>
    <DestinationsStart v-if="!isDestinationSelected" />
    <router-view v-else />
    <section v-if="isDestinationSelected" class="hotel-section">
      <h2>Available Hotels</h2>
      <div class="hotel-list">
        <HotelCard v-for="hotel in filteredHotels" :key="hotel.id" :hotel="hotel" />
      </div>
    </section>
    <section v-if="isDestinationSelected" class="experiences-section">
      <h2>Experiences</h2>

      <ul class="comments-list">
        <li v-for="(comment, index) in comments" :key="index">
          <div>
            <p class="comment-name">{{ comment.name }}</p>
            <p>{{ comment.text }}</p>
          </div>
          <button @click="deleteComment(index)">x</button>
        </li>
      </ul>

      <form @submit.prevent="addComment" class="comment-form">
        <input v-model="userName" type="text" placeholder="Your Name" required />
        <textarea
          v-model="newComment"
          placeholder="Leave your comment about this destination"
          rows="3"
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </section>
  </div>
</template>

<script lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import DestinationsStart from '@/components/DestinationsStart.vue'
import HotelCard from '@/components/HotelCard.vue' // Import the HotelCard component
import hotelsData from '@/db/hotels.json'

export default {
  components: {
    DestinationsStart,
    HotelCard,
  },
  setup() {
    const route = useRoute()

    // Проверяем, выбрано ли направление
    /*const isDestinationSelected = computed(() => {
        return (
          route.path.includes('/destinations/mars') ||
          route.path.includes('/destinations/venus') ||
          route.path.includes('/destinations/sun')
        )
      })*/
    // Определение текущего направления
    const currentDestination = computed(() => {
      if (route.path.includes('/destinations/mars')) return 'mars'
      if (route.path.includes('/destinations/venus')) return 'venus'
      if (route.path.includes('/destinations/sun')) return 'sun'
      return null
    })

    // Проверяем, выбрано ли направление
    const isDestinationSelected = computed(() => currentDestination.value !== null)
    // Computed property to filter hotels based on the selected destination
    const filteredHotels = computed(() => {
      if (route.path.includes('/destinations/mars')) {
        return hotelsData.filter((hotel) => hotel.destinationId === 'mars_colony')
      } else if (route.path.includes('/destinations/venus')) {
        return hotelsData.filter((hotel) => hotel.destinationId === 'venus_cloud_city')
      } else if (route.path.includes('/destinations/sun')) {
        return hotelsData.filter((hotel) => hotel.destinationId === 'solar_farewell')
      }
      return []
    })

    const comments = ref<{ name: string; text: string }[]>([])
    const newComment = ref<string>('')
    const userName = ref<string>('')

    const loadComments = () => {
      if (currentDestination.value) {
        const savedComments = localStorage.getItem(`comments_${currentDestination.value}`)
        comments.value = savedComments ? JSON.parse(savedComments) : []
      }
    }

    const saveComments = () => {
      if (currentDestination.value) {
        localStorage.setItem(`comments_${currentDestination.value}`, JSON.stringify(comments.value))
      }
    }

    const addComment = () => {
      if (newComment.value.trim() && userName.value.trim()) {
        comments.value.push({
          name: userName.value.trim(),
          text: newComment.value.trim(),
        })
        ;(newComment.value = ''), (userName.value = ''), saveComments()
      }
    }

    // Удаление комментария
    const deleteComment = (index: number) => {
      comments.value.splice(index, 1), saveComments()
    }
    watch(currentDestination, () => {
      loadComments()
    })

    loadComments()

    return {
      isDestinationSelected,
      comments,
      newComment,
      userName,
      addComment,
      deleteComment,
      filteredHotels,
      currentDestination,
    }
  },
}
</script>

<style scoped>
.destinations-view {
  padding: 20px;
}

h1 {
  color: #333;
  text-align: center;
}

.destinations {
  display: flex;
  justify-content: center;
  align-items: center;
}

.destinations-text {
  font-size: 1.1rem;
  margin-bottom: 20px;
  color: #f3eded;
}

.secondary-navbar {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #007bff;
  font-size: 1.2rem;
  margin-right: 15px;
}

.nav-link:hover {
  text-decoration: underline;
}
.hotel-section,
.blog-section,
.experiences-section {
  margin-top: 2rem;
  padding: 2rem;
  background-color: #dddddd74;
  color: black;
  border-radius: 20px;
}

.hotel-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.comments-list {
  list-style: none;
  padding: 0;
  margin: 20px 0;
}

.comments-list li {
  margin-bottom: 10px;
  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}

.comments-list button {
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.comments-list button:hover {
  background-color: #d9363e;
}

.comment-form {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.comment-form input,
.comment-form textarea {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.comment-form textarea {
  resize: none;
}

.comment-form button {
  align-self: flex-end;
  padding: 8px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.comment-form button:hover {
  background-color: #0056b3;
}
.comment-name {
  font-weight: bold;
}
</style>
