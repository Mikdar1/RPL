"use client";

import React from "react";
import styles from "./page.module.css";
import "../styles/global.css";
import Link from "next/link";
import Navbar from "../components/Navbar/Navbar";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.landingPageAwal}>
        <div className={styles.rectangleParent}>
          <div className={styles.groupChild} />
          <b className={styles.welcomeToYbarokah}>Welcome to YBarokah!</b>
          <img
            className={styles.logoYbarokah2RemovebgPreIcon}
            alt="Logo"
            src="/logo-ybarokah.png"
          />
          <Link href="/loginstaff">
            <button className={styles.groupItem} type="button">
              <div
                style={{
                  color: "#FFFFFF",
                  fontSize: "32px",
                  fontWeight: "600",
                  fontFamily: "var(--font-poppins)",
                }}
              >
                Login as Staff
              </div>
            </button>
          </Link>
          <Link href="/logincustomer">
            <button className={styles.groupInner} type="button">
              <div
                style={{
                  color: "#FFFFFF",
                  fontSize: "32px",
                  fontWeight: "600",
                  fontFamily: "var(--font-poppins)",
                }}
              >
                Login as Customer
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
