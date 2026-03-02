import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Cards from "../Components/Cards";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const[search,setSearch]=useState('');
  const [foodcategory, setFoodcategory] = useState([]);
  const [fooditem, setFooditem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/displayData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = await response.json();
    setFoodcategory(data[1]);
    setFooditem(data[0]);
  };
  const navigate = useNavigate();
//   useEffect(() => {

//   const role = localStorage.getItem("role");

//   if(role === "rider"){
//     navigate("/riderdashboard");
//   }

// }, []);


  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {/* <button className="btn btn-danger">Search</button> */}
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
          {/* Search Overlay */}
          <div className="carousel-caption d-flex flex-column justify-content-center align-items-center">
            <h2 className="mb-3 fw-bold">Search Your Favorite Food</h2>

            <div className="d-flex w-75 w-md-50">
              <input
                type="search"
                className="form-control me-2"
                placeholder="Search food..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {/* <button className="btn btn-danger">Search</button> */}
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="carousel-item">
          <img
            src="https://images.unsplash.com/photo-1742599361539-f096753d1100?auto=format&fit=crop&fm=jpg&q=80&w=1600"
            className="d-block w-100"
            style={{ height: "450px", objectFit: "cover" }}
            alt="pizza"
          />
           {/* Search Overlay */}
          <div className="carousel-caption d-flex flex-column justify-content-center align-items-center">
            <h2 className="mb-3 fw-bold">Search Your Favorite Food</h2>

            <div className="d-flex w-75 w-md-50">
              <input
                type="search"
                className="form-control me-2"
                placeholder="Search food..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {/* <button className="btn btn-danger">Search</button> */}
            </div>
          </div>
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
{/* Carousal Component End */}
      <div className="container">
        {foodcategory.length !== 0 &&
          foodcategory.map((cat) => (
            <div key={cat._id} className="mb-4">
              {/* Category Name */}
              <div className="fs-3 m-3">{cat.CategoryName}</div>
              <hr />

              {/* Items of that category */}
              <div className="row">
                {fooditem.length !== 0 &&
                  fooditem
                    .filter((item) => (item.CategoryName === cat.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                    .map((filterItems) => (
                      <div key={filterItems._id} className="col-md-3 mb-6 m-3">
                        <Cards foodItem={filterItems}
                        options={filterItems.options}
                        img={filterItems.img}
        
                        description={filterItems.description} />
                      </div>
                    ))}
              </div>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}
