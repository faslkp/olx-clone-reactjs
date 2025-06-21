import React from "react";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function Login({setLoggedIn}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignup = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    }

    const handleLogin = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            setLoggedIn(true)
        })
    }

    return (
        <div>
            <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" name="password" id="" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={() => handleLogin()}>Login</button>
        </div>
    );
}

export default Login;
