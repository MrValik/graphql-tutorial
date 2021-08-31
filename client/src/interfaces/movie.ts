
export interface IMovieForm {
  id?: string | number
  title: string
  rate: any 
  genre: string[]
  directorId?: string | number
  isWatched: boolean
}


export interface IMovie extends IMovieForm {
  director: {
    id: string | number
    name: string
  }
}


export interface IMovieList {
  movies: IMovie[]
}