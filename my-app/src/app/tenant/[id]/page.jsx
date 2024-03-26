"use client";

import React from "react";
import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Cookies from "js-cookie";
import Navbar from "../../../components/Navbar/Navbar";
import { Image } from 'react-bootstrap';
const DashboardTenant = () => {
  const params = useParams();
  const router = useRouter();
  const tenantid = params.id;

  // Dummy tenant ID, ganti dengan cara sesuai mendapatkan ID tenant di aplikasi Anda
  const handleManageOrders = () => {
    router.push(`/tenant/${tenantid}/mengelola_pesanan`);
  };

  useEffect(() => {
    if (!Cookies.get("loggedintenant")) {
      router.push("/");
    }
  }, [router]);

  return (
    <>
      <Navbar />
      <div className="text-dark">
        <div
          className="d-flex justify-content-center"
          style={{
            fontFamily: "Poppins",
            fontSize: "3vw",
            color: "#fff",
          }}
        >
          Dashboard Tenant
        </div>
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: "6rem" }}
        >
          <div className="align-self-center">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleManageOrders}
              style={{
                backgroundColor: "#fff",
                marginInlineStart: "2rem",
                marginInlineEnd: "2rem",
              }}
            >
              <Image
                src="/pesanan.png"
                alt="pesanan"
                width={384}
                height={384}
              
              />
              <hr style={{ color: "#000" }} />
              <div style={{ color: "#000", marginBottom: "1vw " }}>
                Kelola Pesanan
              </div>
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                router.push(`/tenant/${tenantid}/mengelola_menu`);
              }}
              style={{
                backgroundColor: "#fff",
                marginInlineStart: "2rem",
                marginInlineEnd: "2rem",
              }}
            >
              <Image
                src="/menu.png"
                alt="pesanan"
                width={384}
                height={384}
              />
              <hr style={{ color: "#000" }} />
              <div style={{ color: "#000", marginBottom: "1vw " }}>
                Kelola Menu
              </div>
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                router.push(`/tenant/${tenantid}/hasil_penjualan`);
              }}
              style={{
                backgroundColor: "#fff",
                marginInlineStart: "2rem",
                marginInlineEnd: "2rem",
              }}
            >
              <Image
                src="/penjualan.png"
                alt="penjualan"
                width={384}
                height={384}
              />
              <hr style={{ color: "#000" }} />
              <div style={{ color: "#000", marginBottom: "1vw " }}>
                Hasil Penjualan
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardTenant;
