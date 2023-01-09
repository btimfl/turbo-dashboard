import { Center, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

export default function AuthGuard({ children }: { children: JSX.Element }) {
  const router = useRouter();
  const { isAuthorized } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthorized === false) router.replace('/login');
  }, [isAuthorized])

  if (!isAuthorized) return <Center h="100vh" w="100vw"><Spinner /></Center>

  return <>{children}</>;
}
