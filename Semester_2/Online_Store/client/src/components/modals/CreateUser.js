import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Modal, Form, Dropdown } from 'react-bootstrap'
import { registration } from '../../http/userAPI'


function CreateUser({show, onHide}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')

  const addUser = () => {
    registration(email, password, role, false).then(data => {
        setEmail('')
        setPassword('')
        setRole('')
        onHide()
        console.log(data)
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
          Добавити користувача
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Control 
                onChange={e => setEmail(e.target.value)}
                placeholder={"Введіть Email"}
            />
            <Form.Control 
                onChange={e => setPassword(e.target.value)}
                placeholder={"Введіть Пароль"}
            />
            <Dropdown className='mt-2 mb-2'>
                  <Dropdown.Toggle>Виберіть Роль</Dropdown.Toggle>
                  <Dropdown.Menu>
                      <Dropdown.Item 
                          onClick={() => setRole("USER")} 
                          key="1"
                      >
                         User
                      </Dropdown.Item>
                      <Dropdown.Item 
                          onClick={() => setRole("ADMIN")} 
                          key="2"
                      >
                         Admin
                      </Dropdown.Item>
                  </Dropdown.Menu>
              </Dropdown>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
        <Button variant='outline-success' onClick={addUser}>Добавити</Button>
      </Modal.Footer>
    </Modal>
    </div>
  )
}

export default CreateUser