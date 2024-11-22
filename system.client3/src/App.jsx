import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createOrder, getOrder, updateOrder, deleteOrder, payOrder } from './api/OrderApi'
import { getProducts, createProduct, getProduct, updateProduct, deleteProduct} from './api/ProductsApi'

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

    let product = {
        "id": 0,
        "orderId": 0,
        "name": "string",
        "price": 0,
        "quantity": 0,
        "discount": null,
        "taxes": [
            {
                "id": 0,
                "productId": 0,
                "name": "string",
                "value": 0
            }
        ]
    }

  return (
    <>                         
          <button onClick={() => createOrder(myOrderDTO)}>create Order</button>
          <button onClick={() => getOrder(5)}>Get Order</button>
          <button onClick={() => updateOrder(5, orderUpdate)}>update Order</button>
          <button onClick={() => deleteOrder(5)}>delte Order</button>
          <button onClick={() => payOrder(5, orderPay)}>pay Order</button>
          <br />
          <button onClick={() => getProducts()}>getProducts</button>
          <button onClick={() => createProduct(product)}>createProduct</button>
          <button onClick={() => getProduct(4)}>getProduct</button>
          <button onClick={() => updateProduct(4, product)}>updateProduct</button>
          <button onClick={() => deleteProduct(4)}>deleteProduct</button>
    </>
  )
}

export default App
