import React from 'react'
import { useState } from 'react'
import Gofoodimg from '../assets/Gofoodimg.jpg'
import { Link } from 'react-router-dom'
import { useCart, useDispatchCart } from '../Components/ContextReducer';
export default function (props) {
  let dispatch=useDispatchCart();
  let data=useCart();
  let options = props.options[0];
  let priceOptions = Object.keys(options); 
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  let finalPrice=quantity * parseInt(options[size]);
  React.useEffect(()=>{
    setSize(priceOptions[0])
  },[])
  const handleAddToCart=()=>{
    dispatch({type:"ADD", payload:{id:props.foodItem._id, name:props.foodItem.name, price:finalPrice, quantity:quantity, size:size  }});
    console.log(data);
  }
  return (
    <div>
    <div className="card mt-3 m-3" style={{ "width": "18rem", "Height": "360px" }}>
  <img src={props.img} className="card-img-top" alt="..."  style={{ height: "200px", objectFit: "cover" }}/>
  <div className="card-body">
    <h5 className="card-title">{props.foodItem.name}</h5>
    <p className="card-text">{props.description} </p>
    
   
<div className='container w-100 mt-auto w-100'>
  <select className='m-2 h-100 bg-black text-white rounded' onChange={(e)=>setQuantity(e.target.value)}>
    {Array.from(Array(6), (e, i) => {
      return (
        <option key={i+1} value={i+1}>{i+1}</option>
      );
    })}
  </select>
  <select className='m-2 h-100 bg-black text-white rounded' onChange={(e)=>setSize(e.target.value)}> 
    {priceOptions.map((data)=>{
      return <option key={data} value={data}>{data}</option>
    })}
  </select>
</div>
<hr />
<div className='btn btn-primary d-flex justify-content-center' onClick={handleAddToCart}>Add to Cart</div>
<div className='text-center mt-3-' style={{ color: "#000" }}>Total Price: ₹{finalPrice}</div>

  </div>
</div>

    </div>
  )
}
