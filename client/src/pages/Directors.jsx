import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { ActionContext } from '../contexts/ActionContext'
import { GET_ALL_DIRECTORS } from '../queries/director'
import DirectorList from '../components/DirectorList'
import DirectorForm from '../components/DirectorForm'
import DeleteDirector from '../components/DeleteDirector'
import AddButton from '../components/AddButton'


const initialState = {
  name: '',
  age: 0
}


export default function Directors() {
  const { loading, data } = useQuery(GET_ALL_DIRECTORS)
  const { openAddOrEditDirectorModal } = useContext(ActionContext)


  return (
    <div className="container" id="directorsPage">
      {loading ? <h5>LOADING...</h5> : (
        <>
          <DirectorList directors={data?.directors} />
          <AddButton 
            handleOpenModal={() => openAddOrEditDirectorModal(initialState)} 
          />
        </>
      )}


      {/* Modals */}
      <DirectorForm />
      <DeleteDirector />
    </div>
  )
}