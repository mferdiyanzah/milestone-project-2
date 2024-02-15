import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AddProductModal from "../../components/add-product-modal";

describe("AddProductModal", () => {
  const mockAddNewProduct = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    render(
      <AddProductModal
        visible={true}
        addNewProduct={mockAddNewProduct}
        onCancel={mockOnCancel}
      />
    );
  });

  test("renders the modal title correctly", () => {
    expect(screen.getByText("addNewProduct")).toBeInTheDocument();
  });

  it("can add new product succesfully", async () => {
    const productNameInput = screen.getByLabelText("productName");
    const quantityInput = screen.getByLabelText("quantity");
    const finishButton = screen.getByText("addProduct");

    fireEvent.change(productNameInput, { target: { value: "Test Product" } });
    await waitFor(() => {
      expect(productNameInput).toHaveValue("Test Product");
    });

    fireEvent.change(quantityInput, { target: { value: 10 } });
    await waitFor(() => {
      expect(quantityInput).toHaveValue(10);
    });

    expect(finishButton).toBeEnabled();
    fireEvent.click(finishButton);

    await waitFor(() => {
      expect(mockAddNewProduct).toHaveBeenCalledTimes(1);
      expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });
  });
});
