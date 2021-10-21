import React, { useCallback, useEffect, useState } from "react";
import axios from 'axios';

export const AuthContext = React.createContext({
    auth: {} as Iauth,
    isAuth: false,
    setAuth: (auth: Iauth) => { }
})

const mockAuth = {
    username: "VashLT",
    avatarUrl: "https://i.imgur.com/S3ZqOsu.png",
    email: "vashlt@gmail.com"
}

export const AuthProvider: React.FC = ({ children }) => {
    const [auth, setAuth] = useState<Iauth>({} as Iauth);

    const getAuth = useCallback(async () => {
        const auth = await axios.get('/api/auth')
            .then(res => {
                console.log({ res })
                if ("error" in res) {
                    return {}
                }
                return (res as unknown as IresponseAuth).data.data;
            })
            .catch(err => console.error(err))

        setAuth(auth as Iauth);
        // setAuth(mockAuth)
    }, [setAuth])

    useEffect(() => {
        getAuth()
    }, [getAuth]);

    return (
        <AuthContext.Provider value={{
            auth,
            isAuth: Object.keys(auth).length > 0,
            setAuth
        }}>
            {children}
        </AuthContext.Provider>
    );
}