import { createContext } from 'react'
import { TID } from '../interfaces'
import { IDirectorForm } from '../interfaces/director'
import { IMovieForm } from '../interfaces/movie'


interface IContext {
  showDeleteMovieModal: boolean
  movieId: string | number
  movieForm: IMovieForm
  directorId: string | number
  directorForm: IDirectorForm
  showAddOrEditDirectorModal: boolean
  showDeleteDirectorModal: boolean
  showAddOrEditMovieModal: boolean,
  openAddOrEditDirectorModal: (data: IDirectorForm) => void
  closeAddOrEditDirectorModal: () => void
  openDeleteDirectorModal: (id: TID) => void
  closeDeleteDirectorModal: () => void
  openAddOrEditMovieModal: (data: IMovieForm) => void
  closeAddOrEditMovieModal: () => void
  openDeleteMovieModal: (id: TID) => void
  closeDeleteMovieModal: () => void
}


export const ActionContext = createContext<IContext>({
  movieId: '',
  movieForm: {} as IMovieForm,
  directorId: '', 
  directorForm: {} as IDirectorForm,
  showAddOrEditDirectorModal: false, 
  showDeleteDirectorModal: false, 
  showAddOrEditMovieModal: false,
  showDeleteMovieModal: false,
  openAddOrEditDirectorModal() {},
  closeAddOrEditDirectorModal() {},
  openDeleteDirectorModal() {},
  closeDeleteDirectorModal() {},
  openAddOrEditMovieModal() {},
  closeAddOrEditMovieModal() {},
  openDeleteMovieModal() {},
  closeDeleteMovieModal() {}
})