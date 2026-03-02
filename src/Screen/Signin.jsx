import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function signin() {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid credentials");
    }
  if(json.success){

  localStorage.setItem("authToken", json.token);
  localStorage.setItem("role", json.role);   // save role

  if(json.role === "rider"){
    navigate("/riderdashboard");    // 🚚 Rider Panel
  }
  else{
    navigate("/");                   // 👤 User Home
  }
}

  };
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
  <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
    <div className="card shadow-lg p-4 border-0" style={{ width: "100%", maxWidth: "400px" }}>
      
      <div className="text-center mb-4">
        <h2 className="fw-bold text-success">🍔 Welcome Back</h2>
        <p className="text-muted small">Login to continue ordering delicious food</p>
      </div>

      <form onSubmit={handleSubmit}>
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
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            required
          />
        </div>

        {/* Button */}
        <button type="submit" className="btn btn-success w-100 fw-bold">
          🔐 Sign In
        </button>

        {/* Divider */}
        <div className="text-center my-3 text-muted small">or</div>

        {/* Signup Link */}
        <div className="text-center">
          <span className="text-muted">Don’t have an account? </span>
          <Link to="/createuser" className="fw-bold text-danger text-decoration-none">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  </div>
);

}
