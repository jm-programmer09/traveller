import Head from "next/head";
import Image from "next/image";
// this is for the styles and images
import styles from "@/styles/about.module.css";
import leave_arrow from "@/public/arrow.svg"; // this is the arrow that will allow the user to return back to the home page

// THis file is the main file that returns the JSX rendering the About the Traveller company data
export default function Document(){
  return (
    <>
      <Head>
        <title>About Traveller</title>
        <link rel="icon" href="/icon.ico"/>
      </Head> 
      {/* this is the body part of the page */}
      <header className={styles.header}>
        <a href="/" className={styles.return}>
          <Image 
            src={leave_arrow}
            className={styles.leave_arrow}
            width={40}
            height={40}
            alt="Return"
          />
        </a>
        <div className={styles.title}>About Traveller</div>
      </header>
    </>
  );
};