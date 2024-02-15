import { render, screen } from "@testing-library/react";
import NotFound from "../../pages/not-found";

describe("NotFound", () => {
  test("renders the 404 message correctly", () => {
    render(<NotFound />);

    // Assert that the 404 message is rendered
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
  });
});
