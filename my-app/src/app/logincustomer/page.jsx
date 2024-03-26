"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import supabase from "@/config/supabaseClient";
import styles from "./page.module.css";
import Cookies from "js-cookie";
import "../../styles/global.css";
import Navbar from "../../components/Navbar/Navbar";
import Image from "next/image";

const LoginCustomer = () => {
  const router = useRouter();
  const [inputId, setInputId] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [meja, setMeja] = useState(null);

  const channels = supabase
    .channel("custom-update-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "Customer" },
      (payload) => {
        setMeja((prevMeja) =>
          prevMeja.map((item) =>
            item.id === payload.old.id
              ? { ...item, isFull: payload.new.isFull }
              : item
          )
        );
      }
    )
    .subscribe();

  useEffect(() => {
    const fetchMeja = async () => {
      const { data, error } = await supabase.from("Customer").select("*");

      if (error) {
        setFetchError("Cloud not fetch data");
        setMeja(null);
        console.log(error);
      }
      if (data) {
        setMeja(data);
        setFetchError(null);
      }
    };
    fetchMeja();
  }, []);

  const handleSubmit = async (e) => {
    let i = 0;
    e.preventDefault();
    while (meja[i].id != inputId) {
      i++;
    }
    if (!meja[i].isFull) {
      const { data, error } = await supabase.from("Customer").upsert([
        {
          id: parseInt(inputId), // Specify the row you want to update based on the primary key (id in this case)
          isFull: true,
        },
      ]);
      Cookies.set("loggedincustomer", true);
      router.push(`/customer/${inputId}`);
    } else {
      window.alert("Meja Penuh");
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.landingPageAwal}>
        <div className={styles.rectangleParent}>
          <div className={styles.groupChild} />
          <b className={styles.welcomeToYbarokah}>Welcome to YBarokah!</b>
          <Image
            width={300}
            height={50}
            className={styles.logoYbarokah2RemovebgPreIcon}
            alt="Logo"
            src="/logo-ybarokah.png"
          />
          <div className={styles.field1}>
            <Image
              width={100}
              height={20}
              className={styles.field1Child}
              alt="rectangle"
              src="rectangle-2.svg"
            />
            <div>
              <form onSubmit={handleSubmit}>
                <input
                  className={styles.enterNumber}
                  required
                  type="number"
                  onChange={(e) => setInputId(e.target.value)}
                  value={inputId}
                  placeholder="Ex : 10"
                ></input>
                <button
                  className={styles.groupInner}
                  style={{
                    color: "#FFFFFF",
                    fontSize: "32px",
                    fontWeight: "600",
                    fontFamily: "var(--font-poppins)",
                  }}
                >
                  Login
                </button>
              </form>
            </div>
            <div className={styles.field1Item} />
            <div className={styles.tableId}>Table ID</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCustomer;
