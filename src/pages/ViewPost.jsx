import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ViewPost.css"
import Header from "../components/Header/Header";
import { FirebaseContext } from "../store/FirebaseContext";
import { collection, getDocs, query, where } from "firebase/firestore";

function ViewPost() {
    const location = useLocation()
    const product = location.state
    const {db} = useContext(FirebaseContext)
    const [sellerDetails, setSellerDetails] = useState('{}');

    useEffect(() => {
        const q = query(collection(db, 'users'), where("id", "==", product.userId));
        getDocs(q).then(snapshot => {
            snapshot.forEach(doc => {
                setSellerDetails({id: doc.id, ...doc.data()})
            })
        })
    }, [])
    return (
        <>
            <Header />
            <div className="product-view">
                <div className="product-image">
                    <img src={product.image} alt={product.name} />
                </div>
                <div className="product-details">
                    <div className="product-description">
                        <h1 className="name">Product: {product.name}</h1>
                        <h3 className="price">Price: ₹ {product.price}</h3>
                        <p className="loc">Location: {product.location}</p>
                    </div>
                    <div className="seller-description">
                        <h2 className="seller-head">Seller Details</h2>
                        <h3 className="seller-name">Name: {sellerDetails.username}</h3>
                        <p className="phone">Phone: {sellerDetails.phone}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewPost;
