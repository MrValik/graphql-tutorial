import { useMutation } from '@apollo/client'
import React, { useContext } from 'react'
import { Modal } from 'react-bootstrap'
import { ActionContext } from '../contexts/ActionContext'
import { DELETE_MOVIE_BY_ID } from '../mutations/movie'
import { GET_ALL_MOVIES } from '../queries/movie'
import { GET_ALL_DIRECTORS } from '../queries/director'


export default function DeleteMovie() {
  const { movieId, showDeleteMovieModal, openDeleteMovieModal, closeDeleteMovieModal } = useContext(ActionContext)
  const [deleteMovie] = useMutation(DELETE_MOVIE_BY_ID, {
    refetchQueries: [ GET_ALL_MOVIES, GET_ALL_DIRECTORS ],
    variables: { id: movieId }
  })


  const handleDeleteMovie = () => {
    deleteMovie()
    closeDeleteMovieModal()
  }


  return (
    <Modal 
      show={showDeleteMovieModal} 
      onHide={() => openDeleteMovieModal(movieId)} 
      id="deleteMovieModal"
    >
      <Modal.Body>
        <h4 className="text-center">Do you want delete this movie?</h4>
        
        <br/>
        
        <div className="btn-group">
          <button 
            className="btn btn-danger"
            onClick={closeDeleteMovieModal}
          >
            Cancel
          </button>

          <button 
            className="btn btn-success"
            onClick={handleDeleteMovie}
          >
            Confirm
          </button>
        </div>
      </Modal.Body>
    </Modal>
  )
}