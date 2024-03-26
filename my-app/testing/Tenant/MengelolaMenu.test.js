import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter, useParams } from "next/navigation";
import MengelolaMenu from "../../src/app/tenant/[id]/mengelola_menu/page.jsx";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    params: { id: "1" },
  }),
  useParams: jest.fn(),
}));

// Mock supabaseClient


describe("MengelolaMenu Component", () => {
  // Reset Jest mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders MengelolaMenu component", () => {
    render(<MengelolaMenu />);
    
    // Add assertions for the rendered component
    expect(screen.getByText("Tambah Menu")).toBeInTheDocument();
    // ... Add more assertions as needed
  });

  // Add more tests for other functionalities as needed
});

// Note: You might need to add more assertions and tests based on your specific use cases.
