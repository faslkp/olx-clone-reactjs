import { createContext, useState } from "react";

export const FirebaseContext = createContext(null);

export const AuthContext = createContext(null);

export default function AuthProvider ({children}) {
    const [currentUser, setCurrentUser] = useState(null)
    return (
        <AuthContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </AuthContext.Provider>
    )
}