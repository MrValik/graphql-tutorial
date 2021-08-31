import { useCallback, useState } from 'react'
import { TID } from '../interfaces'
import { IMovieForm } from '../interfaces/movie'
import { IDirectorForm } from '../interfaces/director'


export function useAction() {
  // Movie
  const [showAddOrEditMovieModal, setShowAddOrEditMovieModal] = useState(false)
  const [showDeleteMovieModal, setShowDeleteMovieModal] = useState(false)
  const [movieForm, setMovieForm] = useState<IMovieForm>({} as IMovieForm)
  const [movieId, setMovieId] = useState<TID>('')

  // Director
  const [showAddOrEditDirectorModal, setShowAddOrEditDirectorModal] = useState(false)
  const [showDeleteDirectorModal, setShowDeleteDirectorModal] = useState(false)
  const [directorForm, setDirectorForm] = useState<IDirectorForm>({} as IDirectorForm)
  const [directorId, setDirectorId] = useState('')


  // Movie Callbacks
  const openAddOrEditMovieModal = useCallback(data => {
    setShowAddOrEditMovieModal(true)
    setMovieForm(data)
  }, [])


  const closeAddOrEditMovieModal = useCallback(() => {
    setShowAddOrEditMovieModal(false)
    setMovieForm({} as IMovieForm)
  }, [])


  const openDeleteMovieModal = useCallback(id => {
    setShowDeleteMovieModal(true)
    setMovieId(id)
  }, [])


  const closeDeleteMovieModal = useCallback(() => {
    setShowDeleteMovieModal(false)
    setMovieId('')
  }, [])


  // Director Callbacks
  const openAddOrEditDirectorModal = useCallback(data => {
    setShowAddOrEditDirectorModal(true)
    setDirectorForm(data)
  }, [])


  const closeAddOrEditDirectorModal = useCallback(() => {
    setShowAddOrEditDirectorModal(false)
    setDirectorForm({} as IDirectorForm)
  }, [])


  const openDeleteDirectorModal = useCallback(id => {
    setShowDeleteDirectorModal(true)
    setDirectorId(id)
  }, [])


  const closeDeleteDirectorModal = useCallback(() => {
    setShowDeleteDirectorModal(false)
    setDirectorId('')
  }, [])


  return {
    showAddOrEditMovieModal, showDeleteMovieModal, movieId, movieForm,
    showAddOrEditDirectorModal, showDeleteDirectorModal, directorForm, directorId,
    openAddOrEditMovieModal, closeAddOrEditMovieModal, openDeleteMovieModal, closeDeleteMovieModal,
    openAddOrEditDirectorModal, closeAddOrEditDirectorModal, openDeleteDirectorModal, closeDeleteDirectorModal
  }
}