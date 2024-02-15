import { fireEvent, render, screen } from "@testing-library/react";
import Cart from "../../pages/cart";
import { act } from "react-dom/test-utils";

describe("Cart", () => {
  test("renders the cart page correctly", () => {
    render(<Cart />);

    expect(screen.getByText("cart")).toBeInTheDocument();
    expect(screen.getByText("addNewProduct")).toBeInTheDocument();
  });

  test("displays empty cart message when there are no products", () => {
    render(<Cart />);

    expect(screen.getByText("emptyCart")).toBeInTheDocument();
  });

  test("displays modal when add new product button is clicked", async () => {
    render(<Cart />);

    const addNewProductBtn = screen.getByText("addNewProduct");
    fireEvent.click(addNewProductBtn);
    await act(async () => {});

    expect(screen.getByText("addProduct")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("productNamePlaceholder")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("quantityPlaceholder")
    ).toBeInTheDocument();
  });

  test("adds new product to cart", async () => {
    render(<Cart />);

    const addNewProductBtn = screen.getByText("addNewProduct");
    fireEvent.click(addNewProductBtn);
    await act(async () => {});

    const productNameInput = screen.getByPlaceholderText(
      "productNamePlaceholder"
    );
    const quantityInput = screen.getByPlaceholderText("quantityPlaceholder");
    const addProductBtn = screen.getByText("addProduct");

    fireEvent.change(productNameInput, { target: { value: "Product 1" } });
    fireEvent.change(quantityInput, { target: { value: 10 } });
    fireEvent.click(addProductBtn);
    await act(async () => {});

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText(/10/)).toBeInTheDocument();
  });

  test("removes product from cart", async () => {
    render(<Cart />);

    const addNewProductBtn = screen.getByText("addNewProduct");
    fireEvent.click(addNewProductBtn);
    await act(async () => {});

    const productNameInput = screen.getByPlaceholderText(
      "productNamePlaceholder"
    );
    const quantityInput = screen.getByPlaceholderText("quantityPlaceholder");
    const addProductBtn = screen.getByText("addProduct");

    fireEvent.change(productNameInput, { target: { value: "Product 1" } });
    fireEvent.change(quantityInput, { target: { value: 10 } });
    fireEvent.click(addProductBtn);
    await act(async () => {});

    const removeBtn = screen.getByText("Delete");
    fireEvent.click(removeBtn);
    await act(async () => {});

    expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
    expect(screen.queryByText(/10/)).not.toBeInTheDocument();
  });
});
