import React, { useContext, FC } from 'react'
import { Dropdown } from 'react-bootstrap'
import { ActionContext } from '../contexts/ActionContext'
import { TID } from '../interfaces'
import { IDirector } from '../interfaces/director'


interface IProps {
  director: IDirector
}


const DirectorItem:FC<IProps> = ({ director }) => {
  const { id, name, age, movies } = director
  const { openAddOrEditDirectorModal, openDeleteDirectorModal } = useContext(ActionContext)


  return (
    <tr>
      <td>{name}</td>
      <td>{age}</td>
      <td>{movies?.length ? movies.join(', ') : "---"}</td>
      <td>
        <Dropdown>
          <Dropdown.Toggle id="settings" variant="light">
            <i className="fas fa-ellipsis-v" aria-hidden="true"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item 
              id="edit" 
              onClick={():void => openAddOrEditDirectorModal(director)}
            >
              Edit
            </Dropdown.Item>

            <Dropdown.Item 
              id="delete"
              onClick={():void => openDeleteDirectorModal(id as TID)} 
            >
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  )
}


export default DirectorItem