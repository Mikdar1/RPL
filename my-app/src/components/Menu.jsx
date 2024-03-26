import React from "react";

const Menu = ({ menu, onAddToCart }) => {
  return (
    <div>
      <img src={menu.gambar} alt="" srcset="" />
      <div>{menu.nama}</div>
      <div>{menu.deskripsi}</div>
      <div>{menu.harga}</div>
      <button onClick={() => onAddToCart(menu)}>Add</button>
    </div>
  );
};

export default Menu;
