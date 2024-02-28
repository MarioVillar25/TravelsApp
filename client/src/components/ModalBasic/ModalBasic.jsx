import React from 'react'
import {Button, Modal, Form} from "react-bootstrap"

export const ModalBasic = ({show, HandleClose, children, title}) => {

  


  return (
    <Modal show={show} onHide={HandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      
      </Modal>
  )
}
