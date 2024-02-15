import { render, screen } from "@testing-library/react";
import CartCard from "../../components/cart-card";

const mockProduct = {
  id: 1,
  name: "Test Product",
  quantity: 2,
  price: 1000,
};

describe("CartCard", () => {
  test("renders product name correctly", () => {
    render(<CartCard product={mockProduct} onRemove={jest.fn()} />);
    const productName = screen.getByText(mockProduct.name);
    expect(productName).toBeInTheDocument();
  });

  test("renders product quantity correctly", () => {
    render(<CartCard product={mockProduct} onRemove={jest.fn()} />);
    const productQuantity = screen.getByText(
      `quantity: ${mockProduct.quantity}`
    );
    expect(productQuantity).toBeInTheDocument();
  });

  test("renders formatted price correctly", () => {
    render(<CartCard product={mockProduct} onRemove={jest.fn()} />);
    const formattedPrice = screen.getByText("Rp 1.000");
    expect(formattedPrice).toBeInTheDocument();
  });
});
