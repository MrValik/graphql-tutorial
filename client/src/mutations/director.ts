import { gql } from '@apollo/client'


export const ADD_DIRECTOR = gql`
  mutation (
    $name: String!
    $age: Int!
  ) {
    addDirector(
      director: {
        name: $name
        age: $age
      }
    ) {
      status
      message
    }
  }
`

export const UPDATE_DIRECTOR = gql`
  mutation (
    $id: ID!
    $name: String!
    $age: Int!
  ) {
    updateDirector(
      directorId: $id
      director: {
        name: $name
        age: $age
      }
    ) {
      status
      message
    }
  }
`

export const DELETE_DIRECTOR_BY_ID = gql`
  mutation ($id: ID!){
    deleteDirector(directorId: $id) {
      status
      message
    }
  }
`