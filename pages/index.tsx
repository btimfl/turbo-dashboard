import { Center, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../components/AuthProvider/AuthProvider";

export default function HomeModule() {
  const router = useRouter();
  const { isAuthorized } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthorized === true) router.replace('/dashboard');
    else if (isAuthorized === false) router.replace('/login');
  });

  return (
    <Center w="100vw" h="100vh">
      <Spinner />
    </Center>
  );
}
