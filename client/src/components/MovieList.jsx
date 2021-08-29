import React from 'react'
import { Table } from 'react-bootstrap'
import MovieItem from './MovieItem'


export default function MovieList({ movies }) {
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