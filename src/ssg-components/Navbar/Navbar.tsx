import Link from "next/link";
import React from "react";
import styles from "./Navbar.module.css";

export default function Navbar({
  hrefs,
}: {
  hrefs: { ref: string; content: string }[];
}) {
  return (
    <nav className={styles.navbar}>
      {hrefs.map((href: { ref: string; content: string }, index) => (
        <>
          <NavbarLink key={index} href={href.ref} content={href.content} />
        </>
      ))}
    </nav>
  );
}

function NavbarLink({ href, content }: { href: string; content: string }) {
  return (
    <Link className={styles.link} href={href}>
      <span className={styles.bracket}>[</span>
      <span>{content}</span>
      <span className={styles.bracket}>]</span>
    </Link>
  );
}
