import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import './index.css';

import { Items } from './pages/Items';
import { CreateItems } from './pages/CreateItems';
import { EditItems } from './pages/EditItems';
import { ItemDetails } from './pages/ItemDetails';
import { DeleteItem } from './pages/DeleteItem';
import { AddItemToCart } from './pages/AddItemToCart';
import { RemoveFromCart } from './pages/RemoveFromCart';
import { BuyCart } from './pages/BuyCart';
import { AdminDashboard } from './pages/AdminDashboard';



function App() {
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/Items" element={<Items/>} />
          <Route path="/EditItems" element={<EditItems/>} />
          <Route path="/CreateItems" element={<CreateItems/>} />
          <Route path="/ItemDetails" element={<ItemDetails/>} />
          <Route path="/DeleteItem" element={<DeleteItem/>} />
          <Route path="/AddItemCart" element={<AddItemToCart/>} />
          <Route path="/RemoveFromCart" element={<RemoveFromCart/>} />
          <Route path="/BuyCart" element={<BuyCart/>} />
          <Route path="/" element={<Login />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
