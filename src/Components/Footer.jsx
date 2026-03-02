import React from "react";

export default function Footer() {
  return (
    <footer className="bg-light text-dark pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">

          {/* Brand */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold text-success">🍔 QUICK FOOD</h5>
            <p className="text-muted">
              Delicious food delivered fast to your doorstep. Fresh ingredients,
              amazing taste, and quick service every time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="text-muted text-decoration-none">Home</a></li>
              <li><a href="/my-orders" className="text-muted text-decoration-none">My Orders</a></li>
              <li><a href="/cart" className="text-muted text-decoration-none">Cart</a></li>
              <li><a href="/signin" className="text-muted text-decoration-none">Login</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold">Contact Us</h6>
            <p className="mb-1 text-muted">📍 MG Road, Bangalore</p>
            <p className="mb-1 text-muted">📞 +91 98765 43210</p>
            <p className="mb-1 text-muted">📧 support@myfood.com</p>
          </div>

        </div>

        <hr className="border-secondary" />

        <div className="text-center text-muted small">
          © {new Date().getFullYear()} MyFood. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

