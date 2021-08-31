import React, { FC } from 'react'


interface IProps {
  handleOpenModal:(() => void) | undefined,
  isHide: boolean
}


const AddButton:FC<IProps> = ({ handleOpenModal, isHide }) => {
  return (
    <button 
      className="btn shadow" 
      id="addBtn"
      onClick={handleOpenModal}
      disabled={isHide}
    >
      <i className="fas fa-plus" aria-hidden="true"></i>
    </button>
  )
}

export default AddButton