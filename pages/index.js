import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';

// Images
import Logo from '@/public/favicon.svg';

export default function Home() {
  return (
    <>
      <Head>
        <title>Traveller</title>
        <meta name="description" content="Travel Generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <header className={styles.header}>
          <Image 
            src={Logo}
            alt="Traveller logo"
            width={40}
            height={40}
          />
        </header>
      </main>
    </>
  )
};