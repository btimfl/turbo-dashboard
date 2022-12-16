import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import HeaderBar from "../components/HeaderBar/HeaderBar"
import Navigation from "../components/Navigation/Navigation"
import styles from './TurboLayout.module.scss';
import NProgress from 'nprogress';

export default function TurboLayout({ children }: {
  children: React.ReactNode
}) {

  const router = useRouter();

  useEffect(() => {
    const handleRouteDone = (url, { shallow }) => {
      setNavOpen(false);
      return NProgress.done();
    }

    const handleRouteStart = () => NProgress.start();

    router.events.on('routeChangeStart', handleRouteStart)
    router.events.on('routeChangeComplete', handleRouteDone)
    router.events.on('routeChangeError', handleRouteDone)
    return () => {
      router.events.off('routeChangeComplete', handleRouteDone)
      router.events.off('routeChangeStart', handleRouteStart)
    }
  }, []);

  const [isNavOpen, setNavOpen] = useState(false);

  const handleNavToggle = (event: any) => {
    setNavOpen(!isNavOpen);
  }

  return (
    <>
      <HeaderBar onNavToggle={handleNavToggle} />
      <Navigation isMenuOpen={isNavOpen} />
      <div className={`${styles.container} ${isNavOpen ? styles.expandedMenu : styles.collapsedMenu}`}>{children}</div>
    </>
  )
}