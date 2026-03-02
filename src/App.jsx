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
import RidersDashboard from './Riders/RidersDashboard'
import RiderOrders from './Riders/RiderOrders'
import Earnings from './Riders/Earnings'
import Ridersignup from './Riders/Ridersignup'
import Ridersignin from './Riders/Ridersignin'




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
        <Route path="/riderdashboard" element={<RidersDashboard />} />
         <Route path="/riderorders" element={<RiderOrders />} />
         <Route path="/earnings" element={<Earnings />} />
          <Route path="/ridersignup" element={<Ridersignup />} />
          <Route path="/ridersignin" element={<Ridersignin />} />

       

       
      </Routes>
    </BrowserRouter>
    // </CartProvider>
  );
}

export default App;
