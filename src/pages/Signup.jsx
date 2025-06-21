import React, { useContext, useState } from "react";
import "./Signup.css";
import olxLogo from "../assets/images/olx-logo.svg";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { FirebaseContext } from "../store/FirebaseContext";
import { addDoc, collection } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";


function Signup() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    const {db} = useContext(FirebaseContext)

    const handleSignup = (e) => {
        e.preventDefault();
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {
            const user = userCredentials.user
            if (user) {
                updateProfile(user, {displayName: username}).then(() => {
                    addDoc(collection(db, 'users'), {id: user.uid, username: username, phone: phone})
                }).then(() => {
                    navigate('/', {replace: true})
                })
            }
        })
    }
    return (
        <>
            <div className="signupParentDiv">
                <div className="img-container">
                    <img src={olxLogo} alt="olx-logo" />
                </div>
                <form action="" className="form">
                    <div className="input-group">
                        <label htmlFor="name">Username</label>
                        <input
                            type="text"
                            id="name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter phone"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />
                    </div>
                    <button type="submit" onClick={(e) => handleSignup(e)}>Sign Up</button>
                </form>
                <Link to="/login">Login</Link>
            </div>
        </>
    );
}

export default Signup;
