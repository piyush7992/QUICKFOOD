import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function signup() {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.location,
        // role: credentials.role,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
    alert("Account created successfully");

    navigate("/signin");
  }
    if (!json.success) {
      alert("Enter valid credentials");
    }
  };
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-80 bg-light">
      <div
        className="card shadow-lg p-4 border-0"
        style={{ width: "100%", maxWidth: "450px" }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold text-success">🍔 Create Account</h2>
          <p className="text-muted small">
            Join us and start ordering delicious meals
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              name="name"
              value={credentials.name}
              onChange={onChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              required
            />
            <small className="text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Create password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              required
            />
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Delivery Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your city / area"
              name="location"
              value={credentials.location}
              onChange={onChange}
              required
            />
          </div>
          {/* ROLE
          <div className="mb-4">
            <label className="form-label fw-semibold">Account Type</label>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                value="customer"
                checked={credentials.role === "customer"}
                onChange={onChange}
              />
              <label className="form-check-label">Customer</label>
            </div> */}

            {/* <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                value="rider"
                checked={credentials.role === "rider"}
                onChange={onChange}
              />
              <label className="form-check-label">Rider</label>
            </div>
          </div> */}

          {/* Submit Button */}
          <button type="submit" className="btn btn-success w-100 fw-bold">
            🚀 Sign Up
          </button>

          {/* Divider */}
          <div className="text-center my-3 text-muted small">
            Already have an account?
          </div>

          {/* Login Link */}
          <div className="text-center">
            <Link
              to="/signin"
              className="fw-bold text-danger text-decoration-none"
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
