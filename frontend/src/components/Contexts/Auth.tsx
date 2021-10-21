import React, { useCallback, useEffect, useState } from "react";
// import { mockAuth } from "../../utils/mock";
import axios from 'axios';

export const AuthContext = React.createContext({
    auth: {} as Iauth,
    isAuth: false,
    setAuth: (auth: Iauth) => { },
    isLoading: false,
    setIsLoading: (state: boolean) => { }
})

export const AuthProvider: React.FC = ({ children }) => {
    const [auth, setAuth] = useState<Iauth>({} as Iauth);
    const [isLoading, setIsLoading] = useState(false);

    const getAuth = useCallback(async () => {
        setIsLoading(true);
        let backendAuth = await axios.get('api/user/auth/')
            .then(res => {
                console.log({ res })
                const data = (res as unknown as IresponseAuth).data;
                if ("error" in data) {
                    return {}
                }
                return data.data;
            })
            .catch(err => {
                console.error(err)
                return {};
            })
            .finally(() => setIsLoading(false));

        if (Object.values(backendAuth).filter(value => value === "").length === 0) {
            console.log("bad Auth", { backendAuth })
            backendAuth = {}
        }
        console.log("getAuth", { backendAuth })

        setAuth(backendAuth as Iauth);
        // setAuth({} as Iauth); // disable auth
        // setAuth(mockAuth) // enable global auth
    }, [setAuth])

    useEffect(() => {
        getAuth()
    }, [getAuth]);

    return (
        <AuthContext.Provider value={{
            auth,
            isAuth: Object.keys(auth).length > 0,
            setAuth,
            isLoading,
            setIsLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
}