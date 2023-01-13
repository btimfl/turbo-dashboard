import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import HeaderBar from "../components/HeaderBar/HeaderBar";
import Navigation from "../components/Navigation/Navigation";
import styles from "./TurboLayout.module.scss";
import NProgress from "nprogress";
import { Box } from "@chakra-ui/react";

export default function TurboLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteDone = (url, { shallow }) => {
      return NProgress.done();
    };

    const handleRouteStart = () => {
      setIsNavOpen(false);
      NProgress.start();
    };

    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteDone);
    router.events.on("routeChangeError", handleRouteDone);
    return () => {
      router.events.off("routeChangeComplete", handleRouteDone);
      router.events.off("routeChangeStart", handleRouteStart);
    };
  });

  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <HeaderBar onNavToggle={setIsNavOpen} />
      <Navigation isMenuOpen={isNavOpen} />
      <div
        className={`${styles.container} ${
          isNavOpen ? styles.expandedMenu : styles.collapsedMenu
        }`}
      >
        <Box className={styles.pageContainer}>
          {children}
        </Box>
      </div>
    </>
  );
}
