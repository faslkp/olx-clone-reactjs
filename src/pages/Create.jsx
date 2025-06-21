import React, { useContext, useState } from "react";
import Header from "../components/Header/Header";
import { Link } from "react-router-dom";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import olxLogo from "../assets/images/olx-logo.svg";
import "./Create.css"
import { addDoc, collection } from "firebase/firestore";
import { AuthContext, FirebaseContext } from "../store/FirebaseContext";

function Create() {
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [location, setLocation] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState(null)

    const {currentUser} = useContext(AuthContext)
    const {db} = useContext(FirebaseContext)

    const handleCreate = (e) => {
        e.preventDefault();
        const date = new Date();
        const storage = getStorage();
        const storageRef = ref(storage, `/images/${image.name}`)
        uploadBytes(storageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                console.log(url)
                try {
                    addDoc(collection(db, 'products'), {
                        name: name,
                        desc: desc,
                        location: location,
                        price: price,
                        image: url,
                        userId: currentUser.uid,
                        createdAt: date.toDateString()
                    }).then(() => {
                        setName('')
                        setDesc('')
                        setLocation('')
                        setPrice(0)
                        setImage(null)
                        console.log("New product added")
                    })
                } catch (e) {
                    console.log(e)
                }
            })
        })
    }
    return (
        <>
            <Header />
            <div className="create-container">
                <div className="createParentDiv">
                    <div className="img-container">
                        <img src={olxLogo} alt="olx-logo" />
                    </div>
                    <form action="" className="form">
                        <div className="input-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter product name"
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Description</label>
                            <input
                                type="text"
                                id="desc"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder="Enter product description"
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Location</label>
                            <input
                                type="text"
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Enter product location"
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="phone">Price</label>
                            <input
                                type="number"
                                id="phone"
                                value={price}
                                onChange={(e) => setPrice(parseFloat(e.target.value))}
                                placeholder="Enter product price"
                            />
                        </div>
                        {(image) ? <img className="preview-img" src={image ? URL.createObjectURL(image) : null} alt="product-image" /> : null}
                        <div className="input-group">
                            <label htmlFor="image">Image</label>
                            <input
                                type="file"
                                id="image"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>
                        
                        <button type="submit" onClick={(e) => handleCreate(e)}>
                            Create
                        </button>
                    </form>
                    <Link to="/">Back to Home</Link>
                </div>
            </div>
        </>
    );
}

export default Create;
