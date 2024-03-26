"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import supabase from "@/config/supabaseClient";
import Cookies from "js-cookie";
import Navbar from "../../components/Navbar/Navbar";
import "../../styles/global.css";
import Image from "next/image";

const LoginStaff = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [tenant, setTenant] = useState();
  const [kasir, setKasir] = useState();

  const router = useRouter();

  const channels = supabase
    .channel("custom-update-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "Kasir" },
      (payload) => {
        setKasir((prevKasir) =>
          prevKasir.map((item) =>
            item.id === payload.old.id
              ? { ...item, hasLogin: payload.new.hasLogin }
              : item
          )
        );
      }
    )
    .subscribe();

  useEffect(() => {
    const fetchTenant = async () => {
      const { data, error } = await supabase.from("Tenant").select("*");

      if (error) {
        setTenant(null);
      }
      if (data) {
        setTenant(data);
      }
    };

    const fetchKasir = async () => {
      const { data, error } = await supabase.from("Kasir").select("*");

      if (error) {
        setKasir(null);
      }
      if (data) {
        setKasir(data);
      }
    };
    fetchKasir();
    fetchTenant();
  }, []);

  const handleSubmit = async (e) => {
    let i = 0;
    e.preventDefault();
    if (
      (username == "kasirpagi" && password == "kasirpagi") ||
      (username == "kasirsore" && password == "kasirsore")
    ) {
      if (kasir[0].hasLogin || kasir[1].hasLogin) {
        window.alert("Sudah ada kasir yang login!");
      } else {
        let id = 0;
        if (kasir[0].username == "kasirpagi") {
          id = kasir[0].id;
        } else {
          id = kasir[1].id;
        }
        const { data, error } = await supabase.from("Kasir").upsert([
          {
            id: id, // Specify the row you want to update based on the primary key (id in this case)
            hasLogin: true,
          },
        ]);
        Cookies.set("loggedinkasir", "true");
        router.push(`/kasir/${id}`);
      }
    } else if (username.substring(0, 6) == "tenant") {
      let i = 0;
      while (tenant[i].username != username && i < tenant.length) {
        i++;
      }
      if (tenant[i].username == username && tenant[i].password == password) {
        Cookies.set("loggedintenant", "true");
        let tenantid = tenant[i].idTenant;
        //router.push(`/mengelola_pesanan/${tenantid}?idtenant=${tenantid}`);
        router.push(`/tenant/${tenantid}`);
      } else {
        window.alert("Invalid Username or Password!");
      }
    } else {
      window.alert("Invalid Username or Password!");
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
            className={styles.logoYbarokah2RemovebgPreIcon}
            width={300}
            height={50}
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
            <Image
              width={100}
              height={20}
              className={styles.field1Child2}
              alt="rectangle2"
              src="rectangle-2.svg"
            />
            <div>
              <form onSubmit={handleSubmit}>
                <input
                  className={styles.enterNumber}
                  required
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  placeholder="Enter Username"
                ></input>
                <input
                  className={styles.enterPassword}
                  required
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Enter Password"
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
            <div className={styles.field1Item2} />
            <div className={styles.tableId}>Username</div>
            <div className={styles.password}>Password</div>
          </div>
        </div>
      </div>
    </div>
    // <div className={styles.background}>
    //   <form onSubmit={handleSubmit}>
    //     <label>
    //       <span className="text-light">Username</span>
    //       <input
    //         required
    //         type="text"
    //         onChange={(e) => setUsername(e.target.value)}
    //         value={username}
    //       ></input>
    //       <span className="text-light">Password</span>
    //       <input
    //         required
    //         type="password"
    //         onChange={(e) => setPassword(e.target.value)}
    //         value={password}
    //       ></input>
    //     </label>
    //     <button>Next</button>
    //   </form>
    // </div>
  );
};

export default LoginStaff;
