import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import { useEffect, useState } from 'react';

// Images
import first from "@/public/background1.jpg";
import second from "@/public/background3.jpg";
import third from "@/public/background4.jpg";
import fourth from "@/public/background2.jpg";

// TODO
// If u really want, make it so that the slider is animated

// THis is teh main function
export default function Home() {
  // This is setting the useState variables that will allow for me to change the classList and make it so that the photos show and hide
  const [image1, setImage1] = useState(`${styles.background_image}`);
  const [image2, setImage2] = useState(`${styles.background_hide}`);
  const [image3, setImage3] = useState(`${styles.background_hide}`);
  const [image4, setImage4] = useState(`${styles.background_hide}`);

  let image_main = 2; // keep this as 2
  let max_image = 5;
  let image_change_timing = 5000;
  // This is the useEffect element that will change what each style will look like
  useEffect(() => {
    const wait = setInterval(function () {
      // we have to use an eval because I need to import a variable and use it as a function
      eval(`setImage${image_main}("${styles.background_image}")`);
      // this is making the next image show above, and below is hiding the last one
      if (image_main == 1) eval(`setImage${max_image-1}("${styles.background_hide}")`)
      else eval(`setImage${image_main-1}("${styles.background_hide}")`);

      
      if (image_main+1 == max_image) { image_main = 1;}
      else if (image_main < max_image) { image_main++;} 
    }, image_change_timing);

  }, []);
  // THis is the main return that renders the HTML
  return (
    <>
      <Head>
        <title>Traveller</title>
        <meta name="description" content="Travel Generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <header className={styles.main}>
          <Image 
            src={first}
            alt="background image"
            height={720}
            className={image1}
          />
          <Image 
            src={second}
            alt="background image"
            height={720}
            className={image2}
          />
          <Image 
            src={third}
            alt="background image"
            height={720}
            className={image3}
          />
          <Image 
            src={fourth}
            alt='background image'
            height={720}
            className={image4}
          />
        </header>
        {/* this is all the main text and input things for the header, as if it is in the header than it changes how the images are shown */}
        <div className={styles.main_hover}>
            {/* this is the main title that is meant to catch the readers eye */}
            <div className={styles.main_title}>
              Travel The World
            </div>
        </div>
      </main>
    </>
  )
};