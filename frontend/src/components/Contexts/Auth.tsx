import React, { useCallback, useEffect, useState } from "react";
import { mockAuth } from "../../utils/mock";
import axios from 'axios';
import { AvatarGenerator } from "random-avatar-generator";

export const AuthContext = React.createContext({
    auth: {} as Iauth,
    isAuth: false,
    setAuth: (auth: Iauth) => { },
    isLoading: false,
    setIsLoading: (state: boolean) => { }
})

export const AuthProvider: React.FC = ({ children }) => {
    const [auth, setAuth] = useState<Iauth>({} as Iauth);
    const [isLoading, setIsLoading] = useState(true);

    const getAuth = useCallback(async () => {
        let backendAuth: Iauth = await axios.get('api/user/auth/')
            .then(res => {
                console.log({ res })
                const data = (res as unknown as IresponseAuth).data;
                if ("error" in data) {
                    return {} as Iauth;
                }
                return data.data;
            })
            .catch(err => {
                console.error(err)
                return {} as Iauth;
            })
            .finally(() => setIsLoading(false));

        if (Object.values(backendAuth).filter(value => value === "").length === 0) {
            console.log("bad Auth", { backendAuth })
            backendAuth = {} as Iauth
        } else {
            console.log("getAuth", { backendAuth })

            backendAuth.avatarUrl = new AvatarGenerator().generateRandomAvatar((backendAuth as Iauth).username);
            console.log({ backendAuth })
        }
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