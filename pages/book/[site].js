import { useRouter } from "next/router";
import Head from "next/head";
import styles from "@/styles/book/Document.module.css";
import Image from "next/image";
import logo from "@/public/icon.svg";
import error_404 from "@/public/404error.png";

// the main database in json format
const db = require("../db.json");


/**
 * @param {undefined} - params required
 * @returns {JSX} Returning the JSX (html like) data
*/

export default function Home(){
  const router = useRouter();
  const site = router.query.site;
  
  let display_results = <></>;
  let element = undefined;
  // looping to see if there is an element that fits the search
  for (let elements of db.elements){
    if (elements.url == site){
      display_results = (
        <>
          <Image 
            src={`/travel/${elements.image}`}
            alt={elements.title}
            className={styles.display_image}
            priority={false}
            width={40}
            height={40}
          />
          <div className={styles.display_title}>
            {elements.title}
          </div>
          <div className={styles.display_location}>
            {elements.location}
          </div>
          <button className={styles.display_button}>Book Now</button>
        </>
      );
      element = true;
      break;
    };
  };
  if (element == undefined){
    display_results = (
      <>
        <div className={styles.center_not_found}>
          <Image  
            src={error_404}
            alt="Error, search not found"
            height={400}
            width={400}
          />
          No Results Found...
        </div>
      </>
    );
  };

  return (
    <>
      <Head>
        <title>Traveller</title>
        <link rel="icon" href="/icon.ico"/>
      </Head>
      {/* this is the search bar up at the top */}
      <header className={styles.header}>
        <Image 
          src={logo}
          alt="Traveller"
          className={styles.header_logo}
          priority={true}
        />
      </header>
      {/* this is the results section */}
      <div className={styles.results}>{display_results}</div>
    </>
  );
};