import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../User/Login'
import Signup from '../User/Signup'

function Allroutes() {
  return (
    <div>
      <Routes>
        <Route path='/'></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
    </div>
  )
}

export default Allroutes
