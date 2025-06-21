import React, { useState } from "react";
import "./Login.css"
import olxLogo from "../assets/images/olx-logo.svg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
            const user = userCredentials.user;
            if (user) {
                navigate('/')
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
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />
                    </div>
                    <button type="submit" onClick={(e) => handleLogin(e)}>
                        Login
                    </button>
                </form>
                <Link to="/register">Sign Up</Link>
            </div>
        </>
    );
}

export default Login;
