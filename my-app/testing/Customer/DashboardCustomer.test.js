import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { shallow } from "enzyme";
import DashboardCustomer from "../../src/app/customer/[id]/page.jsx";

// Mock the next/navigation module
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

describe("DashboardCustomer", () => {
  test("renders cards after fetching tenant data", async () => {
    // Mock the useRouter and useParams hooks
    const mockUseRouter = {
      push: jest.fn(),
      params: { id: "6" },
    };
    require("next/navigation").useRouter.mockReturnValue(mockUseRouter);

    render(<DashboardCustomer />);

    // Wait for the data to be loaded and cards to be rendered
    await waitFor(() => {
      expect(screen.getByText("Warung Apis")).toBeInTheDocument();
      expect(screen.getByText("Warung Ghaylan")).toBeInTheDocument();
    });
  });

  test("handles button click and navigates to the correct route", async () => {
    // Mock the useRouter hook to capture push function
    const mockUseRouter = {
      push: jest.fn(),
      params: { id: "6" },
    };
    require("next/navigation").useRouter.mockReturnValue(mockUseRouter);

    render(<DashboardCustomer />);

    // Wait for the data to be loaded and cards to be rendered
    await waitFor(() => {
      const wrapper = shallow(<DashboardCustomer />);
      const button = wrapper.find("button[btn btn-danger]");
      button.simulate("click");
      expect(mockUseRouter.push).toHaveBeenCalledWith(
        "/customer/6/Warung%20Apis"
      );
    });
  });
});
