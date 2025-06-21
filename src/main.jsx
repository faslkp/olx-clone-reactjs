import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import db from "./Firebase/config.js";
import AuthProvider, { FirebaseContext } from "./store/FirebaseContext.jsx";


createRoot(document.getElementById("root")).render(
    <StrictMode>
        <FirebaseContext.Provider value={{ db }}>
            <Router>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </Router>
        </FirebaseContext.Provider>
    </StrictMode>
);
