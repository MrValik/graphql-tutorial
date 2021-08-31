import { gql } from '@apollo/client'

export const GET_ALL_MOVIES = gql`
  query {
    movies {
      id
      title
      rate
      genre
      isWatched
      director {
        id
        name
      }
    }
  }
`
