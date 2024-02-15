import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Unauthorized from "../../pages/unauthorized";

describe("Unauthorized", () => {
  test("renders the unauthorized message correctly", () => {
    render(
      <MemoryRouter>
        <Unauthorized />
      </MemoryRouter>
    );

    expect(screen.getByText("unauthorized")).toBeInTheDocument();
    expect(screen.getByText("unauthorizedMessage")).toBeInTheDocument();
    expect(screen.getByText("login")).toBeInTheDocument();
  });
});
