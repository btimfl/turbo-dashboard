import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../components/AuthProvider/AuthProvider";
import styles from "../styles/Home.module.css";

export default function HomeModule() {
  const router = useRouter();
  const { isAuthorized } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthorized === true) router.replace('/dashboard');
    else if (isAuthorized === false) router.replace('/login');
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Turbo Dashboard</title>
        <meta name="description" content="Turbo Merchant Experience" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
