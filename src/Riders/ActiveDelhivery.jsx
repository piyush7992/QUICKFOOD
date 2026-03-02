export default function ActiveDelivery() {

  return (
    <div className="card mt-3 p-3">
      <h4>Active Delivery</h4>

      <p>Pickup: Restaurant</p>
      <p>Drop: Customer Address</p>

      <button className="btn btn-warning me-2">
        Picked Up
      </button>

      <button className="btn btn-primary me-2">
        Out for Delivery
      </button>

      <button className="btn btn-success">
        Delivered
      </button>
    </div>
  );
}
