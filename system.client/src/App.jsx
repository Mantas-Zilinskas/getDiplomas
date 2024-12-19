import './App.css'
import TaxesLayout from './layouts/TaxesLayout'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderLayout from './layouts/orderLayout'
import ReservationsLayout from './layouts/ReservationsLayout'
import CatalogLayout from './layouts/CatalogLayout'
import {EditOrderLayout} from './layouts/EditOrderLayout'
import { createContext, useState} from "react";

export const ProductContext = createContext();
export const OrderContext = createContext();
export const ReservationContext = createContext();

function App() {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [reservations, setReservations] = useState([]);

  return (
    <>
        <Router>
            <ProductContext.Provider value={{ products, setProducts }}>
                  <OrderContext.Provider value={{ orders, setOrders }}>
                      <ReservationContext.Provider value={{ reservations, setReservations }}>
                        <Routes>
                        <Route path="/EditOrder" element={<EditOrderLayout/>} />
                        <Route path="/" element={<OrderLayout />} />
                        <Route path="/Catalog" element={<CatalogLayout />} />
                        <Route path="/Reservations" element={<ReservationsLayout />} />
                        <Route path="/Taxes" element={<TaxesLayout />} />
                        </Routes>
                    </ReservationContext.Provider>
                </OrderContext.Provider>
            </ProductContext.Provider>
        </Router>
    </>
  )
}

export default App
