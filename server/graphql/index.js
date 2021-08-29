const { 
  GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt,
  GraphQLBoolean, GraphQLFloat, GraphQLNonNull, GraphQLList, 
  GraphQLSchema 
} = require('graphql')


// Models
const Movie = require('../models/Movie')
const Director = require('../models/Director')


// Types

const AlertType = new GraphQLObjectType({
  name: "Alert",
  fields: () => ({
    status: { type: GraphQLString },
    message: { type: GraphQLString }
  })
})


const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    rate: { type: GraphQLFloat },
    genre: { type: new GraphQLList(GraphQLString) },
    isWatched: { type: GraphQLBoolean },
    director: {
      type: MovieDirectorType,
      async resolve({ directorId }) {
        const director = await Director.findById(directorId)
        return director
      }
    }
  })
})


const MovieDirectorType = new GraphQLObjectType({
  name: 'MovieDirector',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  })
})


const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(GraphQLString),
      async resolve({ id }) {
        const movies = await Movie.find({ directorId: id })
        const mapMovies = movies.map(movie => movie.title)
        return mapMovies
      }
    }
  })
})


// Query

const Query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    movies: {
      type: new GraphQLList(MovieType),
      async resolve() {
        const movies = await Movie.find()
        return movies
      }
    },
    directors: {
      type: new GraphQLList(DirectorType),
      async resolve() {
        const directors = await Director.find()
        return directors
      }
    }
  }
})


// Mutation

const Mutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    addMovie: {
      type: AlertType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString)},
        rate: { type: new GraphQLNonNull(GraphQLFloat)},
        genre: { type: new GraphQLNonNull(GraphQLList(new GraphQLNonNull(GraphQLString)))},
        directorId: { type: new GraphQLNonNull(GraphQLID)},
        isWatched: { type: GraphQLBoolean}
      },
      async resolve(parent, args) {
        await Movie.create({ ...args })
        return { status: 'success', message: 'Movie added successfully' }
      }
    },

    updateMovie: {
      type: AlertType,
      args: {
        movieId: { type: GraphQLNonNull(GraphQLID)},
        title: { type: new GraphQLNonNull(GraphQLString)},
        rate: { type: new GraphQLNonNull(GraphQLFloat)},
        genre: { type: new GraphQLNonNull(GraphQLList(new GraphQLNonNull(GraphQLString)))},
        directorId: { type: new GraphQLNonNull(GraphQLID)},
        isWatched: { type: GraphQLBoolean}
      },
      async resolve(parent, args) {
        await Movie.findByIdAndUpdate(args.movieId, {
          $set: { 
            ...args,
            movieId: undefined
          }
        })

        return { status: 'success', message: 'Movie data updated successfully' }
      }
    },

    deleteMovie: {
      type: AlertType,
      args: {
        movieId: { type: GraphQLNonNull(GraphQLID)}
      },
      async resolve(parent, { movieId }){
        await Movie.findByIdAndDelete(movieId)
        return { status: 'success', message: 'Movie deleted successfully' }
      }
    },

    addDirector: {
      type: AlertType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString)},
        age: { type: new GraphQLNonNull(GraphQLInt)}
      },
      async resolve(parent, args) {
        await Director.create({ ...args })
        return { status: 'success', message: 'Director added successfully' }
      }
    },

    updateDirector: {
      type: AlertType,
      args: {
        directorId: { type: new GraphQLNonNull(GraphQLID)},
        name: { type: new GraphQLNonNull(GraphQLString)},
        age: { type: new GraphQLNonNull(GraphQLInt)}
      },
      async resolve(parent, { directorId, name, age }) {
        await Director.findByIdAndUpdate(directorId, {
          $set: { name, age }
        })
        return { status: 'success', message: 'Director data updated successfully' }
      }
    },

    deleteDirector: {
      type: AlertType,
      args: {
        directorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      async resolve(parent, { directorId }) {
        await Director.findByIdAndDelete(directorId)
        await Movie.deleteMany({ directorId })
        return { status: 'success', message: 'Director deleted successfully' }
      }
    }
  }
})


const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
})


module.exports = schema