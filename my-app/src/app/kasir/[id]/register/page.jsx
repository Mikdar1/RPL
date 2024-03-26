"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import supabase from "@/config/supabaseClient";
import Navbar from "../../../../components/Navbar/Navbar";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { Image } from 'react-bootstrap';

const RegisterTenant = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [deskripsi, setDeskripsi] = useState();
  const [gambar, setGambar] = useState();
  const [nama, setNama] = useState();
  const [isDetail, setIsDetail] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setDeskripsi();
    setGambar();
    setNama();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("Tenant")
      .insert([
        {
          username: username,
          password: password,
          deskripsi: deskripsi,
          gambar: gambar,
          nama: nama,
        },
      ])
      .select();
    if (data) {
      window.alert("Berhasil menambahkan tenant");
    } else {
      window.alert(
        "Gagal menambahkan tenant, karena error atau username sudah ada!"
      );
    }
    setUsername("");
    setPassword("");  
    handleClose();
  };

  return (
    <div>
      <Navbar />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">Tambah Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark">
          <>
            <FloatingLabel
              controlId="floatingInput"
              label="Nama Tenant"
              className="mb-3"
            >
              <Form.Control
                required
                type="text"
                placeholder="Alpukat Kocok"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingTextarea2" label="Deskripsi">
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
                className="mb-3"
                required
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingTextarea2" label="URL Gambar">
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
                required
                value={gambar}
                onChange={(e) => setGambar(e.target.value)}
              />
            </FloatingLabel>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={styles.landingPageAwal}>
        <div className={styles.rectangleParent}>
          <div className={styles.groupChild} />
          <b className={styles.welcomeToYbarokah}>Register</b>
          <Image
            className={styles.logoYbarokah2RemovebgPreIcon}
            alt="Logo"
            src="/logo-ybarokah.png"
          />
          <div className={styles.field1}>
            <Image
              className={styles.field1Child}
              alt="rectangle"
              src="../../rectangle-2.svg"
            />
            <Image
              className={styles.field1Child2}
              alt="rectangle2"
              src="../../rectangle-2.svg"
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
              </form>
              <button
                className={styles.groupInner}
                style={{
                  color: "#FFFFFF",
                  fontSize: "32px",
                  fontWeight: "600",
                  fontFamily: "var(--font-poppins)",
                  borderRadius: "65px",
                }}
                onClick={() => {
                  setShow(true);
                }}
              >
                Add Detail
              </button>
            </div>
            <div className={styles.field1Item} />
            <div className={styles.field1Item2} />
            <div className={styles.tableId}>Username</div>
            <div className={styles.password}>Password</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterTenant;
