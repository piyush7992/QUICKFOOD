import './App.css'
// import { CartProvider } from './Components/ContextReducer'
import Navbar from './Components/Navbar'
import Home from './Screen/Home'
import Signin from './Screen/signin'
import Signup from './Screen/signup'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from './Screen/Cart'
import Checkout from './Screen/Checkout'
import MyOrders from './Screen/Myorders'

function App() {
  return (
    // <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/createuser" element={<Signup />} />
        {/* <Route path="/mycart" element={<Cart />} /> */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/myorders" element={<MyOrders />} />
      </Routes>
    </BrowserRouter>
    // </CartProvider>
  );
}

export default App;
