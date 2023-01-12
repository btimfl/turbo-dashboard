import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { Auth } from "../../interfaces";

export const AuthContext = React.createContext<Auth>({
  isAuthorized: undefined,
  checkAuthorization: () => { },
  merchant: undefined,
});

export default function AuthProvider({ children }: { children: JSX.Element }) {
  const checkAuthorization = () => {
    const token = localStorage.getItem("turbo-merchant");
    const decodedToken: any = token ? jwtDecode(token) : null;

    if (Date.now() < (decodedToken?.exp * 1000))
      setAuth((prev) => {
        return { ...prev, isAuthorized: true, merchant: decodedToken.group[0].substring(1)?.trim() }
      });
    else
      setAuth((prev) => {
        return { ...prev, isAuthorized: false, merchant: null }
      });
  };

  const [auth, setAuth] = useState<Auth>({
    isAuthorized: undefined,
    checkAuthorization: checkAuthorization,
    merchant: undefined,
  });


  useEffect(() => {
    checkAuthorization();
  }, []);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
