import { defineStore } from 'pinia'
import axios from 'axios'

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

export const useFavoriteStore = defineStore('favorite', {
  state: () => {
    const favMoviesString = localStorage.getItem('favMovies')
    const favMovies = favMoviesString ? JSON.parse(favMoviesString) : []
    return {
      favMovies
    }
  },
  actions: {
    async addToFavorite(id: string): Promise<void> {
      try {
        const response = await axios.get(`${API_URL}?apikey=${API_KEY}&i=${id}`)
        const { data } = response
        const movie: Movie = {
          imdbID: data.imdbID,
          Title: data.Title,
          Poster: data.Poster,
          Year: data.Year,
          Genre: data.Genre,
          Released: data.Released,
          Runtime: data.Runtime,
          Country: data.Country,
          imdbRating: data.imdbRating,
          imdbVotes: data.imdbVotes,
          Plot: data.Plot
        }
        this.favMovies.push(movie)
        localStorage.setItem('favMovies', JSON.stringify(this.favMovies))
      } catch (err) {
        console.log(err)
      }
    },
    removeFromFavorite(id: string): void {
      this.favMovies = this.favMovies.filter((movie: Movie) => movie.imdbID !== id)
      localStorage.setItem('favMovies', JSON.stringify(this.favMovies))
    }
  }
})
