import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import { useState, useEffect } from 'react';

// Images
import search_icon from "@/public/search.svg";
import white_search from "@/public/white_search.svg";
import plan_image from "@/public/plan.svg";
import relax_image from "@/public/relax.svg";
import travel_image from "@/public/travel.svg";
import about_image from "@/public/travel_image.jpg";

const db = require("./db.json");
// TODO

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

/**
 * @param {undefined} - params required
 * @returns {JSX} Returning the JSX (html like) data
*/

// THis is the main function
// When Next JS runs, it compiles this code into Browser readable code, so the JSX is turned into something else completely
// That is why if you tried to use this code in a .js file that is <script src="yourfile.js"></script>, it will not work and willl give you many errors
// Also the import is like doing require(), though for module files like this one, you can use import instead (makes it simpler and more readable)
// I would have liked to have made this with Typescript, however, if most people are already struggling understanding what this is doing, then I doubt a type-strict language like typescript would help that matter
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
  const click_search = (event) => {
    const search_bar = document.getElementById("search_bar");
    setResults(SearchBar(String(search_bar.value).toLowerCase()));
  };
  // this is foyr the loading part
  const [mainLoader, setLoader] = useState(
    <>
      <div className={styles.mainLoader}>
        <div className={styles.three_body}>
          <div className={styles.three_body__dot}></div>
          <div className={styles.three_body__dot}></div>
          <div className={styles.three_body__dot}></div>
        </div>
      </div>
    </>
  ); // inside is where i have the JSX for the loader
  // the equivalent of a document.onload function
  const TIMER = 1500; // this is the time that it will wait before it shows the main content, it is in milliseconds
  useEffect(() => {
    const waitInterval = setInterval(function () {
      setLoader(<></>); // clearing the loader
      clearInterval(waitInterval); // making sure that the interval does not run again
    }, TIMER);
  }, []);

  // THis is the main return that renders the HTML
  return (
    <>
      <Head>
        <title>Traveller</title>
        <meta name="description" content="Travel Generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.ico" />
      </Head>
      {/* this is the loader here */}
      {mainLoader}
      {/* this is the content that will be shown after the loading effect has happend */}
      <header className={styles.main} id="main">
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
          <div className={styles.search_image_parent} onClick={scrollSearch}>
            <Image
              src={white_search}
              width={35}
              height={35}
              draggable={false}
              onClick={scrollSearch}
              title="Search"
              className={styles.search_image}
            />
          </div>
        </div>
      </div>
      {/* these are the primary links of the page (the about me page link and a paragraph of little information above) */}
      <div className={styles.about_content}>
        <div className={styles.about_left}>
          <div className={styles.mini_paragraph}>
            Find the holiday of your dreams through Traveller's enchanced searching capabilities. 
            <br/>
            Learn about how Traveller can help you below
          </div>
          <svg className={styles.about_svg} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#08BDBA" d="M46.1,-61.4C58.6,-54.4,66.6,-39.3,70,-23.9C73.4,-8.5,72.1,7.3,68.7,23.8C65.3,40.2,59.8,57.5,48,63.1C36.2,68.7,18.1,62.6,5.3,55.4C-7.5,48.1,-15.1,39.6,-25.9,33.7C-36.8,27.8,-51,24.5,-53.9,17.1C-56.9,9.8,-48.5,-1.6,-44.9,-15.2C-41.4,-28.8,-42.6,-44.6,-35.9,-53.5C-29.2,-62.3,-14.6,-64.3,1.1,-65.8C16.8,-67.4,33.7,-68.4,46.1,-61.4Z" transform="translate(100 100)" />
          </svg>
          <a href="/about" className={styles.about_button}>
            About Traveller
          </a>
        </div>
        <Image 
          src={about_image}
          className={styles.about_image}
          priority={true}
          width={600}
          height={400}
          alt="travel image"
        />
        <Image 
          priority={true}
          alt="before travel image"
          src="/travel_image1.jpg"
          className={styles.about_image_before}
          width={600}
          height={400}
        />
      </div>
      {/* this is the extra info bit || the content page */}
      <div className={styles.extra_content}>
        <div className={styles.row}>
          <div>Start planning your travel...</div>
          <Image
            src={plan_image}
            alt="Plan your holiday"
            className={styles.travel_image}
            loading="lazy"
          />
        </div>
        <div className={styles.row}>
          <div>Start your travel...</div>
          <Image
            src={travel_image}
            alt="Travel to your destination"
            className={styles.travel_image}
            loading="lazy"
          />
        </div>
        <div className={`${styles.row} ${styles.no_after}`}>
          <div>Start your relaxation...</div>
          <Image
            src={relax_image}
            alt="Relax"
            className={styles.travel_image}
            loading="lazy"
          />
        </div>
      </div>
      <div className={styles.search_title}>
        <div className={styles.input_parent}>
          <div className={styles.search_icon} onClick={click_search}>
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
            onKeyDown={search_db}
            placeholder="Find your next destination..."
            spellCheck={false}
          />
        </div>
      </div>
      {search_results}
      <footer className={styles.footer}>
        <a href={"https://github.com/jm-programmer09/traveller"} className={styles.gitButton} target={"_blank"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30px"
            height="30px"
            viewBox="0 0 192 192"
            fill="none"
          >
            <path
              stroke="rgb(230, 230, 230)"
              strokeLinecap={"round"}
              strokeLinejoin={"round"}
              strokeWidth={"12"}
              d="M120.755 170c.03-4.669.059-20.874.059-27.29 0-9.272-3.167-15.339-6.719-18.41 22.051-2.464 45.201-10.863 45.201-49.067 0-10.855-3.824-19.735-10.175-26.683 1.017-2.516 4.413-12.63-.987-26.32 0 0-8.296-2.672-27.202 10.204-7.912-2.213-16.371-3.308-24.784-3.352-8.414.044-16.872 1.14-24.785 3.352C52.457 19.558 44.162 22.23 44.162 22.23c-5.4 13.69-2.004 23.804-.987 26.32C36.824 55.498 33 64.378 33 75.233c0 38.204 23.149 46.603 45.2 49.067-3.551 3.071-6.719 9.138-6.719 18.41 0 6.416.03 22.621.059 27.29M27 130c9.939.703 15.67 9.735 15.67 9.735 8.834 15.199 23.178 10.803 28.815 8.265"
            />
          </svg>
        </a>
        <div className={styles.footer_author}>Author: 
          <a className={styles.author_link} href={"mailto:26mel@tgs.qld.edu.au"}>Jack Mellett</a>
        </div>
      </footer>
    </>
  );
};