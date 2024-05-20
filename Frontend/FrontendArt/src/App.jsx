// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Homepage from './components/Homepage'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <Register />
//     </>
//   )
// }

//  export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Homepage from './components/Homepage'
import Register from './components/Register'
import Login from './components/Login'
import ArtworkDetails from './components/ArtworkDetails'
import ShoppingCart from './components/ShoppingCart'
import ArtworkDisplay from './components/ArtworkDisplay'
import 'bootstrap/dist/css/bootstrap.min.css';
import ArtworkForm from './components/ArtworkForm'
import { CartProvider } from './CartContext';




function App() {
  return (
    <CartProvider>
      <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/ArtworkDisplay' element={<ArtworkDisplay />} />
            <Route path='/ArtworkForm' element={<ArtworkForm />} />
            <Route path='/ShoppingCart' element={<ShoppingCart />} />
            <Route path="/artwork-details/:id" element={<ArtworkDetails />} />
          </Routes>
        </BrowserRouter>
      </>
    </CartProvider>
  );
}


export default App

