import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import LandingPage from "../src/app/page.jsx";

// Mock next/router module
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    params: { id: "exampleId" },
  }),
  useParams: jest.fn(),
}));

jest.mock('@/config/supabaseClient', () => {
  return {
    from: () => ({
      // Mocking the object with a 'subscribe' method
      subscribe: jest.fn(),
    }),
  };
});

describe("LandingPage Component", () => {
  test("renders welcome message", () => {
    render(<LandingPage />);

    // Replace the text content and add more assertions based on your component's structure
    const welcomeMessage = screen.getByText("Welcome to YBarokah!");
    expect(welcomeMessage).toBeInTheDocument();

    // You can add more assertions based on the elements present in your component
    // For example, test the presence of login buttons
    const loginAsStaffButton = screen.getByText("Login as Staff");
    expect(loginAsStaffButton).toBeInTheDocument();

    const loginAsCustomerButton = screen.getByText("Login as Customer");
    expect(loginAsCustomerButton).toBeInTheDocument();
  });

  // Add more test cases as needed for your specific use cases
});
