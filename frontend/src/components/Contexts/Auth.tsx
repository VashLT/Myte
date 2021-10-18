import React, { useState } from "react";

export const AuthContext = React.createContext({
    auth: {} as Iauth,
    isAuth: false,
    setAuth: (auth: Iauth) => { }
})

export const AuthProvider: React.FC = ({ children }) => {
    const [auth, setAuth] = useState<Iauth>({} as Iauth);

    return (
        <AuthContext.Provider value={{
            auth,
            isAuth: false ? Object.keys(auth).length === 0 : true,
            setAuth
        }}>
            {children}
        </AuthContext.Provider>
    )
}