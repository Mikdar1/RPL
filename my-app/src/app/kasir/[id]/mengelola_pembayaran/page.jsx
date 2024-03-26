"use client";

import React, { useEffect, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import supabase from "@/config/supabaseClient";
import Alert from "react-bootstrap/Alert";
import { useParams } from "next/navigation";
import Navbar from "../../../../components/Navbar/Navbar";
import { Image } from 'react-bootstrap';

const MengelolaPembayaran = () => {
  const [kodeUnik, setKodeUnik] = useState();
  const [pesanan, setPesanan] = useState();
  const [alert, setAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState();
  const [alertMessage, setAlertMessage] = useState();

  const params = useParams();

  const channels = supabase
    .channel("custom-update-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "Pesanan" },
      (payload) => {
        console.log("Database berubah!");
        fetchPesanan();
      }
    )
    .subscribe();

  const fetchPesanan = async () => {
    const { data, error } = await supabase.from("Pesanan").select("*");

    if (error) {
      setPesanan(null);
    }
    if (data) {
      setPesanan(data);
    }
  };

  const deletePesanan = async (kodeUnik) => {
    const { error } = await supabase
      .from("Pesanan")
      .delete()
      .eq("kodeUnik", kodeUnik);
  };

  function sleep() {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  }

  useEffect(() => {
    fetchPesanan();
  }, []);

  const handleVerif = async (e) => {
    e.preventDefault();
    let i = 0;
    while (i < pesanan.length && pesanan[i].kodeUnik != kodeUnik) {
      i++;
    }
    console.log(pesanan[i]);
    setAlert(true);
    if (!pesanan[i]) {
      setAlertMessage("Tidak ada pesanan dengan kode unik terkait!");
      setAlertStatus("danger");
    } else {
      if (!pesanan[i].status) {
        setAlertMessage("Pesanan dengan kode unik terkait belum selesai!");
        setAlertStatus("danger");
      } else {
        const idPesanan = pesanan[i].idPesanan;
        const totalPembayaran = pesanan[i].totalHarga;
        const idTenant = pesanan[i].idTenant;
        const { data, error } = await supabase
          .from("Transaksi")
          .insert([
            {
              idPesanan: idPesanan,
              idKasir: params.id,
              totalPembayaran: totalPembayaran,
              idTenant: idTenant,
              waktu: new Date().toLocaleString(),
            },
          ])
          .select();

        await sleep();
        deletePesanan(kodeUnik);

        setAlertMessage("Berhasil melakukan pembayaran!");
        setAlertStatus("success");
      }
    }
    setKodeUnik("");
  };

  return (
    <div>
      <Navbar />
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

      {!pesanan ? (
        <p>Loading...</p>
      ) : (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Card style={{ width: "30rem", height: "20rem" }}>
            <Card.Title className="d-flex justify-content-center align-items-center mt-5">
              <h2>Input Kode Unik</h2>
            </Card.Title>
            <Card.Body className="mt-3">
              <Card.Text className="d-flex justify-content-center align-items-center">
                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Kode Unik (Ex : 1234)"
                  className="mb-3"
                >
                  <Form.Control
                    placeholder="Leave a comment here"
                    type="number"
                    style={{ width: "16rem", borderColor: "black" }}
                    value={kodeUnik}
                    onChange={(e) => setKodeUnik(e.target.value)}
                  />
                </FloatingLabel>
              </Card.Text>
              <div className="d-flex justify-content-center align-items-center">
                <Button
                  variant="warning"
                  className="mt-3"
                  onClick={handleVerif}
                >
                  Verifikasi
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MengelolaPembayaran;
