"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import supabase from "@/config/supabaseClient.jsx";
import Navbar from "../../../../components/Navbar/Navbar";
import styles from "./index.module.css";

const MengelolaPesanan = () => {
  const [pesanan, setPesanan] = useState([]);
  const [menus, setMenu] = useState([]);
  const Params = useParams();

  const idtenant = Params.id;

  const handleToggleStatus = async (idPesanan) => {
    try {
      const updatedPesanan = pesanan.map((item) => {
        if (item.idPesanan === idPesanan) {
          return { ...item, status: !item.status };
        }
        return item;
      });

      await supabase.from("Pesanan").upsert(updatedPesanan);

      setPesanan(updatedPesanan);
    } catch (error) {
      console.error("Error toggling status:", error.message);
    }
  };

  const channels = supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "Pesanan" },
      (payload) => {
        fetchPesanan();
      }
    )
    .subscribe();

  const fetchPesanan = async () => {
    try {
      // Check if supabase is defined before using it
      if (!supabase) {
        throw new Error("Supabase is not initialized");
      }

      const { data } = await supabase
        .from("Pesanan")
        .select()
        .eq("idTenant", idtenant);
      setPesanan(data || []);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const fetchMenu = async () => {
    const { data, error } = await supabase
      .from("Menu")
      .select("*")
      .eq("idTenant", idtenant);

    if (error) {
      setMenu(null);
      console.log(error);
    }
    if (data) {
      setMenu(data);
    }
  };

  useEffect(() => {
    fetchPesanan();
    fetchMenu();
  }, [idtenant]);

  return (
    <div>
      <Navbar />
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
                    ID Pesanan
                  </th>
                  <th
                    className="text-light bg-transparent text-sm"
                    style={{ fontSize: "0.8rem" }}
                  >
                    ID Meja
                  </th>
                  <th
                    className="text-light bg-transparent text-sm"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Detail
                  </th>
                  <th
                    className="text-light bg-transparent text-sm"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Total Harga
                  </th>
                  <th
                    className="text-light bg-transparent text-sm"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Kode Unik
                  </th>
                  <th
                    className="text-light bg-transparent text-sm"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Status
                  </th>
                  <th
                    className="text-light bg-transparent text-sm"
                    style={{ fontSize: "0.8rem" }}
                  >
                    ID Tenant
                  </th>
                </tr>
              </thead>
              <tbody>
                {pesanan.map((item) => (
                  <tr key={item.idPesanan}>
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
                      {item.idMeja}
                    </td>
                    <td
                      className="text-light bg-transparent text-sm"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {item.detail &&
                        item.detail.map((menu) => (
                          <div key={menu.idMenu}>
                            {menus.map((m) =>
                              m.idMenu === menu.idMenu ? (
                                menu.jumlah !== 0 ? (
                                  <div className="d-flex">
                                    <div>{`Menu: ${m.nama}`}</div>
                                    <div className="ms-auto">
                                      {`Jumlah: ${menu.jumlah}`}
                                    </div>
                                  </div>
                                ) : (
                                  ``
                                )
                              ) : (
                                ``
                              )
                            )}
                          </div>
                        ))}
                    </td>
                    <td
                      className="text-light bg-transparent text-sm"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {item.totalHarga}
                    </td>
                    <td
                      className="text-light bg-transparent text-sm"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {item.kodeUnik}
                    </td>
                    <td
                      className="text-light bg-transparent text-sm"
                      style={{ fontSize: "0.8rem" }}
                    >
                      <button
                        onClick={() => handleToggleStatus(item.idPesanan)}
                        style={{
                          fontSize: "0.8rem",
                          width: "100px",
                          borderRadius: "100px",
                        }}
                        className={`btn ${
                          item.status ? "btn-success" : "btn-warning"
                        }`}
                      >
                        {item.status ? "Completed" : "Ongoing"}
                      </button>
                    </td>
                    <td
                      className="text-light bg-transparent text-sm"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {item.idTenant}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MengelolaPesanan;
