import React, { useContext, FC } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_MOVIES } from '../queries/movie'
import { ActionContext } from '../contexts/ActionContext'
import { GET_ALL_DIRECTORS } from '../queries/director'
import { IMovie, IMovieForm, IMovieList } from '../interfaces/movie'
import { IDirectorList } from '../interfaces/director'
import MovieList from '../components/MovieList'
import AddButton from '../components/AddButton'
import MovieForm from '../components/MovieForm'
import DeleteMovie from '../components/DeleteMovie'


const initialState:IMovieForm = {
  title: '',
  rate: "1.0",
  genre: [],
  directorId: '',
  isWatched: false
}


const Movies:FC = () => {
  const { loading, data } = useQuery<IMovieList>(GET_ALL_MOVIES, {
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'cache-first'
  })

  const { openAddOrEditMovieModal } = useContext(ActionContext)
  const { data: directorsData } = useQuery<IDirectorList>(GET_ALL_DIRECTORS)


  return (
    <div className="container" id="moviesPage">
      {loading ? <h5>LOADING...</h5> : (
        <>
          <MovieList movies={data?.movies as IMovie[]} />
          <AddButton 
            isHide={!directorsData?.directors?.length}
            handleOpenModal={
              directorsData?.directors?.length 
                ? ():void => openAddOrEditMovieModal(initialState) 
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


export default Movies