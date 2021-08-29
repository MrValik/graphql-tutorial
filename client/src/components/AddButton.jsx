import React from 'react'


export default function AddButton({ handleOpenModal, isHide }) {
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