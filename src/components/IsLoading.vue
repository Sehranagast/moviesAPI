<script setup lang="ts">
import { useMoviesStore } from '@/stores/movies'
const store = useMoviesStore()
</script>

<template>
  <div class="mt-5 flex justify-center items-center">
    <h2 class="text-gray-300 animate-pulse">{{ store.loadingMessage }} . . .</h2>
  </div>
</template>
