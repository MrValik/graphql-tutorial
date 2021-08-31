
export interface IDirectorForm {
  id?: string | number
  name: string
  age: number
}

export interface IDirector extends IDirectorForm {
  movies: string[]
}

export interface IDirectorList {
  directors: IDirector[]
}