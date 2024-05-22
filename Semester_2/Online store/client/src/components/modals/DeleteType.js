import React, { useContext, useState } from 'react'
import { Button, Dropdown } from 'react-bootstrap'
import { Modal, Form } from 'react-bootstrap'
import { deleteType } from '../../http/deviceAPI'
import { Context } from '../../index'


function DeleteType({show, onHide}) {
  const {device} = useContext(Context)

  const removeType = () => {
      deleteType(device.selectedType.id).then(data => {
        onHide()
      })
  }


  return (
    <div>
    <Modal
        show={show}
        onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Видалити тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
            <Dropdown className='mt-2 mb-2'>
                <Dropdown.Toggle> {device.selectedType.name || "Виберіть тип"} </Dropdown.Toggle>
                <Dropdown.Menu>
                    {device.types.map(type =>
                    <Dropdown.Item 
                        onClick={() => device.setSelectedType(type)} 
                        key={type.id}
                    >
                        {type.name}
                    </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
        <Button variant='outline-success' onClick={removeType}>Видалити</Button>
      </Modal.Footer>
    </Modal>
    </div>
  )
}

export default DeleteType