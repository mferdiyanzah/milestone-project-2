/* eslint-disable */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AddressInformation from "../../components/address-information";
import { act } from "react-dom/test-utils";
import useFormContext from "../../pages/register/register.context";
import { IRegisterForm } from "../../pages/register/register.interface";

jest.mock("../../pages/register/register.context");

const addressInformation: IRegisterForm | undefined = {
  address: "123 Main St",
  city: "Buffalo",
  state: "New York",
  zip: "10001",
};

const mockUseFormContext = jest.mocked(useFormContext);

describe("AddressInformation", () => {
  const renderComponent = () => {
    return (
      <BrowserRouter>
        <AddressInformation />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    mockUseFormContext.mockReturnValue({
      formData: undefined,
      setFormData: jest.fn(),
      onNext: jest.fn(),
      onPrev: jest.fn(),
    });
  });
  test("renders the form correctly", () => {
    const mockOnNext = jest.fn();
    mockUseFormContext.mockReturnValue({
      formData: undefined,
      setFormData: jest.fn(),
      onNext: mockOnNext,
      onPrev: jest.fn(),
    });

    render(renderComponent());

    // Assert that the form inputs are rendered
    expect(screen.getByLabelText("address")).toBeInTheDocument();
    expect(screen.getByLabelText("city")).toBeInTheDocument();
    expect(screen.getByLabelText("state")).toBeInTheDocument();
    expect(screen.getByLabelText("zipCode")).toBeInTheDocument();

    // Assert that the Previous and Next buttons are rendered
    expect(screen.getByText("prevButton")).toBeInTheDocument();
    expect(screen.getByText("nextButton")).toBeInTheDocument();
  });

  test("disables the Next button when form is empty", () => {
    render(renderComponent());

    // Assert that the Next button is initially disabled
    expect(screen.getByText("nextButton")).toBeDisabled();
  });

  test("enables the Next button when form is filled", async () => {
    render(renderComponent());

    // Fill in the form inputs
    fireEvent.change(screen.getByLabelText("address"), {
      target: { value: "123 Main St" },
    });
    await waitFor(() => {
      expect(screen.getByLabelText("address")).toHaveValue("123 Main St");
    });

    const stateSelect = screen.getAllByRole("combobox")[0];
    fireEvent.mouseDown(stateSelect);
    await waitFor(() => {
      expect(screen.getByText("New York")).toBeVisible();
    });
    fireEvent.click(screen.getByText("New York"));

    const citySelect = screen.getAllByRole("combobox")[1];
    fireEvent.mouseDown(citySelect);
    await waitFor(() => {
      expect(screen.getByText("Buffalo")).toBeVisible();
    });
    fireEvent.click(screen.getByText("Buffalo"));

    const zipSelect = screen.getAllByRole("combobox")[2];
    fireEvent.mouseDown(zipSelect);
    await waitFor(() => {
      expect(screen.getByText("10001")).toBeVisible();
    });
    fireEvent.click(screen.getByText("10001"));
    await act(async () => {});

    await waitFor(() => {
      expect(screen.getByText("nextButton")).toBeEnabled();
    });

    fireEvent.click(screen.getByText("nextButton"));
    await act(async () => {});

    expect(mockUseFormContext().onNext).toHaveBeenCalled();
  });

  test("show saved form data", async () => {
    mockUseFormContext.mockReturnValue({
      formData: addressInformation,
      setFormData: jest.fn(),
      onNext: jest.fn(),
      onPrev: jest.fn(),
    });

    render(renderComponent());

    await act(async () => {});

    await waitFor(() => {
      expect(screen.getByLabelText("address")).toHaveValue("123 Main St");
      expect(screen.getByText("Buffalo")).toBeVisible();
      expect(screen.getByText("New York")).toBeVisible();
      expect(screen.getByText("10001")).toBeVisible();
    });
  });
});
