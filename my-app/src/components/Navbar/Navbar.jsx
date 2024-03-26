"use client";
import React from "react";
import { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import supabase from "@/config/supabaseClient";
import Link from "next/link";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";
import { Image } from 'react-bootstrap';
const CustomNavbar = () => {
  const params = useParams();
  const router = useRouter();

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

  const hasLoginApp =
    Cookies.get("loggedinkasir") ||
    Cookies.get("loggedintenant") ||
    Cookies.get("loggedincustomer");

  const handleDashboard = async () => {
    if (Cookies.get("loggedinkasir")) {
      router.push(`/kasir/${params.id}`);
    } else if (Cookies.get("loggedintenant")) {
      const idTenant = params.id;
      router.push(`/tenant/${idTenant}`);
    } else if (Cookies.get("loggedincustomer")) {
      const idMeja = params.id;
      router.push(`/customer/${idMeja}`);
    } else {
      console.log("Method not Allowed!");
    }
  };

  const handleLogout = async () => {
    if (Cookies.get("loggedincustomer")) {
      const { data, error } = await supabase.from("Customer").upsert([
        {
          id: params.id, // Specify the row you want to update based on the primary key (id in this case)
          isFull: false,
        },
      ]);
      Cookies.remove("loggedincustomer");
    } else if (Cookies.get("loggedinkasir")) {
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
    } else if (Cookies.get("loggedintenant")) {
      Cookies.remove("loggedintenant");
    }
    router.push("/");
  };
  return (
    <Navbar style={{ backgroundColor: "#fbaf34" }} variant="dark" expand="lg">
      <button
            onClick={handleDashboard}
            style={{
              backgroundColor: "#fbaf34",
              border: "none",
              color: "rgba(255,255,255,0.65)",
            }}
          >
            <Navbar.Brand>
          <Image
            src="/logo-yb-hitam.png"
            alt="Logo"
            width={35}
            height={30}
            class="d-inline-block align-text-top"
          />
        </Navbar.Brand>
          </button>
          <button
            onClick={handleDashboard}
            style={{
              backgroundColor: "#fbaf34",
              border: "none",
              color: "rgba(255,255,255,0.65)",
            }}
          >
            <Navbar.Brand>YBarokah</Navbar.Brand>
          </button>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <button
            onClick={handleDashboard}
            style={{
              backgroundColor: "#fbaf34",
              border: "none",
              color: "rgba(255,255,255,0.65)",
            }}
          >
            {hasLoginApp ? "Dashboard" : " "}
          </button>
          <Link href="/ourmember">
            <Navbar.Text style={{ paddingLeft: "10px" }}>
              Our Member
            </Navbar.Text>
          </Link>
        </Nav>
      </Navbar.Collapse>
      <Nav style={{ justifyContent: "end" }}>
        <button
          onClick={handleLogout}
          style={{ backgroundColor: "#fbaf34", border: "none" }}
        >
          <Navbar.Brand>{hasLoginApp ? "Logout" : "Login"}</Navbar.Brand>
        </button>
      </Nav>
    </Navbar>
  );
};

export default CustomNavbar;
