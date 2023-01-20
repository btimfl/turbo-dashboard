
import { Img } from "@chakra-ui/react"
import Image from "next/image"
import styles from "./Aside.module.scss"

export default function Aside() {
    return (
        <aside id={styles.sidebar}>
            <div className={styles.sideBar}>
                <h2>Thanks for making us the</h2>
                <h1>No. 1 E-commerce Focused Technology Solution</h1>
                <div className={styles.showcase}>
                    <Image className={styles.icon} src="/icons/businesses.png" alt="businesses" width="60" height="60" />
                    <h3>15,000+ <span>E-commerce Businesses</span></h3>
                </div>
                <div className={styles.showcase}>
                    <Image className={styles.icon} src="/icons/revenue.png" alt="revenue" width="60" height="60" />
                    <h3>US $ 5 Billion+ <span>GMV Managed Annually</span></h3>
                </div>
                <div className={styles.showcase}>
                    <Image className={styles.icon} src="/icons/integrations.png" alt="integrations" width="60" height="60" />
                    <h3>160+ <span>Integrations</span></h3>
                </div>
                <div className={styles.showcase}>
                    <Image className={styles.icon} src="/icons/transactions.png" alt="transactions" width="60" height="60" />
                    <h3>490 Million+ <span>Transactions Processed Annually</span></h3>
                </div>
                <div className={styles.showcase}>
                    <Image className={styles.icon} src="/icons/warehouses.png" alt="warehouses" width="60" height="60" />
                    <h3>7,000+ <span>Warehouses Managed</span></h3>
                </div>
                <div className={styles.showcase}>
                    <Image className={styles.icon} src="/icons/stores.png" alt="stores" width="60" height="60" />
                    <h3>2000+ <span>Stores Managed</span></h3>
                </div>
                <div className={styles.showcase}>
                    <Image className={styles.icon} src="/icons/d2c.png" alt="d2c" width="60" height="60" />
                    <h3>200+ <span>D2C Brands</span></h3>
                </div>
                <div className={styles.showcase}>
                    <Image className={styles.icon} src="/icons/presence.png" alt="presence" width="60" height="60" />
                    <h3>Present in 8+ countries</h3>
                </div>

                <div className={styles.trustedBy}>
                    <p>Trusted by leading brands & marketplaces</p>
                    <div className={styles.companies}>
                        <div className={styles.row1}>
                            <Image src="/icons/anita-dongre.png" width="115" height="35" alt="anita-dongre"></Image>
                            <Image src="/icons/action-shoes.png" width="70" height="15" alt="action-shoes"></Image>
                            <Image src="/icons/gnc.png" width="85" height="25" alt="gnc"></Image>
                            <Image src="/icons/philips.png" width="85" height="30" alt="philips"></Image>
                        </div>
                        <div className={styles.row2}>
                            <Image src="/icons/myntra.png" width="100" height="30" alt="myntra"></Image>
                            <Image src="/icons/jabong.png" width="90" height="20" alt="jabong"></Image>
                            <Image src="/icons/snapdeal.png" width="100" height="20" alt="snapdeal"></Image>
                            <Image src="/icons/lenskart.png" width="50" height="35" alt="lenskart"></Image>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}