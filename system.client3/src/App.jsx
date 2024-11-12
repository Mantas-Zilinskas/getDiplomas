import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {createOrder} from './api/OrderApi'

function App() {
    
  return (
      <>                         
        <button onClick={()=>createOrder()}>
          click me
        </button>
    </>
  )
}

export default App
