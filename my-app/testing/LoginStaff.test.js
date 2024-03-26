// LoginStaff.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import LoginStaff from "../src/app/loginstaff/page";
import fetchMock from "jest-fetch-mock";

// Mocking the next/router module
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// Mocking the js-cookie module
jest.mock("js-cookie", () => ({
  set: jest.fn(),
}));

// Setup fetch mock
fetchMock.enableMocks();

describe("LoginStaff", () => {
  it("handles form submission correctly for kasir", async () => {
    // Mock the data you expect from supabase
    const supabaseMockData = {
      data: [
        { id: 1, username: "kasirpagi", hasLogin: false },
        { id: 2, username: "kasirsore", hasLogin: false },
      ],
      error: null,
    };

    // Mock the fetch method
    fetchMock.mockResponseOnce(JSON.stringify(supabaseMockData));

    useRouter.mockReturnValue({ push: jest.fn() });

    render(<LoginStaff />);

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "kasirpagi" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "kasirpagi" },
    });

    // Simulate form submission
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Wait for the asynchronous operations to complete
    await screen.findByText(/Sudah ada kasir yang login!/i);

    // Assert that the router.push function was called
    expect(useRouter().push).toHaveBeenCalledWith("/kasir/1");

    // Assert that Cookies.set was called
    expect(Cookies.set).toHaveBeenCalledWith("loggedinkasir", "true");
  });

  // Add more test cases as needed
});
