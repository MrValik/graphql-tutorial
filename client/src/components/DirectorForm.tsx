import { useMutation } from '@apollo/client'
import React, { useContext, useEffect, useState, FC, ChangeEvent, FormEvent } from 'react'
import { Button, Form, Modal, ButtonGroup } from 'react-bootstrap'
import { ActionContext } from '../contexts/ActionContext'
import { IAlert } from '../interfaces'
import { IDirectorForm } from '../interfaces/director'
import { ADD_DIRECTOR, UPDATE_DIRECTOR } from '../mutations/director'
import { GET_ALL_DIRECTORS } from '../queries/director'


const AddDirector:FC = () => {
  const { openAddOrEditDirectorModal, closeAddOrEditDirectorModal, directorForm, showAddOrEditDirectorModal } = useContext(ActionContext)
  const [form, setForm] = useState<IDirectorForm>({} as IDirectorForm)

  const [addDirector, { loading }] = useMutation
  <
    { addDirector: IAlert },
    IDirectorForm
  >
  (ADD_DIRECTOR, {
    refetchQueries: [ GET_ALL_DIRECTORS ]
  })

  const [updateDirector] = useMutation
  <
    { updateDirector: IAlert },
    IDirectorForm
  >
  (UPDATE_DIRECTOR, {
    refetchQueries: [ GET_ALL_DIRECTORS ]
  })

  
  useEffect(():void => {
    setForm(directorForm)
  }, [directorForm])


  const handleChange = (e:ChangeEvent<HTMLInputElement>):void => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }


  const handleSubmit = (e:FormEvent<HTMLFormElement>):void => {
    e.preventDefault()

    addDirector({ variables: { ...form, age: +form.age }})
    closeAddOrEditDirectorModal()
  }


  const handleUpdate = (e:FormEvent<HTMLFormElement>):void => {
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
      onHide={():void => openAddOrEditDirectorModal(directorForm)}
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


export default AddDirector