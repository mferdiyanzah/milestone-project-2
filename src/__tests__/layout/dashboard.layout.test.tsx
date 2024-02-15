import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import DashboardLayout from "../../layouts/dashboard.layout";
jest.mock("../../hooks/useAuth", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("DashboardLayout", () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ logout: jest.fn() });
  });

  test("renders header and content", () => {
    render(
      <MemoryRouter>
        <DashboardLayout />
      </MemoryRouter>
    );

    // Assert header elements
    expect(screen.getByText("SINAU")).toBeInTheDocument();
    expect(screen.getByText("logout")).toBeInTheDocument();

    // Assert content element
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  test("calls logout and navigates to login page on logout button click", () => {
    const logoutMock = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({ logout: logoutMock });

    render(
      <MemoryRouter>
        <DashboardLayout />
      </MemoryRouter>
    );

    const logoutButton = screen.getByText("logout");
    fireEvent.click(logoutButton);

    expect(logoutMock).toHaveBeenCalled();
  });
});
