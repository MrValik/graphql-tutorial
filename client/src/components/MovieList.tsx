import React, { FC } from 'react'
import { Table } from 'react-bootstrap'
import { IMovieList } from '../interfaces/movie'
import MovieItem from './MovieItem'


const MovieList:FC<IMovieList> = ({ movies }) => {
  return (
    movies?.length ? (
      <Table className="shadow">
        <thead>
          <tr>
            <th>Title</th>
            <th>Rate</th>
            <th>Genre</th>
            <th>Director</th>
            <th>Watched</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {movies?.map(movie => {
            return (
              <MovieItem 
                key={movie.id} 
                movie={movie} 
              />
            )
          })}
        </tbody>
      </Table>
    ) : <h5 className="text-danger noData">No Data</h5>
  )
}


export default MovieList