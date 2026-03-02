import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './ContextReducer';
import CartModal from '../Screen/CartModel';

export default function Navbar() {

  const navigate = useNavigate();
  const cartItems = useCart() || [];
  const [showCart, setShowCart] = useState(false);

  const token = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/signin");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black">
        <div className="container-fluid">

          {/* LOGO */}
          <Link className="navbar-brand text-white" to="/">
            <i>QUICK FOOD</i>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">

            {/* LEFT MENU */}
            {token && (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link active" to="/myorders">
                    My Orders
                  </Link>
                </li>

              </ul>
            )}

            {/* RIGHT SIDE */}
            {!token ? (
              <div className="d-flex">
                <Link className="btn btn-light text-dark me-2" to="/signin">
                  Signin
                </Link>
                <Link className="btn btn-light text-dark" to="/createuser">
                  Signup
                </Link>
              </div>
            ) : (
              <div className="d-flex">

                {/* CART */}
                <button
                  className="btn btn-light text-dark me-2"
                  onClick={() => setShowCart(true)}
                >
                  Cart ({cartItems.length})
                </button>

                {/* LOGOUT */}
                <button
                  className="btn btn-light text-dark"
                  onClick={handleLogout}
                >
                  Logout
                </button>

              </div>
            )}

          </div>
        </div>
      </nav>

      {/* CART MODAL */}
      <CartModal
        show={showCart}
        handleClose={() => setShowCart(false)}
      />
    </>
  );
}