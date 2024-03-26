"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import supabase from "@/config/supabaseClient";
import Navbar from "../../../components/Navbar/Navbar";

const DashboardKasir = () => {
  const router = useRouter();
  const params = useParams();

  if (!Cookies.get("loggedinkasir")) {
    router.push("/");
  }

  const [kasir, setKasir] = useState();

  useEffect(() => {
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
  }, []);

  const handleLogout = async () => {
    let id = 0;
    if (kasir[0].hasLogin) {
      id = kasir[0].id;
    } else {
      id = kasir[1].id;
    }
    const { data, error } = await supabase.from("Kasir").upsert([
      {
        id: id, // Specify the row you want to update based on the primary key (id in this case)
        hasLogin: false,
      },
    ]);
    Cookies.remove("loggedinkasir");
    router.push("/");
  };

  return (
    <div>
      <Navbar></Navbar>
      <div
        className="d-flex justify-content-center"
        style={{
          fontFamily: "Poppins",
          fontSize: "3vw",
          color: "#fff",
        }}
      >
        Dashboard Kasir
      </div>
      <div className="container-fluid d-flex align-items-center vh-100 justify-content-center">
        <div className="row">
          <div className="col-md-3 px-4 mx-5">
            <Link href={`/kasir/${params.id}/mengelola_pembayaran`}>
              <Image
                src="/MengelolaPembayaran.png"
                alt="MengelolaPembayaran"
                width={300}
                height={344}
              />
            </Link>
          </div>
          <div className="col-md-3 px-4 mx-5">
            <Link href={`/kasir/${params.id}/riwayat_pembayaran`}>
              <Image
                src="/RiwayatPembayaran.png"
                alt="RiwayatPembayaran"
                width={300}
                height={344}
              />
            </Link>
          </div>
          <div className="col-md-3 px-4 mx-5">
            <Link href={`/kasir/${params.id}/register`}>
              <Image
                src="/RegisterTenant.png"
                alt="RegisterTenant"
                width={300}
                height={344}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardKasir;
