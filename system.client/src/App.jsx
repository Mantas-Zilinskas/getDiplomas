import './App.css'
import { createTax } from './api/TaxApi'
import { createOrder, getOrder, updateOrder, deleteOrder, payOrder } from './api/OrderApi'
import { getProducts, createProduct, getProduct, updateProduct, deleteProduct } from './api/ProductsApi'
import TaxesLayout from './layouts/TaxesLayout'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderLayout from './layouts/orderLayout'
import ReservationsLayout from './layouts/ReservationsLayout'
import CatalogLayout from './layouts/CatalogLayout'
function App() {

  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<OrderLayout />} />
                  <Route path="/Catalog" element={<CatalogLayout />} />
                  <Route path="/Reservations" element={<ReservationsLayout />} />
                <Route path="/Taxes" element={<TaxesLayout />} />
            </Routes>
        </Router>
    </>
  )
}

export default App
