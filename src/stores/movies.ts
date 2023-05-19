import axios from 'axios'
import { defineStore } from 'pinia'

const API_URL = 'https://www.omdbapi.com/'
const API_KEY = '38473120'

interface Movie {
  imdbID: string
  Title: string
  Poster: string
  Year: string
  Genre: string
  Released: string
  Runtime: string
  Country: string
  imdbRating: string
  imdbVotes: string
  Plot: string
}

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movies: [] as Movie[],
    movie: {} as Movie,
    isLoading: false,
    totalResults: 0,
    loadingMessage: 'Please wait',
    page: 1
  }),
  actions: {
    async getAllMovies(keyword: string): Promise<void> {
      this.isLoading = true
      this.loadingMessage = 'Please wait'
      if (!keyword) {
        keyword = 'One Piece'
      }

      try {
        const { data } = await axios.get(`${API_URL}?apikey=${API_KEY}&s=${keyword}`)
        if (data.Response === 'False') {
          throw new Error(data.Error)
        }
        this.totalResults = data.totalResults
        this.movies = data.Search
        this.isLoading = false
        this.page = 1
      } catch (err) {
        this.isLoading = true
        this.loadingMessage = (err as Error).message
      }
    },
    async nextPage(page: number): Promise<void> {
      const keyword = localStorage.getItem('keyword') || 'One Piece'
      this.isLoading = true
      this.loadingMessage = 'Please wait'
      try {
        const { data } = await axios.get(`${API_URL}?apikey=${API_KEY}&s=${keyword}&page=${page}`)

        if (data.Response === 'False') {
          throw new Error(data.Error)
        }
        this.isLoading = false
        this.movies.push(...data.Search)
      } catch (error) {}
    },
    async getMovieByID(id: string): Promise<void> {
      this.isLoading = true
      try {
        const { data, status } = await axios.get(`${API_URL}?apikey=${API_KEY}&i=${id}`)
        if (status !== 200) {
          throw new Error(data.Error)
        }
        this.movie = data
        this.isLoading = false
      } catch (err) {
        console.log((err as Error).message)
      }
    }
  }
})
