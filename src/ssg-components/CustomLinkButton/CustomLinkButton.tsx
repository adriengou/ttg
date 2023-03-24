import Link from "next/link";
import React from "react";
import styles from "./CustomLinkButton.module.css";

export default function CustomLinkButton({
  href,
  children,
  isExternal,
}: {
  href: string;
  children: any;
  isExternal: boolean;
}) {
  return (
    <>
      {isExternal ? (
        <a className={styles.button} href={href} target="_blank">
          {children}
        </a>
      ) : (
        <Link className={styles.button} href={href}>
          {children}
        </Link>
      )}
    </>
  );
}
