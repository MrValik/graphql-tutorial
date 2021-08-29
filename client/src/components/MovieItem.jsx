import React, { useContext } from 'react'
import { Form, Dropdown } from 'react-bootstrap'
import { ActionContext } from '../contexts/ActionContext'

const numberFormat = num => {
  return Intl.NumberFormat('en', {
    minimumFractionDigits: 1
  }).format(num)
}


export default function MovieItem({ movie }) {
  const { title, rate, genre, director, isWatched } = movie
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
              onClick={() => openAddOrEditMovieModal({ 
                ...movie, 
                directorId: director.id,
                rate: numberFormat(movie.rate)
              })}
            >
              Edit
            </Dropdown.Item>

            <Dropdown.Item 
              id="delete" 
              onClick={() => openDeleteMovieModal(movie.id)}
            >
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  )
}