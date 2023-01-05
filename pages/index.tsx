import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function HomeModule() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Turbo Dashboard</title>
        <meta name="description" content="Turbo Merchant Experience" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}

HomeModule.requireAuth = false;