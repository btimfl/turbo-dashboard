import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

export default function AuthGuard({ children }: { children: JSX.Element }) {
  const { isAuthorized } = useContext(AuthContext);

  if (!isAuthorized) return <span>Unauthorized!</span>;

  return <>{children}</>;
}
