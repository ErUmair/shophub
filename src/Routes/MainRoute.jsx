import React from 'react';
import { Routes, Route } from "react-router-dom";
import PrivateRoute from '../Routes/PrivateRoute'
import Login from '../components/Login';
import Signup from '../components/Signup';
import Cart from '../components/Cart';
import Shop from '../Pages/Shop';
import MyAccount from '../Pages/MyAccount';
import NotFoundPage from '../Pages/NotFoundPage';
import Home from '../Pages/Home';
import ManageProduct from '../Pages/ManageProduct';

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop/:id" element={<Shop />} />
      <Route
        path="/manageproduct"
        element={
          <PrivateRoute>
            <ManageProduct />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/myaccount"
        element={
          <PrivateRoute>
            <MyAccount />
          </PrivateRoute>
        }
      />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default MainRoute