import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_MOVIES } from '../queries/movie'
import { ActionContext } from '../contexts/ActionContext'
import MovieList from '../components/MovieList'
import AddButton from '../components/AddButton'
import MovieForm from '../components/MovieForm'
import DeleteMovie from '../components/DeleteMovie'
import { GET_ALL_DIRECTORS } from '../queries/director'


const initialState = {
  title: '',
  rate: "1.0",
  genre: [],
  directorId: '',
  isWatched: false
}


export default function Movies() {
  const { loading, data } = useQuery(GET_ALL_MOVIES, {
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'cache-first'
  })
  const { openAddOrEditMovieModal } = useContext(ActionContext)
  const { data: directorsData } = useQuery(GET_ALL_DIRECTORS)


  return (
    <div className="container" id="moviesPage">
      {loading ? <h5>LOADING...</h5> : (
        <>
          <MovieList movies={data?.movies} />
          <AddButton 
            isHide={!directorsData?.directors?.length}
            handleOpenModal={
              directorsData?.directors?.length 
                ? () => openAddOrEditMovieModal(initialState) 
                : undefined
            }
          />
        </>
      )}

      {/* Modals */}
      <MovieForm />
      <DeleteMovie />
    </div>
  )
}
