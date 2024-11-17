import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createOrder, getOrder, updateOrder, deleteOrder, payOrder } from './api/OrderApi'

let paymentEnum = {
    "cash": 0,
    "creditCard": 1,
    "giftCard": 2
}


function App() {
    let myOrderDTO = {
        userId: 0,            // Number
        products: [           // Array of objects
            { productId: 0, quantity: 10 },
            { productId: 1, quantity: 20 }
        ],
        tip: 5.5,             // Number (float)
        discountId: 0,     // Null
        reservationId: 12345, // Number
    };

    let orderUpdate = {
        "products": [
            {
                "productId": 0,
                "quantity": 1
            },
            {
                "productId": 1,
                "quantity": 2
            }
        ],
        "tip": 0,
        "discount": "string"
    }

    let orderPay = {
        "amount": 16.5,
        "method": paymentEnum.cash
    }
  return (
      <>                         
          <button onClick={() => createOrder(myOrderDTO)}>create Order</button>
          <button onClick={() => getOrder(5)}>Get Order</button>
          <button onClick={() => updateOrder(5, orderUpdate)}>update Order</button>
          <button onClick={() => deleteOrder(5)}>delte Order</button>
          <button onClick={() => payOrder(5, orderPay)}>pay Order</button>
    </>
  )
}

export default App
