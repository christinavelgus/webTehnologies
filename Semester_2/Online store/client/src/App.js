import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Navbar from './components/NavBar';
import { observer } from 'mobx-react-lite'
import {Context} from "./index"
import { Spinner } from 'react-bootstrap';
import {check, getRole} from "./http/userAPI";



const App = observer(() => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
        user.setUser(true)
        user.setIsAuth(true)
        getRole().then((data) =>{
            if(data.role === "ADMIN"){
                user.setIsAdmin(true)
            }
        })
    }).finally(() => setLoading(false))
}, [])

  if(loading) {
    return <Spinner animation={"grow"} />
  }

  return (
        <BrowserRouter>
            <Navbar />
            <AppRouter />
        </BrowserRouter>
  );
})

export default App;
