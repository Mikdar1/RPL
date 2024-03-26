import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter, useParams } from "next/navigation";
import Cookies from "js-cookie";
import DashboardTenant from "../../src/app/tenant/[id]/page.jsx";
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock("js-cookie", () => ({
  get: jest.fn(),
}));
describe("DashboardTenant", () => {
  test("renders the navbar", () => {
    useRouter.mockReturnValue({});
    useParams.mockReturnValue({ id: "tenantId" });

    render(<DashboardTenant />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });

  test("redirects to login page if not logged in", () => {
    useRouter.mockReturnValue({});
    useParams.mockReturnValue({ id: "tenantId" });
    Cookies.get.mockReturnValue(undefined);

    render(<DashboardTenant />);

    expect(useRouter().push).toHaveBeenCalledWith("/");
  });

  test("navigates to manage orders page", () => {
    useRouter.mockReturnValue({
      push: jest.fn(),
    });
    useParams.mockReturnValue({ id: "tenantId" });

    render(<DashboardTenant />);

    fireEvent.click(screen.getByText("Kelola Pesanan"));

    expect(useRouter().push).toHaveBeenCalledWith(
      "/tenant/tenantId/mengelola_pesanan"
    );
  });
});
