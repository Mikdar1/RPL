// RiwayatPembayaran.test.js
import React from "react";
import RiwayatPembayaran from "../../src/app/kasir/[id]/riwayat_pembayaran/page.jsx";
import { render, screen } from "@testing-library/react"; // Update the import path

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    params: { id: "exampleId" },
  }),
  useParams: jest.fn(),
}));

describe("RiwayatPembayaran", () => {
  it("renders loading message when transaksi is null", () => {
    render(<RiwayatPembayaran />);
    const loadingElement = screen.getByText(/loading/i);
    expect(loadingElement).toBeInTheDocument();
  });
});
