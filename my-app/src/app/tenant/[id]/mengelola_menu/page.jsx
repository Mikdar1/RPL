"use client";

import React,{ useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useParams } from "next/navigation";
import supabase from "@/config/supabaseClient";
import { Card, Button, Row, Col } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Navbar from "../../../../components/Navbar/Navbar";
import { Image } from 'react-bootstrap';
function MengelolaMenu() {
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleClose = () => {
    setShow(false);
    setNama();
    setHarga();
    setDeskripsi();
    setStok();
    setidMenu();
    setGambar();
  };
  const handleShow = () => setShow(true);
  const Params = useParams();

  const [nama, setNama] = useState();
  const [harga, setHarga] = useState();
  const [stok, setStok] = useState();
  const [deskripsi, setDeskripsi] = useState();
  const [gambar, setGambar] = useState();
  const [error, setFetchError] = useState();
  const [alert, setAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState();
  const [alertMessage, setAlertMessage] = useState();

  const [menu, setMenu] = useState();
  const [idMenu, setidMenu] = useState();

  const channels = supabase
    .channel("custom-update-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "Menu" },
      (payload) => {
        fetchMenu();
      }
    )
    .subscribe();

  const fetchMenu = async () => {
    const { data, error } = await supabase.from("Menu").select("*").eq("idTenant", Params.id);

    if (error) {
      setFetchError("Cloud not fetch data");
      setMenu(null);
      console.log(error);
    }
    if (data) {
      setMenu(data);
      setFetchError(null);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("Menu").delete().eq("idMenu", idMenu);

    if (!error) {
      setAlert(true);
      setAlertStatus("success");
      setAlertMessage("Berhasil Menghapus Menu!");
    } else {
      setAlert(false);
      setAlertStatus("danger");
      setAlertMessage("Gagal Menghapus Menu!");
    }
    setidMenu();
    setShowDelete(false);
  };
  const handleTambahMenu = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("Menu")
      .insert([
        {
          idTenant: Params.id,
          nama: nama,
          harga: harga,
          stok: stok,
          deskripsi: deskripsi,
          gambar: gambar,
        },
      ])
      .select();

    if (!error) {
      setAlert(true);
      setAlertStatus("success");
      setAlertMessage("Berhasil Tambah Menu!");
    } else {
      setAlert(false);
      setAlertStatus("danger");
      setAlertMessage("Gagal Tambah Menu!");
    }
    handleClose();
  };

  const floatingButtonStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: "1 ", // Adjust the z-index to make sure it stays above other elements
  };
  const handleUpdate = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("Menu")
      .update([
        {
          nama: nama,
          harga: harga,
          stok: stok,
          deskripsi: deskripsi,
          gambar: gambar,
        },
      ])
      .eq("idMenu", idMenu);

    if (!error) {
      setAlert(true);
      setAlertStatus("success");
      setAlertMessage("Berhasil Update Menu!");
    } else {
      setAlert(false);
      setAlertStatus("danger");
      setAlertMessage("Gagal Update Menu!");
    }
    handleClose();
  };

  return (
    <div>
      <Navbar></Navbar>
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
      <div style={{ position: 'fixed', bottom: '16px', right: '16px', zIndex: '1000' }}>
        <Button variant="primary" onClick={handleShow}>
          Tambah Menu
        </Button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">Tambah Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark">
          <>
            <FloatingLabel
              controlId="floatingInput"
              label="Nama makanan/minuman"
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

            <FloatingLabel
              controlId="floatingInput"
              label="Harga"
              className="mb-3"
            >
              <Form.Control
                required
                type="number"
                placeholder="Harga"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingInput"
              label="Stok"
              className="mb-3"
            >
              <Form.Control
                required
                type="number"
                placeholder="Stok"
                value={stok}
                onChange={(e) => setStok(e.target.value)}
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
          {idMenu ? (
            <Button variant="warning" onClick={handleUpdate}>
              Update menu
            </Button>
          ) : (
            <Button variant="success" onClick={handleTambahMenu}>
              Tambah menu
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <div className="mt-5 container-fluid d-flex">
        {!menu ? (
          <p>Loading...</p>
        ) : (
          <Row>
            {menu.map((item, index) => (
              <Col key={item.idMenu} sm={6} md={4} lg={2}>
                <Card style={{ width: "15rem", marginBottom: "1rem" }}>
                  {/* Assuming item.image contains the URL for the image */}
                  <Card.Img
                    variant="top"
                    src={item.gambar}
                    alt={`Image ${index}`}
                    width={170}
                    height={195}
                  />
                  <Card.Body>
                    <Card.Title>{item.nama}</Card.Title>
                    <Card.Text>{item.deskripsi}</Card.Text>
                    <Card.Text>
                      Harga : Rp {item.harga} <br></br> Stok : {item.stok} pcs
                    </Card.Text>
                    <Button
                      variant="danger"
                      className="mx-4"
                      onClick={() => {
                        setShowDelete(true);
                        setidMenu(item.idMenu);
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="warning"
                      onClick={() => {
                        setidMenu(item.idMenu);
                        setNama(item.nama);
                        setDeskripsi(item.deskripsi);
                        setGambar(item.gambar);
                        setHarga(item.harga);
                        setStok(item.stok);
                        setShow(true);
                      }}
                    >
                      Update
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>

      <>
        <Modal
          show={showDelete}
          onHide={() => {
            setShowDelete(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-dark">Confirm</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-dark">
            Are You Sure Want to Delete this Menu?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShowDelete(false);
              }}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}

export default MengelolaMenu;
