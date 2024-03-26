"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import supabase from "@/config/supabaseClient";
import styles from "./page.module.css";
import Navbar from "../../../../components/Navbar/Navbar";
const HasilPenjualan = () => {
  const [transaksi, setTransaksi] = useState();
  const [timeRange, setTimeRange] = useState("lifetime"); // Default to 'lifetime'
  const [penjualan, setPenjualan] = useState();

  const params = useParams();

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

  const delay = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1000 milliseconds = 1 second
    console.log("Delayed action after 1 second");
  };

  const fetchTransaksi = async (timeRange) => {
    const { data, error } = await supabase
      .from("Transaksi")
      .select("*")
      .eq("idTenant", params.id);

    if (error) {
      setTransaksi(null);
    }
    if (data) {
      setTransaksi(data);
      setPenjualan(data);
    }
  };

  useEffect(() => {
    fetchTransaksi(timeRange);
  }, []);

  useEffect(() => {
    let filteredPenjualan = [];
    if (timeRange == "1day") {
      filteredPenjualan = penjualan.filter(
        (item) => item.waktu.slice(0, 10) == new Date().toLocaleDateString()
      );
    } else if (timeRange == "7days") {
      filteredPenjualan = transaksi.filter((item) => {
        const dateString = item.waktu.slice(0, 10);
        const [month, day, year] = dateString.split("/");
        const concatenatedDate = `${year}${month.padStart(
          2,
          "0"
        )}${day.padStart(2, "0")}`;
        const integerDate = parseInt(concatenatedDate, 10);

        const dateString2 = new Date().toLocaleDateString();
        const [month2, day2, year2] = dateString2.split("/");
        const concatenatedDate2 = `${year2}${month2.padStart(
          2,
          "0"
        )}${day2.padStart(2, "0")}`;
        const integerDate2 = parseInt(concatenatedDate2, 10);

        return integerDate2 - integerDate <= 7;
      });
    } else {
      filteredPenjualan = transaksi;
    }
    setPenjualan(filteredPenjualan);
  }, [timeRange]);

  console.log(penjualan);
  return (
    <div>
      <Navbar></Navbar>
      <div className={styles.rectangleParent}>
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
                    <span className="mx-2">
                      (<label>Select Time Range:</label>
                      <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                      >
                        <option value="lifetime">Lifetime</option>
                        <option value="1day">1 Day</option>
                        <option value="7days">7 Days</option>
                      </select>
                       )
                    </span>
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
                  penjualan.map((item) => (
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
      </div>
    </div>
  );
};

export default HasilPenjualan;
