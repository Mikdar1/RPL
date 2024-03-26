"use client";

import supabase from "@/config/supabaseClient";
import Cookies from "js-cookie";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";
import Navbar from "../../../../components/Navbar/Navbar";
// import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Modal, Alert } from "react-bootstrap";
import Cart from "../../../../components/Cart";
import Menu from "../../../../components/Menu";
import { Card, Button } from "react-bootstrap";
import Image from "next/image";

const DashboardCustomer = () => {
  const router = useRouter();
  const params = useParams();

  const namaTenantParams = params.tname;
  const namaTenant = namaTenantParams.replace(/%20/g, " ");

  // Modal
  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleShowStatus = () => setShowStatus(true);
  const handleCloseStatus = () => setShowStatus(false);

  // Menu
  const [idMenu, setIdMenu] = useState([]);
  const [jumlah, setJumlah] = useState([]);
  const [idMeja, setIdMeja] = useState();
  const [idTenant, setIdTenant] = useState();
  const [Nama, setNama] = useState();
  const [idHarga, setHarga] = useState();
  const [stok, setStok] = useState();
  const [deskripsi, setDeskripsi] = useState();
  const [gambar, setGambar] = useState();
  const [gambarTenant, setGambarTenant] = useState();

  const [menu, setMenu] = useState();
  const [menus, setMenus] = useState([]);
  const [cart, setCart] = useState([]);

  // Pesanan
  const [detail, setDetail] = useState([]);
  const [totalHarga, setTotalHarga] = useState();
  const [kodeUnik, setKodeUnik] = useState();
  const [pesanan, setPesanan] = useState([]);

  //Alert
  const [alert, setAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState();
  const [alertMessage, setAlertMessage] = useState();

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

  const isNullPesanan = (currentPesanan) => {
    let count = 0;
    currentPesanan.forEach((item) => {
      count++;
    });
    return count == 0;
  };

  const fetchPesanan = async () => {
    const { data, error } = await supabase
      .from("Pesanan")
      .select("*")
      .eq("idMeja", `${params.id}`);

    if (error) {
      setPesanan(null);
      console.log(error);
    }
    if (data) {
      setPesanan(data);
    }
  };

  useEffect(() => {
    const fetchIdTenant = async () => {
      const { data, error } = await supabase
        .from("Tenant")
        .select("*")
        .eq("nama", `${namaTenant}`);

      if (error) {
        setIdTenant(null);
        console.log(error);
      }
      if (data) {
        setIdTenant(data);
      }
    };
    const fetchTenant = async () => {
      const { data, error } = await supabase
        .from("Tenant")
        .select("gambar")
        .eq("nama", `${namaTenant}`);

      if (error) {
        setGambarTenant(null);
        console.log(error);
      }
      if (data) {
        setGambarTenant(data);
      }
    };
    fetchTenant();
    fetchIdTenant();

    const fetchMenu = async () => {
      const { data, error } = await supabase
        .from("Menu")
        .select("*, Tenant!inner(nama)")
        .eq("Tenant.nama", namaTenant);

      if (error) {
        setMenu(null);
        console.log(error);
      }
      if (data) {
        setMenu(data);
      }
    };
    const fetchMenus = async () => {
      const { data, error } = await supabase.from("Menu").select("*");

      if (error) {
        setMenus(null);
        console.log(error);
      }
      if (data) {
        setMenus(data);
      }
    };
    fetchMenus();
    fetchMenu();
    fetchPesanan();
  }, []);

  const addToCart = async (menu) => {
    const existingItem = cart.find((item) => item.idMenu === menu.idMenu);

    if (existingItem) {
      // If the item is already in the cart, update its quantity
      setCart((cart) =>
        cart.map((item) =>
          item.idMenu === menu.idMenu
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      setDetail((detail) => [...detail, { idMenu: menu.idMenu, jumlah: 1 }]);
    } else {
      // If the item is not in the cart, add it with quantity 1
      setCart((cart) => [...cart, { ...menu, quantity: 1 }]);
      setDetail((detail) => [...detail, { idMenu: menu.idMenu, jumlah: 1 }]);
    }
  };

  const incrementQuantity = (idMenu, stok) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.idMenu === idMenu
          ? stok > item.quantity
            ? { ...item, quantity: item.quantity + 1 }
            : item
          : item
      )
    );
    setDetail((detail) =>
      detail.map((item) =>
        item.idMenu === idMenu
          ? stok > item.jumlah
            ? { ...item, jumlah: item.jumlah + 1 }
            : item
          : item
      )
    );
  };

  const decrementQuantity = (idMenu) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.idMenu === idMenu ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
    setDetail((detail) =>
      detail.map((item) =>
        item.idMenu === idMenu ? { ...item, jumlah: item.jumlah - 1 } : item
      )
    );
  };

  const countItem = (menu) => {
    let count = 0;
    cart.forEach((item) => {
      if (item.idMenu == menu.idMenu) {
        count = item.quantity;
      }
    });
    return count;
  };

  const formatCurrency = (amount) => {
    const formattedAmount = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);

    return formattedAmount;
  };

  const handlePesan = async (e) => {
    e.preventDefault();

    let tenantId = 0;

    idTenant.forEach((tnt) => {
      tenantId = tnt.idTenant;
    });

    const kode = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");

    const { data, error } = await supabase
      .from("Pesanan")
      .insert({
        idMeja: params.id,
        detail: detail,
        totalHarga: countHarga() * 1.1,
        kodeUnik: kode,
        status: false,
        idTenant: tenantId,
      })
      .select();

    cart.forEach(async (item) => {
      const { data, error } = await supabase
        .from("Menu")
        .update([
          {
            stok: item.stok - item.quantity,
          },
        ])
        .eq("idMenu", item.idMenu);
    });

    if (!error) {
      setAlert(true);
      setAlertStatus("success");
      setAlertMessage("Pesanan Berhasil!");
    } else {
      setAlert(false);
      setAlertStatus("danger");
      setAlertMessage("Pesanan Gagal!");
    }
    setCart([]);
    setDetail([]);
    handleClose();
  };

  const isNullCart = (currentCart) => {
    let items = 0;
    currentCart.forEach((item) => {
      items += item.quantity;
    });
    return items === 0;
  };

  const isNullMenu = (currentMenu) => {
    let menus = 0;
    currentMenu.forEach((item) => {
      menus += 1;
    });
    return menus === 0;
  };

  const countHarga = () => {
    let harga = 0;
    cart.forEach((item) => {
      harga += item.harga * item.quantity;
    });
    return harga;
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
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <div style={{ backgroundColor: "#333333", fontFamily: "Poppins" }}>
          <Modal.Header className="d-flex justify-content-between">
            <Image
              width={100}
              height={50}
              src="/logo-ybarokah.png"
              alt="logo"
              style={{
                width: "3vw",
              }}
            />
            <Modal.Title className="text-light">Pesanan</Modal.Title>
            <div>
              <Button
                className="btn-close btn-close-white"
                onClick={handleClose}
                style={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  backgroundColor: "rgba(255,255,255,0)",
                }}
              ></Button>
            </div>
          </Modal.Header>
          <Modal.Body className="text-light">
            <div className="d-flex flex-column justify-content-start">
              <div>Nomor Meja: {params.id}</div>
              <hr></hr>
              <div>
                {isNullCart(cart) ? (
                  "Tidak Ada Pesanan"
                ) : (
                  <>
                    {!cart ? (
                      <p>Loading...</p>
                    ) : (
                      <div>
                        {cart.map((item, index) =>
                          item.quantity === 0 ? (
                            <></>
                          ) : (
                            <div className="d-flex justify-content-between">
                              <div>
                                <div>{item.nama}</div>
                                <div>{formatCurrency(item.harga)}</div>
                              </div>
                              <div className="align-self-center">
                                <button
                                  type="button"
                                  onClick={() => {
                                    decrementQuantity(item.idMenu);
                                  }}
                                  style={{
                                    background: "white",
                                    border: "none",
                                    width: "25px",
                                    height: "25px",
                                    borderRadius: "2vw",
                                    fontWeight: "bold",
                                    marginRight: "2rem",
                                  }}
                                >
                                  -
                                </button>
                                {item.quantity}
                                <button
                                  type="button"
                                  onClick={() => {
                                    incrementQuantity(item.idMenu, item.stok);
                                  }}
                                  style={{
                                    background: "white",
                                    border: "none",
                                    width: "25px",
                                    height: "25px",
                                    borderRadius: "2vw",
                                    fontWeight: "bold",
                                    marginLeft: "2rem",
                                  }}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
              <hr />
              <div className="d-flex flex-column">
                <div>Detail Pesanan:</div>
                <div className="d-flex flex-row justify-content-between">
                  <div>Harga</div>
                  <div>{formatCurrency(countHarga())}</div>
                </div>
                <div className="d-flex flex-row justify-content-between">
                  <div>Pajak</div>
                  <div>{formatCurrency(countHarga() * 0.1)}</div>
                </div>
                <div className="d-flex flex-row justify-content-between">
                  <div>Total</div>
                  <div>{formatCurrency(countHarga() + countHarga() * 0.1)}</div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handlePesan}>
              Pesan
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
      <Modal
        show={showStatus}
        onHide={handleCloseStatus}
        backdrop="static"
        keyboard={false}
      >
        <div style={{ backgroundColor: "#333333", fontFamily: "Poppins" }}>
          <Modal.Header className="d-flex justify-content-between">
            <Image
              width={100}
              height={50}
              src="/logo-ybarokah.png"
              alt="logo"
              style={{
                width: "3vw",
              }}
            />
            <Modal.Title className="text-light">List Pesanan</Modal.Title>
            <div>
              <Button
                className="btn-close btn-close-white"
                onClick={handleCloseStatus}
                style={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  backgroundColor: "rgba(255,255,255,0)",
                }}
              ></Button>
            </div>
          </Modal.Header>
          <Modal.Body className="text-light">
            <div className="d-flex flex-column justify-content-start">
              <div>Nomor Meja: {params.id}</div>
              <hr></hr>
              <div>
                {isNullPesanan(pesanan) ? (
                  "List Pesanan Kosong"
                ) : (
                  <>
                    {!pesanan ? (
                      <p>Loading...</p>
                    ) : (
                      <div>
                        {pesanan.map((item, index) => (
                          <div>
                            <div>
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
                            </div>

                            <div>Kode Unik: {item.kodeUnik}</div>
                            <div>
                              Status
                              {item.status
                                ? ": Sedang Disiapkan!"
                                : ": Sudah Selesai!"}
                            </div>
                            <hr />
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>
      <div>
        <div
          className="d-flex justify-content-between"
          style={{ margin: "1rem", fontFamily: "Poppins" }}
        >
          <Image
            width={100}
            height={100}
            src="/logo-ybarokah.png"
            alt="logo"
            style={{ width: "4vw", height: "4vw" }}
          />
          <div
            className="p-2"
            style={{ fontSize: "2vw", color: "#FFB133", fontWeight: "bold" }}
          >
            YBarokah
          </div>
          <button
            type="button"
            onClick={handleShowStatus}
            className="p-2"
            style={{
              fontSize: "20px",
              color: "#FFFFFF",
              background: "none",
              border: "none",
            }}
          >
            Status
          </button>
        </div>
        <div
          className="d-flex justify-content-between"
          style={{ margin: "3rem", fontFamily: "Poppins" }}
        >
          <div
            className="p-2"
            style={{
              alignSelf: "center",
              fontSize: "26px",
              color: "#FFFFFF",
              fontWeight: "bold",
            }}
          >
            {namaTenant + "'s"}
          </div>
          <div>
            {!gambarTenant ? (
              <p>Loading...</p>
            ) : (
              <div>
                {gambarTenant.map((item, index) => (
                  <Card.Img
                    width={200}
                    height={200}
                    src={item.gambar}
                    alt={`Image ${index}`}
                    style={{
                      width: "8vw",
                      height: "8vw",
                      borderRadius: "2vw",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <div>
          {/* Menu-menu */}
          <div className="mt-5 container-fluid">
            {!menu ? (
              <p>Loading...</p>
            ) : isNullMenu(menu) ? (
              <div className="d-flex justify-content-center m-5">
                <div
                  style={{
                    fontSize: "3vw",
                    fontFamily: "Poppins",
                    color: "#fff",
                  }}
                >
                  Menu Tenant Belum Tersedia!
                </div>
              </div>
            ) : (
              <div className="row row-cols-2 row-cols-md-4 g-4">
                {menu.map((item, index) => (
                  <div className="col">
                    <div key={item.idTenant}>
                      <div className="card" style={{ borderRadius: "1vw" }}>
                        <Card.Img
                          src={item.gambar}
                          className="card-img-top"
                          alt={`Image ${index}`}
                          height={240}
                          style={{
                            padding: "5px",
                            borderRadius: "1rem",
                          }}
                        />
                        <div className="card-body">
                          <div className="card-title fw-bold">{item.nama}</div>
                          <div className="card-text">{item.deskripsi}</div>
                          <div className="card-text d-flex justify-content-between mt-2">
                            <div>{formatCurrency(item.harga)}</div>
                            <div>{item.stok}</div>
                          </div>
                          <div className="card-text mt-2">
                            <div className="d-flex justify-content-center">
                              {countItem(item) === 0 ? (
                                <div
                                  className="d-flex justify-content-center"
                                  style={{
                                    borderRadius: "50px",
                                    border: "2px solid #24e504",
                                    boxSizing: "border-box",
                                    width: "239px",
                                    height: "32px",
                                    background: "none",
                                  }}
                                >
                                  <button
                                    type="button"
                                    onClick={() => {
                                      addToCart(item);
                                    }}
                                    style={{
                                      background: "none",
                                      border: "none",
                                      width: "239px",
                                      height: "32px",
                                      borderRadius: "50px",
                                      boxSizing: "border-box",
                                    }}
                                  >
                                    Add
                                  </button>
                                </div>
                              ) : (
                                <div
                                  className="d-flex justify-content-between"
                                  style={{
                                    borderRadius: "50px",
                                    border: "2px solid #24e504",
                                    boxSizing: "border-box",
                                    width: "239px",
                                    height: "32px",
                                    background: "none",
                                  }}
                                >
                                  <button
                                    type="button"
                                    onClick={() => {
                                      decrementQuantity(item.idMenu);
                                    }}
                                    style={{
                                      background: "none",
                                      border: "none",
                                      width: "2vw",
                                    }}
                                  >
                                    -
                                  </button>
                                  <div className="align-self-center">
                                    {countItem(item)}
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      incrementQuantity(item.idMenu, item.stok);
                                    }}
                                    style={{
                                      background: "none",
                                      border: "none",
                                      width: "2vw",
                                    }}
                                  >
                                    +
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="sticky-bottom d-flex justify-content-center">
              <button
                className="mx-auto p-2"
                style={{
                  background: "none",
                  border: "none",
                }}
                onClick={handleShow}
              >
                {!isNullCart(cart) ? <Cart cart={cart} /> : <></>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCustomer;
