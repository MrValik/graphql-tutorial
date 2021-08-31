import { gql } from '@apollo/client'


export const ADD_MOVIE = gql`
  mutation (
    $title: String!
    $rate: Float!
    $genre: [String!]!
    $directorId: ID!
    $isWatched: Boolean
  ) {
    alert: addMovie(
      movie: {
        title: $title
        rate: $rate
        genre: $genre
        directorId: $directorId
        isWatched: $isWatched
      }
    ) {
      status
      message
    }
  }
`

export const UPDATE_MOVIE = gql`
  mutation (
    $id: ID!
    $title: String!
    $rate: Float!
    $genre: [String!]!
    $directorId: ID!
    $isWatched: Boolean
  ) {
    updateMovie(
      movieId: $id
      movie: {
        title: $title
        rate: $rate
        genre: $genre
        directorId: $directorId
        isWatched: $isWatched
      }
    ) {
      status
      message
    }
  }
`


export const DELETE_MOVIE_BY_ID = gql`
  mutation ($id: ID!) {
    deleteMovie(movieId: $id) {
      status
      message
    }
  }
`