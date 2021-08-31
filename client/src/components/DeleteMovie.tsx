import { useMutation } from '@apollo/client'
import React, { useContext, FC } from 'react'
import { Modal } from 'react-bootstrap'
import { ActionContext } from '../contexts/ActionContext'
import { DELETE_MOVIE_BY_ID } from '../mutations/movie'
import { GET_ALL_MOVIES } from '../queries/movie'
import { GET_ALL_DIRECTORS } from '../queries/director'
import { IAlert, TID } from '../interfaces'


const DeleteMovie:FC = () => {
  const { movieId, showDeleteMovieModal, openDeleteMovieModal, closeDeleteMovieModal } = useContext(ActionContext)
  const [deleteMovie] = useMutation
  <
    { deleteMovie: IAlert },
    { id: TID }
  >
  (DELETE_MOVIE_BY_ID, {
    refetchQueries: [ GET_ALL_MOVIES, GET_ALL_DIRECTORS ],
    variables: { id: movieId }
  })


  const handleDeleteMovie = ():void => {
    deleteMovie()
    closeDeleteMovieModal()
  }


  return (
    <Modal 
      show={showDeleteMovieModal} 
      onHide={():void => openDeleteMovieModal(movieId)} 
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


export default DeleteMovie