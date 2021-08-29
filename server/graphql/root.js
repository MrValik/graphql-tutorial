const Movie = require('../models/Movie')
const Director = require('../models/Director')


const mapMovies = movies => {
  return movies.map(async movie => {
    const director = await Director.findById(movie.directorId)
    return {
      ...movie._doc,
      id: movie._id,
      directorId: undefined,
      director: {
        id: director._id,
        name: director.name
      }
    }
  })
}

const mapDirectors = directors => {
  return directors.map(async director => {
    const movies = await Movie.find({ directorId: director._id })
    return {
      ...director._doc,
      id: director._id,
      movies: movies.map(movie => movie.title)
    }
  })
}


const root = {
  async movies() {
    const movies = await Movie.find()
    const result = await Promise.all(mapMovies(movies))
    return result
  },

  directors: async () => {
    const directors = await Director.find()
    const result = await Promise.all(mapDirectors(directors))
    return result
  },

  async addMovie({ movie }) {
    await Movie.create({ ...movie })
    return { status: 'success', message: 'Movie added successfully' }
  },

  async updateMovie({ movieId, movie }) {
    await Movie.findByIdAndUpdate(movieId, {
      $set: { ...movie }
    })
    
    return { status: 'success', message: 'Movie updated successfully' }
  },

  async deleteMovie({ movieId }) {
    await Movie.findByIdAndDelete(movieId)
    return { status: 'success', message: 'Movie deleted successfully' }
  },

  async addDirector({ director }) {
    await Director.create({ ...director })
    return { status: 'success', message: 'Director added successfully' }
  },

  async updateDirector({ directorId, director }) {
    await Director.findByIdAndUpdate(directorId, {
      $set: { ...director }
    })

    return { status: 'success', message: 'Director\'s details have been successfully edited' }
  },

  async deleteDirector({ directorId }) {
    await Director.findByIdAndDelete(directorId)
    await Movie.deleteMany({ directorId })
    return { status: 'success', message: 'Director deleted successfully' }
  }
}

module.exports = root