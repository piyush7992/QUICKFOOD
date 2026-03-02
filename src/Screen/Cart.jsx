import React from "react";
import { useCart, useDispatchCart } from "../Components/ContextReducer";
import {useNavigate} from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();

  const data = useCart();
  const dispatch = useDispatchCart();


  const handleRemove = (id) => {
    dispatch({ type: "REMOVE", payload: { id } });
  };

  const totalPrice = data.reduce((total, item) => total + item.price, 0);

  if (data.length === 0) {
    return (
      <div className="container text-center mt-5">
        <h2>Your Cart is Empty 🛒</h2>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4 fw-bold">🛒 Your Cart</h2>

      <div className="row">
        {/* LEFT SIDE — ITEMS */}
        <div className="col-md-8">
          {data.map((item, index) => (
            <div key={index} className="card mb-3 shadow-sm">
              <div className="card-body d-flex justify-content-between align-items-center">

                <div>
                  <h5 className="mb-1">{item.name}</h5>
                  <div className="text-muted">
                    Size: {item.size} | Qty: {item.quantity}
                  </div>
                </div>

                <div className="text-end">
                  <div className="fw-bold mb-2">₹{item.price}</div>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE — SUMMARY */}
        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <h4 className="mb-3">Price Summary</h4>

            <div className="d-flex justify-content-between mb-2">
              <span>Items</span>
              <span>{data.length}</span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>Total Price</span>
              <span className="fw-bold">₹{totalPrice}</span>
            </div>

            <hr />

            <button
  className="btn btn-success w-100"
  onClick={() => navigate("/checkout")}
>
  Proceed to Checkout
</button>

          </div>
        </div>
      </div>
    </div>
  );
}
