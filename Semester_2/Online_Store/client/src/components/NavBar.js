import React from 'react'
import { useContext } from 'react';
import {Context} from "../index"
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink} from 'react-router-dom';
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import {Button, Container} from 'react-bootstrap';
import { observer } from "mobx-react-lite"
import { useNavigate } from 'react-router-dom';

const NavBar = observer(() => {
    const{user, device} = useContext(Context)

    const navigate = useNavigate()

    const logOut = () => {
      user.setUser({})
      user.setIsAuth(false)
      user.setIsAdmin(false)
      localStorage.removeItem('token')
      localStorage.removeItem('email')
    }

  return (
    <Navbar bg="dark" data-bs-theme="dark">
          <Container>
          <NavLink style={{color: 'white', text_decoration: 'none'}} to={SHOP_ROUTE} onClick={() => {device.setSelectedType(""); device.setSelectedBrand("")}}>Tech Shop</NavLink>
          {user.isAuth ?
              <Nav className="ml-auto" style={{color: 'white', marginLeft: 'auto'}}>
                {user.isAdmin ?
                
                  <Button 
                  variant={'outline-light'} 
                  onClick={() => navigate(ADMIN_ROUTE)}
                  >
                    Адмін панель
                  </Button> 
                  :     
                    null         
                  }
                    
                  <Button 
                  variant={'outline-light'} 
                  onClick={() => navigate(BASKET_ROUTE)}
                  style={{marginLeft: '10px'}}
                  >
                    Корзина
                  </Button> 
                
                  <Button 
                  variant={'outline-light'} 
                  onClick={() => logOut()}
                  style={{marginLeft: '10px'}}
                  >
                    Вийти
                  </Button>
             </Nav>
              :
              <Nav className="ml-auto" style={{color: 'white', marginLeft: 'auto'}}>
                  <Button variant={'outline-light'} onClick={() => navigate(LOGIN_ROUTE)}>Авторизація</Button>
             </Nav>
          }
          </Container>
      </Navbar>
  )
})

export default NavBar