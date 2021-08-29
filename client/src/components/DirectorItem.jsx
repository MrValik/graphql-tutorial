import React, { useContext } from 'react'
import { Dropdown } from 'react-bootstrap'
import { ActionContext } from '../contexts/ActionContext'


export default function DirectorItem({ director }) {
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
              onClick={() => openAddOrEditDirectorModal(director)}
            >
              Edit
            </Dropdown.Item>

            <Dropdown.Item 
              id="delete"
              onClick={() => openDeleteDirectorModal(id)} 
            >
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  )
}