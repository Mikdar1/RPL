"use client";
import React, { useState, useEffect } from "react";
import supabase from "@/config/supabaseClient";
import styles from "./page.module.css";
import Navbar from "../../../../components/Navbar/Navbar"

const RiwayatPembayaran = () => {
  const [transaksi, setTransaksi] = useState();

  const channels = supabase
    .channel("custom-update-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "Transaksi" },
      (payload) => {
        console.log("Database berubah!");
        fetchTransaksi();
      }
    )
    .subscribe();

  const fetchTransaksi = async () => {
    const { data, error } = await supabase.from("Transaksi").select("*");

    if (error) {
      setTransaksi(null);
    }
    if (data) {
      setTransaksi(data);
    }
  };

  useEffect(() => {
    fetchTransaksi();
  }, []);

  return (
    <div>
      <Navbar></Navbar><div className={styles.rectangleParent}>
    <div className={styles.frameItem}>
      <div className="table-wrap">
        <table className="table table-striped">
          <thead>
            <tr>
              <th
                className="text-light bg-transparent text-sm"
                style={{ fontSize: "0.8rem" }}
              >
                ID Transaksi
              </th>
              <th
                className="text-light bg-transparent text-sm"
                style={{ fontSize: "0.8rem" }}
              >
                ID Pesanan
              </th>
              <th
                className="text-light bg-transparent text-sm"
                style={{ fontSize: "0.8rem" }}
              >
                ID Kasir
              </th>
              <th
                className="text-light bg-transparent text-sm"
                style={{ fontSize: "0.8rem" }}
              >
                Waktu
              </th>
              <th
                className="text-light bg-transparent text-sm"
                style={{ fontSize: "0.8rem" }}
              >
                Total Pembayaran
              </th>
            </tr>
          </thead>
          <tbody>
            {!transaksi ? (
              <p>Loading...</p>
            ) : (
              transaksi.map((item) => (
                <tr key={item.idTransaksi}>
                  <td
                    className="text-light bg-transparent text-sm"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {item.idTransaksi}
                  </td>
                  <td
                    className="text-light bg-transparent text-sm"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {item.idPesanan}
                  </td>
                  <td
                    className="text-light bg-transparent text-sm"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {item.idKasir}
                  </td>
                  <td
                    className="text-light bg-transparent text-sm"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {item.waktu}
                  </td>
                  <td
                    className="text-light bg-transparent text-sm"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {item.totalPembayaran}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div></div>
    
  );
};

export default RiwayatPembayaran;
