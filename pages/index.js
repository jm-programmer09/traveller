import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import { useEffect, useState } from 'react';

// Images
import search_icon from "@/public/search.svg";
import white_search from "@/public/white_search.svg";

const db = require("./db.json");
// TODO
// If u really want, make it so that the slider is animated
// make it so that a button called explore is shown above the html cards
// Have it as an ::after element
// make an onclick thing for the elements that show
// Search bar function
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
    const url = info.url;
    // Returning this as JSX
    return (
      <>
        <a href={url} target={"_blank"} className={styles.travel_card}>
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
        <div className={styles.search_results_parent}>
          {element_list.map((element_info) => {
            return TravelElement(element_info);
          })}
        </div>      
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

// THis is teh main function
export default function Home() {
  const [search_results, setResults] = useState(
    <>
      <div className={styles.search_results}>
        
      </div>
    </>
  );
  // this is for the search bar
  const search_db = (event) => {
    const search_bar = document.getElementById("search_bar");
    if (event.key.toLowerCase() != "enter") return false;
    // ELSE
    setResults(SearchBar(String(search_bar.value).toLowerCase()));
  };
  // For scrolling down to the input element
  const scrollSearch = () => {
    const searchbar = document.getElementById("search_bar");
    searchbar.scrollIntoView({behavior: "smooth"});
    searchbar.focus();
  };

  // THis is the main return that renders the HTML
  return (
    <>
      <Head>
        <title>Traveller</title>
        <meta name="description" content="Travel Generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.ico" />
      </Head>
      <header className={styles.main}>
        {/* <Image 
          src={first}
          alt="background image"
          height={720}
          className={image1}
          priority
        />
        <Image 
          src={second}
          alt="background image"
          height={720}
          className={image2}
          priority
        />
        <Image 
          src={third}
          alt="background image"
          height={720}
          className={image3}
          priority
        />
        <Image 
          src={fourth}
          alt='background image'
          height={720}
          className={image4}
          priority
        /> */}
        {/* above is what JSX was used before i managed to complete the animation with the css */}
        <div className={styles.backStage}></div>
      </header>
      {/* this is all the main text and input things for the header, as if it is in the header than it changes how the images are shown */}
      <div className={styles.main_hover}>
          {/* this is the main title that is meant to catch the readers eye */}
          <div className={styles.main_title}>
            Travel The World

            <div className={styles.search_image_parent}>
              <Image 
                src={white_search}
                width={35}
                height={35}
                draggable={false}
                priority={true}
                onClick={scrollSearch}
                title="Search"
                className={styles.search_image}
              />
            </div>
          </div>
      </div>
      <div className={styles.search_title}>
        <div className={styles.input_parent}>
          <div className={styles.search_icon}>
            <Image 
              src={search_icon}
              alt="Search"
              width={20}
              height={20}
              title="Search"
            />
          </div>
          {/* thsi si where the user searches stuff up */}
          <input id="search_bar" className={styles.search_bar} onKeyDown={search_db} placeholder="Find your next destination..." spellCheck={false}/>
        </div>
      </div>
      {search_results}
    </>
  )
};