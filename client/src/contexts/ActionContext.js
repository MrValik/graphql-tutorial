import { createContext } from 'react'


export const ActionContext = createContext({
  showMovieFormModal: false,
  showDeleteMovieModal: false,
  movieId: '', movieForm: {},
  directorId: '', directorForm: {},
  showAddOrEditDirectorModal: false, 
  showDeleteDirectorModal: false, 
  openAddOrEditDirectorModal() {},
  closeAddOrEditDirectorModal() {},
  openDeleteDirectorModal() {},
  closeDeleteDirectorModal() {},
  openMovieFormModal() {},
  closeMovieFormModal() {},
  openDeleteMovieModal() {},
  closeDeleteMovieModal() {}
})