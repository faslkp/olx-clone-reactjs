import { useEffect, useState } from "react";
import "./App.css";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Create from "./pages/Create";
import ViewPost from "./pages/ViewPost";
// import { getAuth, signOut } from "firebase/auth";
// import Home from "./components/Home";
// import Login from "./components/Login";

function App() {
    // const [loggedIn, setLoggedIn] = useState(false);
    
    // useEffect(() => {
    //     const auth = getAuth();
    //     const user = auth.currentUser;

    //     if (user) {
    //         setLoggedIn(true)
    //     }
    // })

    // const handleLogout = () => {
    //     const auth = getAuth();
    //     signOut(auth).then(() => {
    //         console.log("Successfully logged out..")
    //         setLoggedIn(false)
    //     })
    // }

    return (
        <>
        <Routes>
            <Route index element={<Home />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<Create />} />
            <Route path="/view" element={<ViewPost />} />
        </Routes>
        </>
    );
}

export default App;
