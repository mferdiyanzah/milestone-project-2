import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as dayjs from "dayjs";
import { BrowserRouter } from "react-router-dom";
import Register from "../../pages/register";
import { act } from "react-dom/test-utils";

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

  it("should register a new user", async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText("fullName")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText("fullName"), {
      target: { value: "John Doe" },
    });
    await waitFor(() => {
      expect(screen.getByLabelText("fullName")).toHaveValue("John Doe");
    });

    fireEvent.change(screen.getByLabelText("email"), {
      target: { value: "john.doe@example.com" },
    });
    await waitFor(() => {
      expect(screen.getByLabelText("email")).toHaveValue(
        "john.doe@example.com"
      );
    });

    const today = dayjs().subtract(18, "year").format("DD MMMM YYYY");

    const datepicker = screen.getByLabelText("dob");
    expect(datepicker).toBeVisible();

    fireEvent.click(datepicker);

    const eighteenthYearAgo = dayjs().subtract(18, "year").date();
    await waitFor(
      () => {
        expect(screen.getByText(eighteenthYearAgo)).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    fireEvent.click(screen.getByText(eighteenthYearAgo));
    await waitFor(() => {
      expect(datepicker).toHaveValue(today);
    });

    await waitFor(() => {
      expect(screen.getByText("nextButton")).toBeEnabled();
    });

    fireEvent.click(screen.getByText("nextButton"));
    await act(async () => {});

    expect(screen.getByLabelText("address")).toBeInTheDocument();

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

    expect(screen.getByLabelText("username")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("username"), {
      target: { value: "john.doe" },
    });
    await act(async () => {});
    expect(screen.getByLabelText("username")).toHaveValue("john.doe");

    fireEvent.change(screen.getByLabelText("password"), {
      target: { value: "Password123!" },
    });
    await waitFor(() => {
      expect(screen.getByLabelText("password")).toHaveValue("Password123!");
    });

    fireEvent.change(screen.getByLabelText("confirmPassword"), {
      target: { value: "Password123!" },
    });
    expect(screen.getByLabelText("confirmPassword")).toHaveValue(
      "Password123!"
    );

    await waitFor(() => {
      expect(screen.getByText("finishButton")).toBeEnabled();
    });

    fireEvent.click(screen.getByText("finishButton"));
    await act(async () => {});
    expect(screen.getByText("successTitle")).toBeInTheDocument();
  }, 15000);
});
