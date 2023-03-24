import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import CustomLinkButton from "@/ssg-components/CustomLinkButton/CustomLinkButton";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={styles.home}>
      <h1 className={styles.title}>
        <span>Tree</span>
        <span>Tournament</span>
        <span>Generator</span>
      </h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis,
        dolorem repellat!{" "}
      </p>
      <div className={styles.tournamentlink}>
        <CustomLinkButton isExternal={false} href="/tournament">
          <span>Start a tournament !</span>
        </CustomLinkButton>
      </div>
    </div>
  );
}
