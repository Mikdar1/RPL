import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MengelolaPesanan from "../../src/app/tenant/[id]/mengelola_pesanan/page.jsx";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    params: { id: "1" },
  }),
  useParams: jest.fn(),
}));

describe("MengelolaPesanan Component", () => {
  test("renders table headers", () => {
    render(<MengelolaPesanan />);
    const idPesananHeader = screen.getByText("ID Pesanan");
    // ... (other assertions)
  });

<<<<<<< HEAD
  // Add more test cases as needed for your specific use cases

  test("handles toggle status correctly", async () => {
    render(<MengelolaPesanan />);

    // Assuming there is at least one row in the table
    const toggleButton = screen.getByRole("button", { name: /toggle status/i });
    fireEvent.click(toggleButton);

    // Add assertions to check if the status is updated correctly
  });
=======
 
>>>>>>> 2c25ae9ffb1254c60c3e976d696f0e4d736772d7
});
