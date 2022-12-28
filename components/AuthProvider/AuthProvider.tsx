import React, { useEffect, useState } from "react";
import Auth from "../../interfaces/Auth";
import jwtDecode from "jwt-decode";

export const AuthContext = React.createContext<Auth>({
    isAuthorized: false,
});

export default function AuthProvider({ children }: { children: JSX.Element }) {
    const [auth, setAuth] = useState<Auth>({
        isAuthorized: false,
    });

    useEffect(() => {
        const checkToken = () => {
            const token = localStorage.getItem('turbo-merchant');
            const decodedToken: any = token ? jwtDecode(token) : null;

            if (decodedToken?.group) setAuth({
                isAuthorized: true
            })
        };

        window.addEventListener('storage', checkToken);

        return () => window.removeEventListener('storage', checkToken);
    }, [])

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}