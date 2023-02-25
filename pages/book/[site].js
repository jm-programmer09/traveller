import { useRouter } from "next/router";
import styles from "@/styles/book/Document.module.css";
import Image from "next/image";
import logo from "@/public/icon.svg";

const db = require("../db.json");

export default function Home(){
  const router = useRouter();
  const site = router.query.site;


  return (
    <>
      <title>Traveller: {site}</title>
      <header className={styles.header}>
        <Image 
          src={logo}
          alt="Traveller"
          className={styles.header_logo}
          priority={true}
        />
      </header>
    </>
  );
};