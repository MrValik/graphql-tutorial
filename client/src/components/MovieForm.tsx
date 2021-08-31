import { useMutation, useQuery } from '@apollo/client'
import React, { FC, ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { Button, Form, Modal, ButtonGroup } from 'react-bootstrap'
import { ActionContext } from '../contexts/ActionContext'
import { IAlert } from '../interfaces'
import { IDirectorList } from '../interfaces/director'
import { IMovieForm } from '../interfaces/movie'
import { ADD_MOVIE, UPDATE_MOVIE } from '../mutations/movie'
import { GET_ALL_DIRECTORS } from '../queries/director'
import { GET_ALL_MOVIES } from '../queries/movie'


const genres = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
  'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery',
  'Romance', 'Science Fiction', 'TV Show', 'Thriller', 'War', 'Western'
]


const AddMovie:FC = () => {
  const { openAddOrEditMovieModal, closeAddOrEditMovieModal, movieForm, showAddOrEditMovieModal } = useContext(ActionContext)
  const { data: directorData } = useQuery<IDirectorList>(GET_ALL_DIRECTORS)
  const [form, setForm] = useState<IMovieForm>(movieForm)

  const [addMovie, { loading }] = useMutation
  <
    { addMovie: IAlert },
    IMovieForm
  >
  (ADD_MOVIE, {
    refetchQueries: [ GET_ALL_MOVIES, GET_ALL_DIRECTORS ]
  })

  const [updateMovie] = useMutation
  <
    { updateMovie: IAlert },
    IMovieForm
  >
  (UPDATE_MOVIE, {
    refetchQueries: [ GET_ALL_MOVIES, GET_ALL_DIRECTORS ]
  })

  
  useEffect(():void => {
    setForm(movieForm)
  }, [movieForm])


  const handleChange = (e:ChangeEvent<HTMLInputElement>):void => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }


  const handleSelectGenre = (e:ChangeEvent<HTMLSelectElement>):void => {
    let selectedGenres = []

    selectedGenres = form?.genre.includes(e.target.value) 
      ? form?.genre.filter(genre => genre !== e.target.value)
      : form?.genre.concat(e.target.value)

    setForm({
      ...form,
      genre: selectedGenres
    })
  }


  const handleChangeRate = (e:ChangeEvent<HTMLInputElement | any>):void => setForm({ ...form, rate: (e.target.value / 10).toFixed(1) })

  const handleCheck = (e:ChangeEvent<HTMLInputElement>):void => setForm({ ...form, isWatched: e.target.checked })


  const handleSubmit = (e:FormEvent<HTMLFormElement>):void => {
    e.preventDefault()

    const data = {
      ...form,
      rate: +form.rate
    }

    addMovie({ variables: { ...data }})
    closeAddOrEditMovieModal()
  }


  const handleUpdate = (e:FormEvent<HTMLFormElement>):void => {
    e.preventDefault()

    const data = {
      ...form,
      id: movieForm.id,
      rate: +form.rate
    }

    updateMovie({ variables: { ...data }})
    closeAddOrEditMovieModal()
  }


  return (
    <Modal 
      show={showAddOrEditMovieModal} 
      onHide={():void => openAddOrEditMovieModal(movieForm)}
    >
      <Modal.Body>
        <Form 
          id="addMovie"
          className="w-100"
          onSubmit={movieForm?.title ? handleUpdate : handleSubmit}
        >
          <Form.Group className="top">
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control 
                type="text" 
                name="title"
                value={form?.title || ''}
                onChange={handleChange}
                placeholder="Enter movie title" 
                disabled={loading}
                required
              />
            </Form.Group>
            
            <Form.Group>
              <Form.Label>Rate: {form?.rate}</Form.Label>
              <Form.Control 
                custom 
                type="range" 
                min="10"
                value={(form?.rate && form.rate * 10) || 10}
                onChange={handleChangeRate}
                required
              />
            </Form.Group>    
          </Form.Group>

          <Form.Group>
            <Form.Label>Director</Form.Label>

            <Form.Control
              as="select"
              name="directorId"
              value={form?.directorId || ''}
              onChange={handleChange}
              disabled={loading}
              required
            >
              <option className="d-none" value="">Select director</option>
              {directorData?.directors?.map(({ id, name }) => {
                return <option key={id} value={id}>{name}</option>
              })}
            </Form.Control>
          </Form.Group>
           

          <Form.Group>
            <Form.Label>Genre</Form.Label>

            <Form.Control 
              id="genres"
              as="select"
              className="custom-select"
              multiple
              value={form?.genre || []}
              onChange={handleSelectGenre}
              disabled={loading}
              required
            >
              {genres?.map((genre, idx) => {
                return <option key={idx} value={genre}>{genre}</option>
              })}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Check 
              type="checkbox" 
              label="Watched"
              checked={form?.isWatched || false}
              onChange={handleCheck}
            />
          </Form.Group>

          <ButtonGroup>
            <Button 
              variant="danger" 
              type="button"
              onClick={closeAddOrEditMovieModal}
            >
              Cancel
            </Button>  
            
              <Button 
                variant="primary" 
                type="submit"
              >
                {movieForm?.title ? 'Update' : 'Add Movie'}
              </Button>
          </ButtonGroup>
        </Form>
      </Modal.Body>
    </Modal>
  )
}


export default AddMovie