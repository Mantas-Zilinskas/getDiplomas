import './App.css'
import TaxesLayout from './layouts/TaxesLayout'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderLayout from './layouts/orderLayout'
import ReservationsLayout from './layouts/ReservationsLayout'
import CatalogLayout from './layouts/CatalogLayout'
import { createContext, useContext, useState} from "react";

export const ProductContext = createContext();

function App() {
    const [products, setProducts] = useState([]);

  return (
    <>
        <Router>
              <ProductContext.Provider value={{ products, setProducts }}>
                <Routes>
                    <Route path="/" element={<OrderLayout />} />
                    <Route path="/Catalog" element={<CatalogLayout />} />
                    <Route path="/Reservations" element={<ReservationsLayout />} />
                    <Route path="/Taxes" element={<TaxesLayout />} />
                </Routes>
            </ProductContext.Provider>
        </Router>
    </>
  )
}

export default App
