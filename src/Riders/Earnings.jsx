import React, { useEffect, useState } from "react";

export default function Earnings() {

  const [earnings, setEarnings] = useState(0);

  useEffect(() => {

    fetch("http://localhost:5000/api/rider/earnings")
      .then(res => res.json())
      .then(data => setEarnings(data.total));

  }, []);

  return (
    <div className="card p-3 mt-3">
      <h4>💰 Today Earnings: ₹{earnings}</h4>
    </div>
  );
}
