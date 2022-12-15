import { useState } from "react";
import HeaderBar from "../components/HeaderBar/HeaderBar"
import Navigation from "../components/Navigation/Navigation"
import styles from './TurboLayout.module.scss';

export default function TurboLayout({children}: {
    children: React.ReactNode
}) {

    const [isNavOpen, setNavOpen] = useState(false);

    const handleNavToggle = (event: any) => {
        setNavOpen(!isNavOpen);
    }

    return (
        <>
            <HeaderBar onNavToggle={handleNavToggle} />
            <Navigation isMenuOpen={isNavOpen}/>
            <div className={`${styles.container} ${isNavOpen ? styles.expandedMenu : styles.collapsedMenu }`}>{children}</div>
        </>
    )
}