import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Modal, Form } from 'react-bootstrap'
import { createType } from '../../http/deviceAPI'


function CreateType({show, onHide}) {
  const [value, setValue] = useState('')

  const addType = () => {
      createType({name: value}).then(data => {
        setValue('')
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
          Добавити тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Control 
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={"Введіть назву типа"}
            />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
        <Button variant='outline-success' onClick={addType}>Добавити</Button>
      </Modal.Footer>
    </Modal>
    </div>
  )
}

export default CreateType