<script setup lang="ts">
import { defineProps, ref, watchEffect, onMounted } from 'vue'
import Header from '../components/Header.vue'
import Movies from '../components/Movies.vue'
import IsLoading from '../components/IsLoading.vue'
import CalendarIcon from '../components/icons/CalendarIcon.vue'
import TimeIcon from '../components/icons/TimeIcon.vue'
import HeartIcon from '../components/icons/HeartIcon.vue'
import LocationIcon from '../components/icons/LocationIcon.vue'
import StartIcon from '@/components/icons/StartIcon.vue'
import { useMoviesStore } from '@/stores/movies'
import { useFavoriteStore } from '@/stores/favorit'

const props = defineProps({
  id: String
})

const favStore = useFavoriteStore()
const moviesStore = useMoviesStore()
const films = ref<(typeof Movies)[]>([])

watchEffect(() => {
  if (props.id) {
    films.value = moviesStore.movies.filter((movie) => movie.imdbID !== props.id)
    moviesStore.getMovieByID(props.id)
  }
})

onMounted(() => {
  if (props.id) {
    moviesStore.getMovieByID(props.id)
  }
})

const toggleFav = (id: string, e: MouseEvent | Event) => {
  const cek = favStore.favMovies.filter((movie: { imdbID: string }) => movie.imdbID === id)
  if (cek.length > 0) {
    favStore.removeFromFavorite(id)
    if (e.target && 'classList' in e.target) {
      ;(e.target as HTMLElement).classList.remove('text-red-600')
    }
  } else {
    favStore.addToFavorite(id)
    if (e.target && 'classList' in e.target) {
      ;(e.target as HTMLElement).classList.add('text-red-600')
    }
  }
}

const handleTextFav = (imdbID: string) => {
  const cek = favStore.favMovies.filter((movie: { imdbID: string }) => movie.imdbID === imdbID)
  return cek.length ? 'Remove from Favorite' : 'Add to Favorite'
}

const getClass = (imdbID: string) => {
  const cek = favStore.favMovies.filter((movie: { imdbID: string }) => movie.imdbID === imdbID)
  return cek.length ? 'text-red-600' : 'text-gray-300'
}
</script>

<template>
  <main>
    <IsLoading v-if="moviesStore.isLoading" />
    <article class="lg:flex lg:gap-5 lg:justify-between lg:items-center">
      <div class="w-full h-64 rounded-md overflow-hidden md:h-80 lg:w-6/12 lg:h-96">
        <img
          :src="moviesStore.movie.Poster"
          class="w-full h-full object-cover"
          :alt="moviesStore.movie.Title"
        />
      </div>
      <div class="my-5 lg:w-5/12 lg:mt-0">
        <p class="text-gray-400 font-light text-xs mt-2 tracking-wider md:text-sm">
          {{ moviesStore.movie.Genre }}
        </p>

        <h3 class="my-8 font-medium text-lg text-gray-200 tracking-wider md:text-2xl">
          {{ moviesStore.movie.Title }}
        </h3>
        <div class="flex justify-between items-center flex-wrap gap-2 md:justify-start md:gap-14">
          <div class="flex items-center text-gray-400 font-light text-sm">
            <CalendarIcon />
            {{ moviesStore.movie.Released }}
          </div>

          <div class="flex items-center text-gray-400 font-light text-sm">
            <TimeIcon />
            {{ moviesStore.movie.Runtime }}
          </div>

          <div class="flex items-center text-gray-400 font-light text-sm">
            <LocationIcon />
            {{ moviesStore.movie.Country }}
          </div>
        </div>
        <div class="flex items-center text-gray-400 font-light text-sm my-8">
          <StarIcon />
          {{ moviesStore.movie.imdbRating }} - {{ moviesStore.movie.imdbVotes }} Votes
        </div>

        <p class="text-gray-300 text-justify tracking-wider text-sm font-light md:tracking-widest">
          {{ moviesStore.movie.Plot }}
        </p>

        <button
          @click="toggleFav(moviesStore.movie.imdbID, $event)"
          class="flex items-center mt-8 cursor-pointer"
          :class="getClass(moviesStore.movie.imdbID)"
        >
          <HeartIcon />
          <span class="text-sm tracking-wide">
            {{ handleTextFav(moviesStore.movie.imdbID) }}
          </span>
        </button>
      </div>
    </article>
    <hr class="mt-24 mb-16 opacity-10" />
    <div>
      <h3 class="text-gray-300 text-sm md:text-lg">You might also like . . . . .</h3>
      <Movies :movies="films" />
    </div>
  </main>
</template>

<style></style>
