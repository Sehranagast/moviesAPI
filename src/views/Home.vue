<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Movies from '../components/Movies.vue'
import Search from '../components/Search.vue'
import IsLoading from '../components/IsLoading.vue'
import { useMoviesStore } from '@/stores/movies'

const store = useMoviesStore()

const keyword = ref(localStorage.getItem('keyword') || 'One Piece')
const scrollComponent = ref<HTMLElement | null>(null)
const favMovies = ref(JSON.parse(localStorage.getItem('favMovies') || '[]'))

let totalPage = 0
setTimeout(() => {
  totalPage = Math.ceil(store.totalResults / 10)
}, 1000)

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  store.getAllMovies(keyword.value)
})

const handleScroll = () => {
  const element = scrollComponent.value
  if (element) {
    if (element.getBoundingClientRect().bottom < window.innerHeight) {
      store.page++
      if (store.page <= totalPage) {
        store.nextPage(store.page)
      }
    }
  }
}
</script>

<template>
  <main>
    <Search />

    <article ref="scrollComponent">
      <Movies :movies="store.movies" />
    </article>
    <IsLoading v-if="store.isLoading" />
  </main>
</template>
