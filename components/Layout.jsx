import Head from "next/head";
import Link from "next/link";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";


const name = "shin code"

export const siteTitle = "Next.js blog"

const Layout = ({children,home}) => {
    return (
        <div className={styles.container}>
            
            <header className={styles.header}>
                {home? 
                (<>
                <img className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`} src="/images/profile.png" alt="" />
                <h1 className={utilStyles.heading2Xl}>{name}</h1>
                </>):
                (<>
                <img className={`${utilStyles.borderCircle} `} src="/images/profile.png" alt="" />
                <h1 className={utilStyles.heading2Xl}>{name}</h1>
                </>)}
                
            </header>

            <main>{children}</main>

            {!home &&(
            <div>
                <Link href="/"><span className={utilStyles.backArrow}>←</span>一覧へ戻る</Link>
            </div>)}
        </div>
    )
}

export default Layout