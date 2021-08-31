import React, { useContext, FC } from 'react'
import { Form, Dropdown } from 'react-bootstrap'
import { ActionContext } from '../contexts/ActionContext'
import { TID } from '../interfaces'
import { IMovie } from '../interfaces/movie'


interface IProps {
  movie: IMovie
}

const numberFormat = (num:number):string => {
  return Intl.NumberFormat('en', {
    minimumFractionDigits: 1
  }).format(num)
}


const MovieItem:FC<IProps> = ({ movie }) => {
  const { id, title, rate, genre, director, isWatched } = movie
  const { openAddOrEditMovieModal, openDeleteMovieModal } = useContext(ActionContext)


  return (
    <tr>
      <td>{title}</td>
      <td>{numberFormat(rate)}</td>
      <td>{genre?.join(', ')}</td>
      <td>{director?.name}</td>
      <td>
        <Form.Check 
          checked={isWatched}
          readOnly
        />
      </td>
      <td>
        <Dropdown>
          <Dropdown.Toggle id="settings" variant="light">
            <i className="fas fa-ellipsis-v" aria-hidden="true"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item 
              id="edit" 
              onClick={():void => openAddOrEditMovieModal({ 
                ...movie, 
                directorId: director.id,
                rate: numberFormat(movie.rate)
              })}
            >
              Edit
            </Dropdown.Item>

            <Dropdown.Item 
              id="delete" 
              onClick={():void => openDeleteMovieModal(id as TID)}
            >
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  )
}


export default MovieItem