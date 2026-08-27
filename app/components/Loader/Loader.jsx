"use client";

import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.spinner} />

        <h3 className={styles.title}>Loading tracks...</h3>

        <p className={styles.subtitle}>
          Please wait while we fetch the best
          <br />
          travel trucks for you
        </p>
      </div>
    </div>
  );
}
