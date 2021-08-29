import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './Routes'
import Navbar from './components/Navbar'
import { useAction } from './hooks/useAction'
import { ActionContext } from './contexts/ActionContext'


function App() {
  const { 
    movieId, showAddOrEditMovieModal, showDeleteMovieModal, movieForm,
    openAddOrEditMovieModal, openDeleteMovieModal, closeAddOrEditMovieModal, closeDeleteMovieModal,
    directorId, showAddOrEditDirectorModal, showDeleteDirectorModal, directorForm,
    openAddOrEditDirectorModal, closeAddOrEditDirectorModal, openDeleteDirectorModal, closeDeleteDirectorModal
  } = useAction()


  return (
    <ActionContext.Provider 
      value={{
        movieId, showAddOrEditMovieModal, showDeleteMovieModal, movieForm,
        openAddOrEditMovieModal, openDeleteMovieModal, closeAddOrEditMovieModal, closeDeleteMovieModal,
        directorId, showAddOrEditDirectorModal, showDeleteDirectorModal, directorForm,
        openAddOrEditDirectorModal, closeAddOrEditDirectorModal, openDeleteDirectorModal, closeDeleteDirectorModal
      }}
    >
      <Router>
        <Navbar />
        <Routes />
      </Router>
    </ActionContext.Provider>
  )
}

export default App
