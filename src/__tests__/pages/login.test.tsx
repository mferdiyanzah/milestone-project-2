import { render, screen } from "@testing-library/react";
import Login from "../../pages/login";
import { BrowserRouter } from "react-router-dom";

describe("Login", () => {
  test("renders the login page correctly", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Assert that the title is rendered
    expect(screen.getByText("SINAU")).toBeInTheDocument();

    // Assert that the register description is rendered
    expect(screen.getByText("registerDesc")).toBeInTheDocument();
  });
});
