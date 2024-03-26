"use client";

import supabase from "@/config/supabaseClient";
import Cookies from "js-cookie";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";
import Navbar from "../../../components/Navbar/Navbar";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Alert } from "react-bootstrap/Alert";
import { Modal } from "react-bootstrap/Modal";

const DashboardCustomer = () => {
  const router = useRouter();
  const params = useParams();

  if (!Cookies.get("loggedincustomer")) {
    if (Cookies.get("loggedinkasir") || Cookies.get("loggedintenant")) {
      setAlert(true);
      setAlertStatus("Not Allowed!");
      setAlertMessage("This Method for Only Customer!");
      if (Cookies.get("loggedinkasir")) {
        router.push(`kasir`);
      } else {
        const id = params.id;
        router.push(`tenant/${id}`);
      }
    } else {
      router.push("/");
    }
  }
  const [nama, setNama] = useState();
  const [deskripsi, setDeskripsi] = useState();
  const [gambar, setGambar] = useState();
  const [alert, setAlert] = useState(false);
  const [error, setFetchError] = useState();
  const [alertStatus, setAlertStatus] = useState();
  const [alertMessage, setAlertMessage] = useState();

  const [tenant, setTenant] = useState();
  const [idTenant, setidTenant] = useState();

  const channels = supabase
    .channel("custom-update-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "Tenant" },
      (payload) => {
        fetchTenant();
      }
    )
    .subscribe();

  const fetchTenant = async () => {
    const { data, error } = await supabase.from("Tenant").select("*");

    if (error) {
      setFetchError("Cloud not fetch data");
      setTenant(null);
      console.log(error);
    }
    if (data) {
      setTenant(data);
      setFetchError(null);
    }
  };

  useEffect(() => {
    fetchTenant();
  }, []);

  const handleSelect = async (tnama) => {
    const id = params.id;
    router.push(`/customer/${id}/${tnama}`);
  };

  return (
    <>
      {alert ? (
        <Alert
          variant={alertStatus}
          onClose={() => setAlert(false)}
          dismissible
        >
          <Alert.Heading className="text-center">{alertMessage}</Alert.Heading>
        </Alert>
      ) : (
        <></>
      )}
      <Navbar />
      <div
        className="d-flex mt-3 container-fluid overflow-x-scroll"
        style={{ height: "91.5%" }}
      >
        {!tenant ? (
          <p>Loading...</p>
        ) : (
          <div
            className="d-flex align-self-center flex-row mb-4"
            style={{ paddingRight: "2rem" }}
          >
            {tenant.map((item, index) => (
              <div
                key={item.idTenant}
                sm={6}
                md={4}
                lg={3}
                style={{ paddingRight: "2rem" }}
              >
                <Card
                  style={{
                    width: "18rem",
                    marginBottom: "1rem",
                  }}
                >
                  {/* Assuming item.image contains the URL for the image */}
                  <Card.Img
                    variant="top"
                    src={item.gambar}
                    alt={`Image ${index}`}
                    width={200}
                    height={230}
                  />
                  <Card.Body>
                    <Card.Title>{item.nama}</Card.Title>
                    <Card.Text>{item.deskripsi}</Card.Text>
                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          handleSelect(item.nama);
                        }}
                      >
                        Lihat Menu
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardCustomer;
