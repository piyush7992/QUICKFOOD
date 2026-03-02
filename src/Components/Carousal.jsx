import React from 'react';

export default function Carousal() {
  return (
    <div
      id="foodCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">

        {/* Slide 1 */}
        <div className="carousel-item active">
          <img
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80"
            className="d-block w-100"
            style={{ height: "450px", objectFit: "cover" }}
            alt="food"
          />

          {/* Search Overlay */}
          <div className="carousel-caption d-flex flex-column justify-content-center align-items-center">
            <h2 className="mb-3 fw-bold">Search Your Favorite Food</h2>

            <div className="d-flex w-75 w-md-50">
              <input
                type="search"
                className="form-control me-2"
                placeholder="Search food..."
              />
              <button className="btn btn-danger">Search</button>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="carousel-item">
          <img
            src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1600&q=80"
            className="d-block w-100"
            style={{ height: "450px", objectFit: "cover" }}
            alt="burger"
          />
        </div>

        {/* Slide 3 */}
        <div className="carousel-item">
          <img
            src="https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=1600&q=80"
            className="d-block w-100"
            style={{ height: "450px", objectFit: "cover" }}
            alt="pizza"
          />
        </div>

      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#foodCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#foodCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
}
