import React, { useContext, FC } from 'react'
import { useQuery } from '@apollo/client'
import { ActionContext } from '../contexts/ActionContext'
import { GET_ALL_DIRECTORS } from '../queries/director'
import { IDirectorList, IDirectorForm, IDirector } from '../interfaces/director'
import DirectorList from '../components/DirectorList'
import DirectorForm from '../components/DirectorForm'
import DeleteDirector from '../components/DeleteDirector'
import AddButton from '../components/AddButton'


const initialState:IDirectorForm = {
  name: '',
  age: 0
}


const Directors:FC = () => {
  const { loading, data } = useQuery<IDirectorList>(GET_ALL_DIRECTORS)
  const { openAddOrEditDirectorModal } = useContext(ActionContext)


  return (
    <div className="container" id="directorsPage">
      {loading ? <h5>LOADING...</h5> : (
        <>
          <DirectorList directors={data?.directors as IDirector[]} />
          <AddButton 
            handleOpenModal={():void => openAddOrEditDirectorModal(initialState)} 
            isHide={false}
          />
        </>
      )}


      {/* Modals */}
      <DirectorForm />
      <DeleteDirector />
    </div>
  )
}


export default Directors