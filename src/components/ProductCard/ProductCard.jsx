import React from 'react'
import "./ProductCard.css"
import iphone from "../../assets/images/iphone.jpg"
import { Link } from 'react-router-dom'

function ProductCard({product}) {
  return (
    // <Link to="/view" style={{textDecoration: "none", color: "#000"}}>
        <div className='card'>
            <div className="product-img-container">
                <img src={product.image} alt="product-image" />
            </div>
            <div className="heart">
                <svg width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd"><path className="rui-w4DG7" d="M830.798 448.659l-318.798 389.915-317.828-388.693c-20.461-27.171-31.263-59.345-31.263-93.033 0-85.566 69.605-155.152 155.152-155.152 72.126 0 132.752 49.552 150.051 116.364h87.777c17.299-66.812 77.905-116.364 150.051-116.364 85.547 0 155.152 69.585 155.152 155.152 0 33.687-10.802 65.862-30.293 91.811zM705.939 124.121c-80.853 0-152.204 41.425-193.939 104.204-41.736-62.778-113.086-104.204-193.939-104.204-128.33 0-232.727 104.378-232.727 232.727 0 50.657 16.194 98.948 47.806 140.897l328.766 402.133h100.189l329.716-403.355c30.662-40.727 46.856-89.018 46.856-139.675 0-128.349-104.398-232.727-232.727-232.727z"></path></svg>
            </div>
            <div className="desc">
                <h3 className="name">{product.name}</h3>
                <h3 className="price">₹ {product.price}</h3>
                <p className="details">{product.desc}</p>
                <p className="more">
                    <span className="loc">{product.location}</span>
                    <span className="date">{product.createdAt}</span>
                </p>
            </div>
        </div>
    // </Link>
  )
}

export default ProductCard