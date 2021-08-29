import { useMutation } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Modal, ButtonGroup } from 'react-bootstrap'
import { ActionContext } from '../contexts/ActionContext'
import { ADD_DIRECTOR, UPDATE_DIRECTOR } from '../mutations/director'
import { GET_ALL_DIRECTORS } from '../queries/director'


export default function AddDirector() {
  const { openAddOrEditDirectorModal, closeAddOrEditDirectorModal, directorForm, showAddOrEditDirectorModal } = useContext(ActionContext)
  const [form, setForm] = useState(directorForm)

  const [addDirector, { loading }] = useMutation(ADD_DIRECTOR, {
    refetchQueries: [ GET_ALL_DIRECTORS ]
  })

  const [updateDirector] = useMutation(UPDATE_DIRECTOR, {
    refetchQueries: [ GET_ALL_DIRECTORS ]
  })

  
  useEffect(() => {
    setForm(directorForm)
  }, [directorForm])


  const handleChange = e => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }


  const handleSubmit = e => {
    e.preventDefault()

    const data = {
      ...form,
      age: +form.age
    }

    addDirector({ variables: { ...data }})
    closeAddOrEditDirectorModal()
  }


  const handleUpdate = e => {
    e.preventDefault()

    const data = {
      ...form,
      id: directorForm.id,
      age: +form.age,
      movies: undefined
    }

    updateDirector({ variables: { ...data }})
    closeAddOrEditDirectorModal()
  }


  return (
    <Modal 
      show={showAddOrEditDirectorModal} 
      onHide={() => openAddOrEditDirectorModal(directorForm)}
    >
      <Modal.Body>
        <Form 
          id="addDirector"
          className="w-100"
          onSubmit={directorForm?.name ? handleUpdate : handleSubmit}
        >
          <Form.Group>
            <Form.Label>Director Name</Form.Label>
            <Form.Control 
              type="text" 
              name="name"
              value={form?.name || ''}
              onChange={handleChange}
              placeholder="Enter name"
              disabled={loading}
              required
            />
          </Form.Group>
          
          <Form.Group>
            <Form.Label>Director Age</Form.Label>
            <Form.Control 
              type="number" 
              name="age"
              value={form?.age || ''}
              onChange={handleChange}
              placeholder="Enter age"
              disabled={loading}
              required
            />
          </Form.Group>  

          <ButtonGroup>
            <Button 
              variant="danger" 
              type="button"
              onClick={closeAddOrEditDirectorModal}
            >
              Cancel
            </Button>  
            
              <Button 
                variant="primary" 
                type="submit"
              >
                {directorForm?.name ? 'Update' : 'Add Director'}
              </Button>
          </ButtonGroup>
        </Form>
      </Modal.Body>
    </Modal>
  )
}