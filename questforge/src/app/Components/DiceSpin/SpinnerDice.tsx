"use client";
import React from "react";
import styles from "./SpinnerDice.module.css";

export default function Loader() {
  return (
    <div className={styles["loader-center"]}>
      <div className={styles.loader} aria-hidden="true" />
    </div>
  );
}
