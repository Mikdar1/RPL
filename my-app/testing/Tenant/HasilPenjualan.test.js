import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter, useParams } from "next/navigation";

import HasilPenjualan from "../../src/app/tenant/[id]/hasil_penjualan/page";

jest.mock("next/navigation", () => ({
    useRouter: () => ({
      params: { id: "1" },
    }),
    params: { id: "1" },
  }));
  

// Mock supabaseClient


describe("HasilPenjualan Component", () => {
  // Reset Jest mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders HasilPenjualan component", () => {
    render(<HasilPenjualan />);
    
    // Add assertions for the rendered component
    expect(screen.getByText("Lifetime")).toBeInTheDocument();
    // ... Add more assertions as needed
  });

  // Add more tests for other functionalities as needed
});

// Note: You might need to add more assertions and tests based on your specific use cases.
