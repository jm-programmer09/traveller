import { useRouter } from "next/router";
import Head from "next/head";
import styles from "@/styles/book/Document.module.css";
import Image from "next/image";
import logo from "@/public/icon.svg";
import { useState } from "react";

// the main database in json format
const db = require("../db.json");


/**
 * @param {undefined} - params required
 * @returns {JSX} Returning the JSX (html like) data
*/

export default function Home(){
  const router = useRouter();
  const site = router.query.site;

  // have a loader to start with
  const [results, setResults] = useState(
    <>
      <div className={styles.center_loader}>
        <div className={styles.loader_parent}>
          <div className={styles.three_body}>
            <div className={styles.three_body__dot}></div>
            <div className={styles.three_body__dot}></div>
            <div className={styles.three_body__dot}></div>
          </div>
        </div>
      </div>
    </>
  );
  
  let element = undefined;
  for (let elements of db.elements){
    if (elements.url == site){
      element = elements;
    }
  }

  if (element == undefined){
    setResults(
      <>
        <div className={styles.center_not_found}>
            No Results Found...
        </div>
      </>
    );
  } else {
    setResults(
      <>
        <Image 
          src={`/travel/${element.image}`}
          alt={element.title}
          className={styles.display_image}
          priority={false}
          width={1280}
        />
        <div className={styles.display_title}>
          {element.title}
        </div>
        <div className={styles.display_location}>
          {element.location}
        </div>
        <button className={styles.display_button}>Book Now</button>
      </>
    );
  };
  return (
    <>
      <Head>
        <title>Traveller: {site}</title>
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
      {results}
    </>
  );
};