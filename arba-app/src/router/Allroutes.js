import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../User/Login";
import Signup from "../User/Signup";
import Profile from "../UserProfile/Profile";
import PrivateRoute from "./Privateroutes";
import Home from "../Component/Home";
import Product from "../Product/Product";
import Categories from "../Categories/Categories";
import Cart from "../Product/Cart";
import Aboutus from "../Handlesideeffect/Aboutus";
import Resetpassword from "../UserProfile/ResetPassword"
import Forgetpassword from "../UserProfile/Forgetpassword"


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

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* Include Product route within PrivateRoute */}
        <Route
          path="/product"
          element={
            <PrivateRoute>
              <Product />
            </PrivateRoute>
          }
        />
        {/* <Route path="/store" element={<Categories />} /> */}
        <Route
          path="/store"
          element={
            <PrivateRoute>
              <Categories />
            </PrivateRoute>
          }
        />
        {/* <Route path="/cart" element={<Cart />} /> */}
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route path="/aboutus" element={<Aboutus />} />

        {/* <Route
          path="/aboutus"
          element={
            <PrivateRoute>
              <Aboutus />
            </PrivateRoute>
          }
        /> */}
        <Route path="/resetPassword" element={<Resetpassword />} />
        <Route path="/forgetpassword" element={<Forgetpassword/>} />
      </Routes>
    </div>
  );
}

export default Allroutes;
