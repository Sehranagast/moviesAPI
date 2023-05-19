<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Movies from '../components/Movies.vue'
import IsLoading from '../components/IsLoading.vue'
import { useFavoriteStore } from '@/stores/favorit'
import { useMoviesStore } from '@/stores/movies'

const store = useFavoriteStore()
const moviesStore = useMoviesStore()

onMounted(() => {
  if (store.favMovies.length < 1) {
    moviesStore.isLoading = true
    moviesStore.loadingMessage = 'Empty'
  }
})
</script>

<template>
  <main>
    <h3 class="text-gray-500 text-xl tracking-widest">Your Favorite Movies</h3>
    <Movies :movies="store.favMovies" />
    <IsLoading v-if="moviesStore.isLoading" />
  </main>
</template>
