import React, { useContext, useEffect, useState } from "react";
import "./Home.css"
import Header from "../components/Header/Header";
import Banner from "../components/Banner/Banner";
import ProductCard from "../components/ProductCard/ProductCard";
import Footer from "../components/Footer/Footer";
import { AuthContext, FirebaseContext } from "../store/FirebaseContext";
import { getAuth } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

function Home() {
    const {currentUser, setCurrentUser} = useContext(AuthContext);
    const {db} = useContext(FirebaseContext);

    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        // get current user
        const auth = getAuth();
        auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })

        // get products
        getDocs(collection(db, 'products')).then(snapshot => {
            let docs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setProducts(docs)
        })
    })
    return (
        <>
            <Header />
            <Banner />
            <div className="products">
                <div className="container">
                    <h1 className="container-head">Fresh Recommendations</h1>
                    <div className="product-cards">
                        {products.map((product) => (
                            <Link to="/view" state={product} style={{textDecoration: "none", color: "#000"}}>
                                <ProductCard product={product} />
                            </Link>
                        ))}
                    </div>
                    <div className="load-more">
                        <button>Load more</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;
