import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { Auth } from "../../interfaces";

export const AuthContext = React.createContext<Auth>({
  isAuthorized: undefined,
  checkAuthorization: () => { },
});

export default function AuthProvider({ children }: { children: JSX.Element }) {
  const checkAuthorization = () => {
    const token = localStorage.getItem("turbo-merchant");
    const decodedToken: any = token ? jwtDecode(token) : null;

    if (Date.now() < (decodedToken?.exp * 1000))
      setAuth((prev) => {
        return { ...prev, isAuthorized: true }
      });
    else
      setAuth((prev) => {
        return { ...prev, isAuthorized: false }
      });
  };

  const [auth, setAuth] = useState<Auth>({
    isAuthorized: undefined,
    checkAuthorization: checkAuthorization,
  });


  useEffect(() => {
    checkAuthorization();
  }, []);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
