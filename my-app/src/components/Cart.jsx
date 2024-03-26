import React from "react";

const Cart = ({ cart }) => {
  let items = 0;
  let totalHarga = 0;
  cart.forEach((item) => {
    items += item.quantity;
    totalHarga += item.harga * item.quantity;
  });

  const formatCurrency = (amount) => {
    const formattedAmount = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);

    return formattedAmount;
  };

  return (
    <div
      className="cursor-pointer appearance-none space-x-2 rounded-full text-center outline-none focus:!border-gf-interactive-focus focus:border disabled:pointer-events-none gf-label-s py-1.5 px-3 border border-transparent bg-gf-support-danger-default hover:bg-gf-support-danger-hover focus:bg-gf-support-danger-hover text-gf-content-inverse active:bg-gf-support-danger-active active:!border-transparent pointer-events-auto absolute right-[50%] -bottom-10 z-[8] flex translate-x-[50%] items-center justify-end transition-all md:-bottom-10 md:right-0 md:translate-x-0 max-w-[140px]"
      style={{
        borderRadius: "300px",
        backgroundColor: "#24e504",
        width: "478px",
        height: "72px",
      }}
    >
      <div
        className="d-flex justify-content-between"
        style={{
          height: "72px",
          color: "#ffffff",
        }}
      >
        <div className="align-self-center">{items} Items</div>
        <div className="align-self-center">
          {formatCurrency(totalHarga)}
          <img className="m-2" src="/cartShop.svg" alt="cart" />
        </div>
      </div>
    </div>
  );
};

export default Cart;
