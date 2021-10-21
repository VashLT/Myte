import React, { useCallback, useEffect, useState } from "react";
import { mockAuth } from "../../utils/mock";
import axios from 'axios';

export const AuthContext = React.createContext({
    auth: {} as Iauth,
    isAuth: false,
    setAuth: (auth: Iauth) => { }
})

export const AuthProvider: React.FC = ({ children }) => {
    const [auth, setAuth] = useState<Iauth>({} as Iauth);

    const getAuth = useCallback(async () => {
        const auth = await axios.get('api/user/auth')
            .then(res => {
                console.log({ res })
                if ("error" in res) {
                    return {}
                }
                return (res as unknown as IresponseAuth).data.data;
            })
            .catch(err => console.error(err))

        setAuth(auth as Iauth);
        // setAuth({} as Iauth); // disable auth
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