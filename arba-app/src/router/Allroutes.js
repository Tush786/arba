import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../User/Login'
import Signup from '../User/Signup'
import Profile from '../UserProfile/Profile'
import PrivateRoute from './Privateroutes'
import Home from '../Component/Home'
import Product from '../Product/Product'
import Categories from '../Categories/Categories'
import Cart from '../Product/Cart'

function Allroutes() {
  return (
    <div>
      <Routes>
      <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/product' element={<Product/>}></Route>
        <Route path='/store' element={<Categories/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
      </Routes>
    </div>
  )
}

export default Allroutes
