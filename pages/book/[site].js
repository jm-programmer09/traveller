import { useRouter } from "next/router";
import Head from "next/head";
import styles from "@/styles/book/Document.module.css";
import Image from "next/image";
import logo from "@/public/icon.svg";
import error_404 from "@/public/404error.png";
import { useEffect, useState } from "react";
import search_icon from "@/public/search.svg";

// the main database in json format
const db = require("../db.json");

// THis is the exact same function from the homepage, because as I stated in the development, the search bar has the exact same functionality
/**
 * 
 * @param {string} searchcontent the search query
 * @return {JSX} Returning the output from the search
 */
function SearchBar(searchcontent){
  // This is the API that handles what the return is for the search
  const element_list = [];

  for (let sites of db.elements){
    // Checking the tags
    // We have to loop through all of the tags
    let found = false;
    for (let tags of sites.tags){
      if (searchcontent.includes(tags)){
        element_list.push(sites);
        found = true;
        break;
      };
    };
    // THis is making sure that it doesnt have multiple times that the sites is added to what is going to be displayed
    if (found) continue;
    // THis is for cheekcing the title
    if (searchcontent.includes(sites.title.toLowerCase()) || sites.title.toLowerCase().includes(searchcontent)){
      element_list.push(sites);
      // we dont have to use found in this one because we couldnt use continue in the loop before
      // because or else the continue would have just affected the first for loop that it was called in, not the outer one which we were tyring to effect
      continue;
    };
    // THis is then checking the location
    // found wont be needed to be used here, because no matter whether something was found or not we will continue
    for (let locations of sites.check_location){
      if (searchcontent.includes(locations)){
        element_list.push(sites);
        break;
      };
    };
    // No need to say continue because it does that anyway
  };

  // this is for rendering specific elements glovally
  function TravelElement(info){
    const title = info.title;
    const location = info.location;
    const image = info.image;
    const url = "/book/" + info.url;
    // Returning this as JSX
    return (
      <>
        <a href={url} className={styles.travel_card}>
          <Image 
            src={`/travel/${image}`}
            draggable={false}
            width={160}
            height={90}
            className={styles.travel_icon}
            alt={title}
          />
          <div className={styles.card_location}>
            {location} 
          </div>
          <div className={styles.card_title}>
            {title}
          </div>
        </a>
      </>
    );
  };

  if (element_list.length >= 1){
    return (
      <>
        {element_list.map((element_info) => {
          return TravelElement(element_info);
        })}    
      </>
    );
  };
  // ELSE; we dont need to do an else because the last if statement ends with a return
  return (
    <>
      <div className={styles.search_results}>
        <div className={styles.no_results}>No Results...</div>
      </div>
    </>
  )
};

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
            width={600}
            height={400}
          />
          <div className={styles.text}>
            <div className={styles.display_title}>
              {elements.title}
            </div>
            <div>
              {elements.location}
            </div>
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

  // THis is the useState variable for the search results
  const [search_results, setResults] = useState(<></>);

  // The document.onload function pretty much
  // This is just to make sure that the main_row is the same height as the screen
  useEffect(() => {
    const main_row = document.getElementById("main_row");
    // the minus 44 is to make sure that the header height is considered
    main_row.style.height = window.innerHeight - 44 + "px";

    // THis is then for the onenter keydown await on the search bar
    document.getElementById("search_bar").addEventListener("keydown", (event) => {
      if (event.key.toLowerCase() == "enter"){
        search();
      }
    })
  }, []);

  function search(){
    const input = document.getElementById("search_bar");
    setResults(SearchBar(input.value));
  }

  return (
    <>
      <Head>
        <title>Traveller</title>
        <link rel="icon" href="/icon.ico"/>
      </Head>
      {/* this is the search bar up at the top */}
      <header className={styles.header}>
        <a href="/">
            <Image 
            src={logo}
            alt="Traveller"
            className={styles.header_logo}
            priority={true}
          />
        </a>
        <div className={styles.search_icon} onClick={search}>
            <Image
              src={search_icon}
              alt="Search"
              width={20}
              height={20}
              title="Search"
            />
          </div>
          {/* thsi si where the user searches stuff up */}
          <input
            id="search_bar"
            className={styles.search_bar}
            placeholder="Find your next destination..."
            spellCheck={false}
          />
      </header>
      {/* this is the results section */}
      <div className={styles.main_row} id="main_row">
        <div className={styles.results}>{display_results}</div>
        <div className={styles.search_results}>
          {search_results}
        </div>
      </div>
    </>
  );
};