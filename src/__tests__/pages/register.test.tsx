import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Register from "../../pages/register";

describe("Register", () => {
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

  it("should render the page", () => {
    renderComponent();

    expect(screen.getByText("register")).toBeInTheDocument();
    expect(screen.getByText("personalInformation")).toBeInTheDocument();
    expect(screen.getByText("addressInformation")).toBeInTheDocument();
    expect(screen.getByText("accountInformation")).toBeInTheDocument();
  });
});
