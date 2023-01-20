import styles from "./SocialHeader.module.scss";
import Image from "next/image";

export default function SocialHeader() {
    return (
        <div id={styles.header}>
            <div className={styles.containerLogoArea}>
                <a href="https://unicommerce.com">
                    <Image src="/icons/unicommerce-logo.png" alt="unicommerce" width="80" height="40"></Image>
                </a>
                <div className={styles.follow + " " + styles.rightAligned}>
                    <div className={styles.socialIcons}>
                        <a href="https://www.youtube.com/channel/UCxghboEldMtQRVJxqCq6UHg" target="_blank" rel="noreferrer">
                            <Image src="/icons/youtube.png" alt="youtube" width="35" height="35"></Image>
                        </a>
                        <a href="https://twitter.com/Unicommerce1" target="_blank" rel="noreferrer">
                            <Image src="/icons/twitter.png" alt="twitter" width="35" height="35"></Image>
                        </a>
                        <a href="https://www.linkedin.com/company/unicommerce" target="_blank" rel="noreferrer">
                            <Image src="/icons/linkedin.png" alt="linkedin" width="35" height="35"></Image>
                        </a>
                        <a href="https://www.facebook.com/unicommerce" target="_blank" rel="noreferrer">
                            <Image src="/icons/facebook.png" alt="facebook" width="35" height="35"></Image>
                        </a>
                    </div>
                    <p>Follow us </p>
                </div>
            </div>
        </div>
    )
}