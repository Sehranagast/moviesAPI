<script setup lang="ts">
import { ref } from 'vue'
import { defineProps } from 'vue'
import { RouterLink } from 'vue-router'
import CalendarIcon from './icons/CalendarIcon.vue'
import HeartIcon from './icons/HeartIcon.vue'
import { useFavoriteStore } from '@/stores/favorit'

const store = useFavoriteStore()

const props = defineProps({
  movie: Object as () => any
})

const title = ref(props.movie.Title.substr(0, 15) + '...')

const toggleFav = (id: string, e: MouseEvent) => {
  const cek = store.favMovies.filter((movie: any) => movie.imdbID == id)
  if (cek.length > 0) {
    store.removeFromFavorite(id)
    if (e.target instanceof HTMLElement) {
      e.target.classList.remove('text-red-600')
    }
  } else {
    store.addToFavorite(id)
    if (e.target instanceof HTMLElement) {
      e.target.classList.add('text-red-600')
    }
  }
}

const isFav = (imdbID: string) => {
  if (store.favMovies) {
    const result = store.favMovies.filter((movie: any) => movie.imdbID == imdbID)
    return result.length > 0
  }
}
</script>

<template>
  <div class="w-full h-48 rounded-md overflow-hidden bg-gray-50 lg:h-64">
    <RouterLink :to="{ name: 'Details', params: { id: movie.imdbID } }" class="w-full h-full">
      <div v-if="movie.Poster !== 'N/A'" class="w-full h-full">
        <img
          :src="movie.Poster"
          class="w-full h-full aspect-auto md:object-cover lg:aspect-auto"
          :alt="movie.Title"
        />
      </div>
      <div v-else>
        <img src="../assets/no-image.png" class="w-full h-full object-cover" :alt="movie.Title" />
      </div>
    </RouterLink>
  </div>

  <div class="mt-4 w-full">
    <div class="text-red-200 flex items-center justify-between">
      <RouterLink :to="{ name: 'Details', params: { id: movie.imdbID } }">
        <h3 class="font-medium text-md tracking-wide" :title="movie.Title">
          {{ title }}
        </h3>
      </RouterLink>

      <button class="cursor-pointer" @click="toggleFav(movie.imdbID, $event)">
        <HeartIcon :class="{ 'text-red-600': isFav(movie.imdbID) }" />
      </button>
    </div>
    <div class="text-gray-200 flex mt-3 items-center font-medium text-sm">
      <CalendarIcon />

      {{ movie.Year }}
    </div>
  </div>
</template>
